<?php
/**
 * Headless clean-up: no blog, no comments, no XML-RPC, no WordPress front end.
 */

defined( 'ABSPATH' ) || exit;

/* --- Front end → Next.js ------------------------------------------------ */

add_action( 'template_redirect', function () {
	if ( ! defined( 'EVSTAR_NEXT_URL' ) || is_admin() || wp_doing_ajax() || wp_doing_cron() ) {
		return;
	}
	if ( defined( 'REST_REQUEST' ) || ( function_exists( 'is_graphql_http_request' ) && is_graphql_http_request() ) ) {
		return;
	}
	if ( is_preview() && is_user_logged_in() ) {
		return;
	}

	$target = rtrim( EVSTAR_NEXT_URL, '/' );

	// Keep the path for the site pages; anything else goes to the home page.
	if ( is_singular( 'page' ) ) {
		$key = evstar_page_key( get_queried_object_id() );
		if ( $key && 'home' !== $key ) {
			$target .= '/' . $key;
		}
	}

	wp_redirect( $target, 301, 'EVSTAR Core' );
	exit;
} );

/* --- No blog / comments ------------------------------------------------ */

add_action( 'admin_menu', function () {
	remove_menu_page( 'edit.php' );          // Posts
	remove_menu_page( 'edit-comments.php' ); // Comments
	if ( ! current_user_can( 'manage_options' ) ) {
		remove_menu_page( 'tools.php' );
	}
}, 99 );

add_action( 'admin_bar_menu', function ( WP_Admin_Bar $bar ) {
	$bar->remove_node( 'comments' );
	$bar->remove_node( 'new-post' );
	$bar->remove_node( 'view-site' );
}, 999 );

add_action( 'init', function () {
	foreach ( get_post_types() as $type ) {
		if ( post_type_supports( $type, 'comments' ) ) {
			remove_post_type_support( $type, 'comments' );
			remove_post_type_support( $type, 'trackbacks' );
		}
	}
}, 100 );

add_filter( 'comments_open', '__return_false', 20 );
add_filter( 'pings_open', '__return_false', 20 );

add_action( 'wp_dashboard_setup', function () {
	remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
	remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
	remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' );
	remove_meta_box( 'dashboard_site_health', 'dashboard', 'normal' );
} );

/* --- Security ---------------------------------------------------------- */

add_filter( 'xmlrpc_enabled', '__return_false' );
add_filter( 'wp_headers', function ( array $headers ) {
	unset( $headers['X-Pingback'] );
	return $headers;
} );

// Don't list users to anonymous REST requests (/wp-json/wp/v2/users).
add_filter( 'rest_endpoints', function ( array $endpoints ) {
	if ( ! is_user_logged_in() ) {
		unset( $endpoints['/wp/v2/users'], $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
	}
	return $endpoints;
} );

/* --- Small editor comforts --------------------------------------------- */

// Product list: sort by Order (menu_order) by default, like the website does.
add_action( 'pre_get_posts', function ( WP_Query $query ) {
	if ( is_admin() && $query->is_main_query() && in_array( $query->get( 'post_type' ), [ 'product', 'portfolio' ], true ) && ! $query->get( 'orderby' ) ) {
		$query->set( 'orderby', [ 'menu_order' => 'ASC', 'title' => 'ASC' ] );
	}
} );

add_filter( 'manage_product_posts_columns', function ( array $columns ) {
	$columns['menu_order'] = 'ลำดับ';
	return $columns;
} );
add_action( 'manage_product_posts_custom_column', function ( string $column, int $post_id ) {
	if ( 'menu_order' === $column ) {
		echo (int) get_post_field( 'menu_order', $post_id );
	}
}, 10, 2 );

add_filter( 'enter_title_here', function ( string $text, WP_Post $post ) {
	return match ( $post->post_type ) {
		'product'   => 'รหัสรุ่น เช่น ADC002',
		'portfolio' => 'ชื่อโครงการ',
		default     => $text,
	};
}, 10, 2 );

/*
 * Editors may not post raw HTML (script, iframe, inline handlers). WordPress
 * then filters their privacy-policy content through kses on save, so Next.js
 * can render it as HTML.
 */
add_filter( 'map_meta_cap', function ( array $caps, string $cap, int $user_id ) {
	if ( 'unfiltered_html' === $cap && ! user_can( $user_id, 'manage_options' ) ) {
		return [ 'do_not_allow' ];
	}
	return $caps;
}, 10, 3 );
