<?php
/**
 * The seven site pages.
 *
 * The plugin creates them (or adopts an existing page with the same slug) and
 * stores their IDs in the `evstar_page_ids` option. Field groups attach by
 * that ID, so nothing depends on page templates or on IDs being the same
 * across local / staging / production.
 *
 * Slugs are locked and the pages cannot be deleted: Next.js queries them by key.
 */

defined( 'ABSPATH' ) || exit;

/** key => [slug, title]. The key is what Next.js asks for: evstarPage(key: "home"). */
function evstar_page_definitions(): array {
	return [
		'home'           => [ 'home', 'หน้าแรก' ],
		'products'       => [ 'products', 'สินค้า' ],
		'services'       => [ 'services', 'บริการ' ],
		'portfolio'      => [ 'portfolio', 'ผลงาน' ],
		'about'          => [ 'about', 'เกี่ยวกับเรา' ],
		'quote'          => [ 'quote', 'ขอใบเสนอราคา' ],
		'privacy-policy' => [ 'privacy-policy', 'นโยบายความเป็นส่วนตัว' ],
	];
}

/** @return array<string,int> key => page ID */
function evstar_page_ids(): array {
	$ids = get_option( 'evstar_page_ids', [] );
	return is_array( $ids ) ? array_map( 'intval', $ids ) : [];
}

function evstar_page_id( string $key ): int {
	return evstar_page_ids()[ $key ] ?? 0;
}

/** Page key for a post ID, or null when it is not one of the site pages. */
function evstar_page_key( int $post_id ): ?string {
	$key = array_search( $post_id, evstar_page_ids(), true );
	return false === $key ? null : $key;
}

/** Create any missing page and remember its ID. Safe to run repeatedly. */
function evstar_ensure_pages(): void {
	$ids     = evstar_page_ids();
	$changed = false;

	foreach ( evstar_page_definitions() as $key => [ $slug, $title ] ) {
		if ( ! empty( $ids[ $key ] ) && 'page' === get_post_type( $ids[ $key ] ) && 'trash' !== get_post_status( $ids[ $key ] ) ) {
			continue;
		}

		$existing = get_page_by_path( $slug, OBJECT, 'page' );
		if ( $existing && 'trash' !== $existing->post_status ) {
			$id = $existing->ID;
			if ( 'publish' !== $existing->post_status ) {
				wp_update_post( [ 'ID' => $id, 'post_status' => 'publish' ] );
			}
		} else {
			$id = wp_insert_post( [
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_title'  => $title,
				'post_name'   => $slug,
			] );
		}

		if ( $id && ! is_wp_error( $id ) ) {
			$ids[ $key ] = (int) $id;
			$changed     = true;
		}
	}

	if ( $changed ) {
		update_option( 'evstar_page_ids', $ids, false );
	}

	if ( ! empty( $ids['home'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $ids['home'] );
	}
	if ( ! empty( $ids['privacy-policy'] ) ) {
		update_option( 'wp_page_for_privacy_policy', $ids['privacy-policy'] );
	}
}

// Re-check after a plugin update or if someone removed a page in the database.
add_action( 'admin_init', function () {
	if ( get_option( 'evstar_pages_version' ) !== EVSTAR_CORE_VERSION ) {
		evstar_ensure_pages();
		evstar_seed_terms();
		update_option( 'evstar_pages_version', EVSTAR_CORE_VERSION, false );
	}
} );

/** Site pages cannot be trashed or deleted, by anyone. */
add_filter( 'map_meta_cap', function ( array $caps, string $cap, int $user_id, array $args ) {
	if ( in_array( $cap, [ 'delete_post', 'delete_page' ], true ) && ! empty( $args[0] ) ) {
		if ( evstar_page_key( (int) $args[0] ) ) {
			return [ 'do_not_allow' ];
		}
	}
	return $caps;
}, 10, 4 );

/** Keep the slug, status and parent of site pages fixed. */
add_filter( 'wp_insert_post_data', function ( array $data, array $postarr ) {
	$id  = (int) ( $postarr['ID'] ?? 0 );
	$key = $id ? evstar_page_key( $id ) : null;
	if ( ! $key ) {
		return $data;
	}
	$data['post_name']   = evstar_page_definitions()[ $key ][0];
	$data['post_parent'] = 0;
	if ( in_array( $data['post_status'], [ 'draft', 'pending', 'private', 'trash' ], true ) ) {
		$data['post_status'] = 'publish';
	}
	return $data;
}, 10, 2 );

/**
 * Pages built from fields use the classic screen with the content editor
 * hidden. Only the privacy policy keeps the block editor.
 */
add_filter( 'use_block_editor_for_post', function ( bool $use, WP_Post $post ) {
	$key = evstar_page_key( $post->ID );
	if ( $key && 'privacy-policy' !== $key ) {
		return false;
	}
	return $use;
}, 10, 2 );

add_action( 'add_meta_boxes_page', function ( WP_Post $post ) {
	$key = evstar_page_key( $post->ID );
	if ( $key && 'privacy-policy' !== $key ) {
		remove_post_type_support( 'page', 'editor' );
	}
	if ( $key ) {
		remove_meta_box( 'pageparentdiv', 'page', 'side' );
	}
} );

/** Label the site pages in the Pages list so the client knows not to look for others. */
add_filter( 'display_post_states', function ( array $states, WP_Post $post ) {
	if ( evstar_page_key( $post->ID ) ) {
		$states['evstar'] = 'หน้าเว็บไซต์';
	}
	return $states;
}, 10, 2 );
