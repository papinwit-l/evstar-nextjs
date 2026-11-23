<?php
/**
 * Small builders for SCF field definitions.
 *
 * Fields are declared without keys; evstar_field_group() assigns stable keys
 * from the group key + field path (field_evstar_home_hero_title), so the same
 * reusable section (CTA, Highlights, Steps) can be added to several pages
 * without key clashes. Free SCF has no Clone field, so these PHP functions
 * play that role.
 *
 * Field names are camelCase to match the TypeScript types in src/types/.
 */

defined( 'ABSPATH' ) || exit;

function evstar_f( string $type, string $name, string $label, array $extra = [] ): array {
	return array_merge( [
		'type'            => $type,
		'name'            => $name,
		'label'           => $label,
		'show_in_graphql' => 1,
	], $extra );
}

function evstar_text( string $name, string $label, array $extra = [] ): array {
	return evstar_f( 'text', $name, $label, $extra );
}

/** Plain textarea. A line break marks a Thai phrase break (rendered by <Phrases>). */
function evstar_textarea( string $name, string $label, array $extra = [] ): array {
	return evstar_f( 'textarea', $name, $label, array_merge( [ 'rows' => 3, 'new_lines' => '' ], $extra ) );
}

function evstar_image( string $name, string $label, array $extra = [] ): array {
	return evstar_f( 'image', $name, $label, array_merge( [
		'return_format' => 'id',
		'preview_size'  => 'medium',
		'library'       => 'all',
	], $extra ) );
}

function evstar_true_false( string $name, string $label, array $extra = [] ): array {
	return evstar_f( 'true_false', $name, $label, array_merge( [ 'ui' => 1 ], $extra ) );
}

function evstar_number( string $name, string $label, array $extra = [] ): array {
	return evstar_f( 'number', $name, $label, $extra );
}

function evstar_select( string $name, string $label, array $choices, array $extra = [] ): array {
	return evstar_f( 'select', $name, $label, array_merge( [
		'choices'       => $choices,
		'return_format' => 'value',
		'ui'            => 0,
	], $extra ) );
}

/** Single post picker (returns one post). */
function evstar_post_picker( string $name, string $label, string $post_type, array $extra = [] ): array {
	return evstar_f( 'post_object', $name, $label, array_merge( [
		'post_type'     => [ $post_type ],
		'return_format' => 'object',
		'multiple'      => 0,
		'allow_null'    => 1,
		'ui'            => 1,
	], $extra ) );
}

function evstar_group( string $name, string $label, array $sub_fields, array $extra = [] ): array {
	return evstar_f( 'group', $name, $label, array_merge( [
		'layout'     => 'block',
		'sub_fields' => $sub_fields,
	], $extra ) );
}

function evstar_repeater( string $name, string $label, array $sub_fields, array $extra = [] ): array {
	return evstar_f( 'repeater', $name, $label, array_merge( [
		'layout'       => 'block',
		'button_label' => 'เพิ่มรายการ',
		'sub_fields'   => $sub_fields,
	], $extra ) );
}

/** Repeater of single lines, e.g. features[]. GraphQL returns [{ text }]. */
function evstar_text_list( string $name, string $label, array $extra = [], bool $multiline = false ): array {
	$item = $multiline ? evstar_textarea( 'text', 'ข้อความ', [ 'rows' => 4 ] ) : evstar_text( 'text', 'ข้อความ' );
	return evstar_repeater( $name, $label, [ $item ], array_merge( [ 'layout' => 'table' ], $extra ) );
}

function evstar_tab( string $label ): array {
	return [
		'type'      => 'tab',
		'name'      => '',
		'label'     => $label,
		'placement' => 'top',
	];
}

function evstar_message( string $message ): array {
	return [
		'type'    => 'message',
		'name'    => '',
		'label'   => '',
		'message' => $message,
	];
}

/* ------------------------------------------------------------------------
 * Reusable sections — mirror src/types/common.ts
 * --------------------------------------------------------------------- */

/** LinkField { label, href } */
function evstar_link( string $name, string $label, array $extra = [] ): array {
	return evstar_group( $name, $label, [
		evstar_text( 'label', 'ข้อความปุ่ม', [ 'wrapper' => [ 'width' => 50 ] ] ),
		evstar_text( 'href', 'ลิงก์', [
			'wrapper'      => [ 'width' => 50 ],
			'instructions' => 'เช่น /quote หรือ /quote?model=ac006',
		] ),
	], array_merge( [ 'layout' => 'table' ], $extra ) );
}

/** CtaData */
function evstar_cta( string $name = 'cta', string $label = 'แถบปิดท้าย (CTA)' ): array {
	return evstar_group( $name, $label, [
		evstar_textarea( 'title', 'หัวข้อ', [ 'required' => 1, 'rows' => 2 ] ),
		evstar_textarea( 'lead', 'คำโปรย' ),
		evstar_link( 'primary', 'ปุ่มหลัก' ),
		evstar_link( 'secondary', 'ปุ่มรอง (ไม่บังคับ)' ),
		evstar_true_false( 'showLine', 'แสดงปุ่ม LINE', [ 'default_value' => 1 ] ),
	] );
}

/** HighlightsData — designed for 4 items */
function evstar_highlights( string $name = 'highlights', string $label = 'จุดเด่น' ): array {
	return evstar_group( $name, $label, [
		evstar_textarea( 'title', 'หัวข้อ', [ 'rows' => 2 ] ),
		evstar_textarea( 'lead', 'คำโปรย' ),
		evstar_repeater( 'items', 'รายการ (แนะนำ 4 รายการ)', [
			evstar_text( 'value', 'ตัวเลข/คำเด่น', [ 'instructions' => 'สั้น 1–2 คำ เช่น "100%"', 'wrapper' => [ 'width' => 30 ] ] ),
			evstar_text( 'title', 'หัวข้อ', [ 'wrapper' => [ 'width' => 70 ] ] ),
			evstar_textarea( 'body', 'รายละเอียด' ),
		], [ 'max' => 8 ] ),
		evstar_link( 'link', 'ลิงก์ใต้หัวข้อ (ไม่บังคับ)' ),
	] );
}

/** StepsData — designed for 4 steps */
function evstar_steps( string $name = 'process', string $label = 'ขั้นตอนการทำงาน' ): array {
	return evstar_group( $name, $label, [
		evstar_textarea( 'title', 'หัวข้อ', [ 'rows' => 2 ] ),
		evstar_textarea( 'lead', 'คำโปรย' ),
		evstar_repeater( 'steps', 'ขั้นตอน (แนะนำ 4 ขั้นตอน)', [
			evstar_text( 'title', 'ชื่อขั้นตอน' ),
			evstar_textarea( 'body', 'รายละเอียด' ),
		], [ 'max' => 8 ] ),
		evstar_link( 'link', 'ลิงก์ใต้ขั้นตอน (ไม่บังคับ)' ),
	] );
}

/* ------------------------------------------------------------------------
 * Group registration
 * --------------------------------------------------------------------- */

/** Assign keys recursively: field_{group}_{parent}_{name}. */
function evstar_assign_keys( array $fields, string $prefix ): array {
	$tab = 0;
	foreach ( $fields as $i => $field ) {
		$name = $field['name'] !== '' ? $field['name'] : $field['type'] . '_' . ( ++$tab );
		$key  = $prefix . '_' . $name;

		$fields[ $i ]['key'] = 'field_' . $key;
		if ( ! empty( $field['sub_fields'] ) ) {
			$fields[ $i ]['sub_fields'] = evstar_assign_keys( $field['sub_fields'], $key );
		}
	}
	return $fields;
}

/**
 * @param string $key          Short unique id, e.g. "home"
 * @param string $graphql_name Field name in GraphQL, e.g. "homePage"
 * @param array  $location     SCF location rules
 * @param array  $graphql_types Explicit GraphQL types, or [] to map from the location rules
 */
function evstar_field_group( string $key, string $title, string $graphql_name, array $fields, array $location, array $graphql_types = [], array $extra = [] ): void {
	$group = [
		'key'                                   => 'group_evstar_' . $key,
		'title'                                 => $title,
		'fields'                                => evstar_assign_keys( $fields, 'evstar_' . $key ),
		'location'                              => $location,
		'position'                              => 'normal',
		'style'                                 => 'default',
		'label_placement'                       => 'top',
		'active'                                => true,
		'show_in_rest'                          => 0,
		'show_in_graphql'                       => 1,
		'graphql_field_name'                    => $graphql_name,
		'map_graphql_types_from_location_rules' => $graphql_types ? 0 : 1,
	];
	// An empty graphql_types array stops WPGraphQL for ACF from mapping the
	// location rules, so the key is only set when types are explicit.
	if ( $graphql_types ) {
		$group['graphql_types'] = $graphql_types;
	}
	acf_add_local_field_group( array_merge( $group, $extra ) );
}

/** Location rule for one of the site pages (see pages.php). */
function evstar_on_page( string $key ): array {
	return [ [ [ 'param' => 'page', 'operator' => '==', 'value' => (string) evstar_page_id( $key ) ] ] ];
}

/** Location rule for several site pages (OR). */
function evstar_on_pages( array $keys ): array {
	return array_map(
		fn( $key ) => [ [ 'param' => 'page', 'operator' => '==', 'value' => (string) evstar_page_id( $key ) ] ],
		$keys
	);
}
