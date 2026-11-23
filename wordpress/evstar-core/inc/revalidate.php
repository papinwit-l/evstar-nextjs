<?php
/**
 * On-demand revalidation of the Next.js site.
 *
 * Edits collect cache tags during the request; one POST is sent at shutdown:
 *
 *   POST {EVSTAR_NEXT_URL}/api/revalidate
 *   x-revalidate-secret: {EVSTAR_REVALIDATE_SECRET}
 *   { "tags": ["products", "home", "quote"] }
 *
 * Tags match the `next: { tags: [...] }` on each getX() fetch in src/lib/api/.
 */

defined( 'ABSPATH' ) || exit;

function evstar_queue_revalidate( array $tags ): void {
	$GLOBALS['evstar_revalidate_tags'] = array_unique( array_merge( $GLOBALS['evstar_revalidate_tags'] ?? [], $tags ) );
}

add_action( 'shutdown', function () {
	$tags = $GLOBALS['evstar_revalidate_tags'] ?? [];
	if ( ! $tags || ! defined( 'EVSTAR_NEXT_URL' ) || ! defined( 'EVSTAR_REVALIDATE_SECRET' ) ) {
		return;
	}

	$response = wp_remote_post( rtrim( EVSTAR_NEXT_URL, '/' ) . '/api/revalidate', [
		'headers'  => [
			'Content-Type'        => 'application/json',
			'x-revalidate-secret' => EVSTAR_REVALIDATE_SECRET,
		],
		'body'     => wp_json_encode( [ 'tags' => array_values( $tags ) ] ),
		'timeout'  => 5,
		'blocking' => defined( 'WP_DEBUG' ) && WP_DEBUG, // wait for the answer only when debugging
	] );

	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		$status = is_wp_error( $response ) ? $response->get_error_message() : wp_remote_retrieve_response_code( $response );
		error_log( '[evstar] revalidate ' . implode( ',', $tags ) . ' → ' . $status );
	}
} );

/** Which tags a post affects. */
function evstar_tags_for_post( WP_Post $post ): array {
	switch ( $post->post_type ) {
		case 'product':
			// Home tiles reference products; the quote form lists published models.
			return [ 'products', 'home', 'quote', 'portfolio' ];
		case 'portfolio':
			return [ 'portfolio', 'home' ];
		case 'page':
			$key = evstar_page_key( $post->ID );
			if ( ! $key ) {
				return [];
			}
			// Portfolio page title is also the home section title.
			return 'portfolio' === $key ? [ 'portfolio', 'home' ] : [ $key ];
		case 'attachment':
			// Alt text or crop changed — cheap enough to refresh everything that shows images.
			return [ 'home', 'products', 'portfolio', 'about' ];
	}
	return [];
}

function evstar_revalidate_post( int $post_id ): void {
	$post = get_post( $post_id );
	if ( ! $post || wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
		return;
	}
	if ( 'auto-draft' === $post->post_status ) {
		return;
	}
	evstar_queue_revalidate( evstar_tags_for_post( $post ) );
}

// Fires after SCF has saved the fields of a post (and for the options page).
add_action( 'acf/save_post', function ( $post_id ) {
	if ( 'options' === $post_id ) {
		evstar_queue_revalidate( [ 'settings' ] );
		return;
	}
	if ( is_numeric( $post_id ) ) {
		evstar_revalidate_post( (int) $post_id );
	}
}, 20 );

// Status changes (publish → trash/draft, quick edit, order changes) don't always go through SCF.
add_action( 'save_post', 'evstar_revalidate_post', 20 );
add_action( 'before_delete_post', 'evstar_revalidate_post' );
add_action( 'trashed_post', 'evstar_revalidate_post' );
add_action( 'edit_attachment', 'evstar_revalidate_post' );

// Terms: product categories feed the products page, footer and home anchors.
foreach ( [ 'created', 'edited', 'delete' ] as $action ) {
	add_action( "{$action}_product_category", fn() => evstar_queue_revalidate( [ 'products', 'home', 'settings' ] ) );
	add_action( "{$action}_site_type", fn() => evstar_queue_revalidate( [ 'portfolio', 'home' ] ) );
}

/** Manual "refresh the website" button in the admin bar, for when a change didn't show. */
add_action( 'admin_bar_menu', function ( WP_Admin_Bar $bar ) {
	if ( ! current_user_can( 'edit_pages' ) || ! defined( 'EVSTAR_NEXT_URL' ) ) {
		return;
	}
	$bar->add_node( [
		'id'    => 'evstar-revalidate',
		'title' => 'รีเฟรชหน้าเว็บ',
		'href'  => wp_nonce_url( admin_url( 'admin-post.php?action=evstar_revalidate_all' ), 'evstar_revalidate_all' ),
	] );
	$bar->add_node( [
		'id'    => 'evstar-view-site',
		'title' => 'ดูเว็บไซต์',
		'href'  => EVSTAR_NEXT_URL,
		'meta'  => [ 'target' => '_blank' ],
	] );
}, 80 );

add_action( 'admin_post_evstar_revalidate_all', function () {
	if ( ! current_user_can( 'edit_pages' ) ) {
		wp_die( 'Not allowed', 403 );
	}
	check_admin_referer( 'evstar_revalidate_all' );
	evstar_queue_revalidate( [ 'home', 'products', 'services', 'portfolio', 'about', 'quote', 'privacy-policy', 'settings' ] );
	wp_safe_redirect( add_query_arg( 'evstar_revalidated', '1', wp_get_referer() ?: admin_url() ) );
	exit;
} );

add_action( 'admin_notices', function () {
	if ( isset( $_GET['evstar_revalidated'] ) ) {
		echo '<div class="notice notice-success is-dismissible"><p>ส่งคำสั่งรีเฟรชหน้าเว็บแล้ว อาจใช้เวลาสักครู่</p></div>';
	}
	if ( current_user_can( 'manage_options' ) && ( ! defined( 'EVSTAR_NEXT_URL' ) || ! defined( 'EVSTAR_REVALIDATE_SECRET' ) ) ) {
		echo '<div class="notice notice-warning"><p><strong>EVSTAR Core:</strong> add <code>EVSTAR_NEXT_URL</code> and <code>EVSTAR_REVALIDATE_SECRET</code> to wp-config.php so edits refresh the website.</p></div>';
	}
} );
