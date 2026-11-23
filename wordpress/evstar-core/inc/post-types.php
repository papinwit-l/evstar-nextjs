<?php
/**
 * Post types and taxonomies.
 *
 * Both post types are public so WPGraphQL serves them to anonymous requests;
 * the WordPress front end itself redirects to Next.js (see admin.php).
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', 'evstar_register_post_types' );
add_action( 'init', 'evstar_register_taxonomies' );

function evstar_register_post_types(): void {
	register_post_type( 'product', [
		'labels'              => [
			'name'          => 'สินค้า',
			'singular_name' => 'สินค้า',
			'add_new_item'  => 'เพิ่มสินค้า',
			'edit_item'     => 'แก้ไขสินค้า',
			'all_items'     => 'สินค้าทั้งหมด',
		],
		'public'              => true,
		'has_archive'         => false,
		'rewrite'             => [ 'slug' => 'products', 'with_front' => false ],
		'menu_icon'           => 'dashicons-car',
		'menu_position'       => 5,
		// The title is the model code (e.g. ADC002); the slug becomes the quote form value (adc002).
		// "page-attributes" gives the Order box that sets display order within a category.
		'supports'            => [ 'title', 'thumbnail', 'page-attributes' ],
		'hierarchical'        => false,
		'show_in_rest'        => true,
		'show_in_graphql'     => true,
		'graphql_single_name' => 'product',
		'graphql_plural_name' => 'products',
	] );

	register_post_type( 'portfolio', [
		'labels'              => [
			'name'          => 'ผลงาน',
			'singular_name' => 'ผลงาน',
			'add_new_item'  => 'เพิ่มผลงาน',
			'edit_item'     => 'แก้ไขผลงาน',
			'all_items'     => 'ผลงานทั้งหมด',
		],
		'public'              => true,
		'has_archive'         => false,
		'rewrite'             => [ 'slug' => 'portfolio', 'with_front' => false ],
		'menu_icon'           => 'dashicons-format-gallery',
		'menu_position'       => 6,
		'supports'            => [ 'title', 'thumbnail', 'page-attributes' ],
		'show_in_rest'        => true,
		'show_in_graphql'     => true,
		'graphql_single_name' => 'portfolioCase',
		'graphql_plural_name' => 'portfolioCases',
	] );
}

function evstar_register_taxonomies(): void {
	register_taxonomy( 'product_category', [ 'product' ], [
		'labels'              => [
			'name'          => 'หมวดสินค้า',
			'singular_name' => 'หมวดสินค้า',
			'add_new_item'  => 'เพิ่มหมวดสินค้า',
		],
		'public'              => true,
		'hierarchical'        => true, // checkbox UI in the editor
		'show_admin_column'   => true,
		'rewrite'             => false,
		'show_in_rest'        => true,
		'show_in_graphql'     => true,
		'graphql_single_name' => 'productCategory',
		'graphql_plural_name' => 'productCategories',
	] );

	register_taxonomy( 'site_type', [ 'portfolio' ], [
		'labels'              => [
			'name'          => 'ประเภทสถานที่',
			'singular_name' => 'ประเภทสถานที่',
			'add_new_item'  => 'เพิ่มประเภทสถานที่',
		],
		'public'              => true,
		'hierarchical'        => true,
		'show_admin_column'   => true,
		'rewrite'             => false,
		'show_in_rest'        => true,
		'show_in_graphql'     => true,
		'graphql_single_name' => 'siteType',
		'graphql_plural_name' => 'siteTypes',
	] );
}

/**
 * Default terms. Slugs are anchors / filter values used by the Next.js site
 * (/products#dc-fast, /portfolio?type=house), so they are created once and
 * should not be renamed.
 */
function evstar_seed_terms(): void {
	$terms = [
		'product_category' => [
			'dc-fast'     => 'DC Fast Charger',
			'ac'          => 'AC Charger',
			'accessories' => 'อุปกรณ์เสริม',
		],
		'site_type'        => [
			'house'   => 'บ้าน',
			'condo'   => 'คอนโด',
			'office'  => 'อาคารสำนักงาน',
			'factory' => 'โรงงาน',
			'station' => 'สถานีชาร์จ',
		],
	];

	foreach ( $terms as $taxonomy => $items ) {
		foreach ( $items as $slug => $name ) {
			if ( ! term_exists( $slug, $taxonomy ) ) {
				wp_insert_term( $name, $taxonomy, [ 'slug' => $slug ] );
			}
		}
	}
}
