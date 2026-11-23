<?php
/**
 * Site Settings options page — replaces the placeholders in src/lib/site.ts.
 *
 * The quote recipient email is deliberately NOT here: it lives in a Next.js
 * environment variable so CMS access cannot redirect leads.
 */

defined( 'ABSPATH' ) || exit;

add_action( 'acf/init', function () {
	if ( ! function_exists( 'acf_add_options_page' ) || ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_options_page( [
		'page_title'        => 'ตั้งค่าเว็บไซต์',
		'menu_title'        => 'ตั้งค่าเว็บไซต์',
		'menu_slug'         => 'evstar-settings',
		'capability'        => 'edit_pages', // Editors can update contact details
		'icon_url'          => 'dashicons-admin-settings',
		'position'          => 3,
		'redirect'          => false,
		'autoload'          => true,
		'show_in_graphql'   => true,
		'graphql_type_name' => 'SiteSettings',
	] );

	evstar_field_group( 'settings', 'ตั้งค่าเว็บไซต์', 'siteSettingsFields', [
		evstar_tab( 'บริษัท' ),
		evstar_text( 'nameTh', 'ชื่อบริษัท (ไทย)', [ 'default_value' => 'บริษัท อีวีสตาร์ โซลูชั่น จำกัด' ] ),
		evstar_text( 'nameEn', 'ชื่อบริษัท (อังกฤษ)', [ 'default_value' => 'EVSTAR SOLUTIONS CO., LTD.' ] ),

		evstar_tab( 'ติดต่อ' ),
		evstar_text( 'phone', 'เบอร์โทร', [ 'wrapper' => [ 'width' => 50 ], 'instructions' => 'แสดงตามที่พิมพ์ เช่น 02 000 0000' ] ),
		evstar_f( 'email', 'email', 'อีเมล', [ 'wrapper' => [ 'width' => 50 ] ] ),
		evstar_f( 'url', 'lineUrl', 'ลิงก์ LINE OA', [ 'instructions' => 'เช่น https://lin.ee/xxxx' ] ),
		evstar_textarea( 'address', 'ที่อยู่', [ 'rows' => 3 ] ),
		evstar_textarea( 'openingHours', 'เวลาทำการ', [ 'rows' => 2, 'instructions' => 'บรรทัดละช่วงเวลา' ] ),
		evstar_f( 'url', 'mapUrl', 'ลิงก์ Google Maps' ),

		evstar_tab( 'แบบฟอร์มใบเสนอราคา' ),
		evstar_repeater( 'meterSizes', 'ขนาดมิเตอร์', [
			evstar_text( 'value', 'ค่า (ภาษาอังกฤษ)', [ 'wrapper' => [ 'width' => 30 ], 'instructions' => 'เช่น 15-45 — ห้ามเปลี่ยนหลังใช้งาน' ] ),
			evstar_text( 'label', 'ข้อความที่แสดง', [ 'wrapper' => [ 'width' => 70 ] ] ),
		], [ 'layout' => 'table', 'button_label' => 'เพิ่มขนาดมิเตอร์' ] ),
		evstar_text( 'responseTime', 'ระยะเวลาติดต่อกลับ', [ 'instructions' => 'เช่น ภายใน 1 วันทำการ' ] ),
	], [ [ [ 'param' => 'options_page', 'operator' => '==', 'value' => 'evstar-settings' ] ] ] );
} );
