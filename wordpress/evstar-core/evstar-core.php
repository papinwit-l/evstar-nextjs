<?php
/**
 * Plugin Name:       EVSTAR Core
 * Description:       Headless CMS setup for the EVSTAR Next.js site — post types, field groups, site settings, revalidation and admin clean-up.
 * Version:           0.1.0
 * Requires at least: 6.5
 * Requires PHP:      8.1
 * Author:            EVSTAR web team
 * Text Domain:       evstar-core
 *
 * Requires (all free, from WordPress.org):
 *   - Secure Custom Fields (SCF)
 *   - WPGraphQL
 *   - WPGraphQL for ACF
 *
 * Optional constants in wp-config.php:
 *   define( 'EVSTAR_NEXT_URL', 'https://www.example.com' );   // Next.js site, no trailing slash
 *   define( 'EVSTAR_REVALIDATE_SECRET', 'long-random-string' ); // same value as REVALIDATE_SECRET in Next.js
 */

defined( 'ABSPATH' ) || exit;

define( 'EVSTAR_CORE_VERSION', '0.1.0' );
define( 'EVSTAR_CORE_DIR', plugin_dir_path( __FILE__ ) );

require_once EVSTAR_CORE_DIR . 'inc/post-types.php';
require_once EVSTAR_CORE_DIR . 'inc/pages.php';
require_once EVSTAR_CORE_DIR . 'inc/field-builders.php';
require_once EVSTAR_CORE_DIR . 'inc/fields.php';
require_once EVSTAR_CORE_DIR . 'inc/options.php';
require_once EVSTAR_CORE_DIR . 'inc/graphql.php';
require_once EVSTAR_CORE_DIR . 'inc/revalidate.php';
require_once EVSTAR_CORE_DIR . 'inc/admin.php';

register_activation_hook( __FILE__, 'evstar_activate' );

function evstar_activate(): void {
	evstar_register_post_types();
	evstar_register_taxonomies();
	evstar_seed_terms();
	evstar_ensure_pages();
	flush_rewrite_rules();
}

/** Warn in wp-admin when a required plugin is missing. */
add_action( 'admin_notices', function () {
	if ( ! current_user_can( 'activate_plugins' ) ) {
		return;
	}
	$missing = [];
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		$missing[] = 'Secure Custom Fields';
	}
	if ( ! function_exists( 'register_graphql_field' ) ) {
		$missing[] = 'WPGraphQL';
	}
	if ( ! class_exists( 'WPGraphQLAcf' ) && ! defined( 'WPGRAPHQL_FOR_ACF_VERSION' ) ) {
		$missing[] = 'WPGraphQL for ACF';
	}
	if ( $missing ) {
		printf(
			'<div class="notice notice-error"><p><strong>EVSTAR Core</strong> needs these plugins active: %s</p></div>',
			esc_html( implode( ', ', $missing ) )
		);
	}
} );
