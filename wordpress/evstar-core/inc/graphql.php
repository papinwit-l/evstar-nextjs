<?php
/**
 * WPGraphQL additions.
 *
 *   query { evstarPage(key: "about") { title aboutPage { ... } pageSeo { ... } } }
 *
 * Next.js asks for site pages by key instead of URI or database ID, so the
 * home page (served at "/") needs no special case and IDs can differ between
 * environments.
 */

defined( 'ABSPATH' ) || exit;

add_action( 'graphql_register_types', function () {
	register_graphql_enum_type( 'EvstarPageKey', [
		'description' => 'Site pages managed by EVSTAR Core',
		'values'      => array_combine(
			array_map( fn( $key ) => strtoupper( str_replace( '-', '_', $key ) ), array_keys( evstar_page_definitions() ) ),
			array_map( fn( $key ) => [ 'value' => $key ], array_keys( evstar_page_definitions() ) )
		),
	] );

	register_graphql_field( 'RootQuery', 'evstarPage', [
		'type'        => 'Page',
		'description' => 'One of the site pages, by key',
		'args'        => [
			'key' => [ 'type' => [ 'non_null' => 'EvstarPageKey' ] ],
		],
		'resolve'     => function ( $root, array $args, $context ) {
			$id = evstar_page_id( $args['key'] );
			if ( ! $id ) {
				return null;
			}
			return $context->get_loader( 'post' )->load_deferred( $id );
		},
	] );
} );
