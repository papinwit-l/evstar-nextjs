<?php
/**
 * Field groups. Each one mirrors a type in src/types/ so the Next.js API
 * layer only needs thin mappers.
 *
 * GraphQL access:
 *   evstarPage(key: "home") { homePage { ... } pageSeo { ... } }
 *   products { nodes { productFields { ... } productCategories { ... } } }
 *   portfolioCases { nodes { portfolioFields { ... } siteTypes { ... } } }
 *   siteSettings { siteSettingsFields { ... } }
 */

defined( 'ABSPATH' ) || exit;

add_action( 'acf/init', 'evstar_register_field_groups' );

function evstar_register_field_groups(): void {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	$hide_editor = [ 'hide_on_screen' => [ 'the_content', 'excerpt', 'discussion', 'comments', 'author', 'format', 'categories', 'tags', 'send-trackbacks' ] ];

	/* --------------------------------------------------------------------
	 * Home — src/types/home.ts
	 * ----------------------------------------------------------------- */

	// Product tiles reference a product and fall back to its own fields.
	$tile_overrides = [
		evstar_textarea( 'subtitleOverride', 'คำโปรยสำหรับหน้าแรก (ไม่บังคับ)', [
			'instructions' => 'เว้นว่างเพื่อใช้ Tagline ของสินค้า — หน้าแรกควรสั้นกว่า',
		] ),
		evstar_image( 'imageOverride', 'รูปสำหรับหน้าแรก (ไม่บังคับ)', [
			'instructions' => 'เว้นว่างเพื่อใช้รูปหลักของสินค้า',
		] ),
	];

	evstar_field_group( 'home', 'หน้าแรก', 'homePage', [
		evstar_tab( 'Hero' ),
		evstar_group( 'hero', 'ส่วนบนสุด (Hero)', [
			evstar_text( 'kicker', 'ข้อความเล็กด้านบน' ),
			evstar_textarea( 'title', 'หัวข้อหลัก', [ 'required' => 1, 'instructions' => 'ขึ้นบรรทัดใหม่ = จุดที่ตัดวลีภาษาไทยได้' ] ),
			evstar_textarea( 'subtitle', 'คำโปรย', [ 'rows' => 4 ] ),
			evstar_image( 'image', 'รูปภาพ' ),
			evstar_link( 'primary', 'ปุ่มหลัก' ),
			evstar_link( 'secondary', 'ปุ่มรอง' ),
			evstar_group( 'chargeLine', 'แถบกำลังชาร์จ', [
				evstar_text( 'label', 'ข้อความ', [ 'wrapper' => [ 'width' => 33 ] ] ),
				evstar_text( 'value', 'ค่า (ตัวหนา)', [ 'wrapper' => [ 'width' => 33 ], 'instructions' => 'เช่น 7 – 240 kW' ] ),
				evstar_text( 'detail', 'รายละเอียด', [ 'wrapper' => [ 'width' => 34 ] ] ),
			], [ 'layout' => 'table' ] ),
		] ),

		evstar_tab( 'สินค้า' ),
		evstar_group( 'featuredProduct', 'สินค้าเด่น (แถบสีดำ)', array_merge(
			[ evstar_post_picker( 'product', 'สินค้า', 'product', [ 'required' => 1 ] ) ],
			$tile_overrides
		) ),
		evstar_repeater( 'gridProducts', 'สินค้าแบบ 2 คอลัมน์', array_merge(
			[ evstar_post_picker( 'product', 'สินค้า', 'product', [ 'required' => 1 ] ) ],
			$tile_overrides
		), [ 'instructions' => 'ใส่จำนวนคู่ (2, 4) เพื่อไม่ให้ตารางมีช่องว่าง', 'button_label' => 'เพิ่มสินค้า' ] ),
		evstar_repeater( 'accessories', 'การ์ดอุปกรณ์เสริม', array_merge(
			[ evstar_post_picker( 'product', 'สินค้า', 'product', [ 'required' => 1 ] ) ],
			$tile_overrides
		), [ 'button_label' => 'เพิ่มอุปกรณ์' ] ),
		evstar_link( 'productsLink', 'ลิงก์ใต้สินค้า', [ 'instructions' => 'เช่น "ดูสินค้าทั้งหมด" → /products' ] ),

		evstar_tab( 'จุดเด่น' ),
		evstar_highlights(),

		evstar_tab( 'ขั้นตอน' ),
		evstar_steps( 'process', 'ขั้นตอนการทำงาน (แบบสั้น)' ),

		evstar_tab( 'CTA' ),
		evstar_cta( 'finalCta' ),
	], evstar_on_page( 'home' ), [ 'Page' ], $hide_editor );

	/* --------------------------------------------------------------------
	 * Products page — src/types/products.ts
	 * Products and categories come from the post type and taxonomy.
	 * ----------------------------------------------------------------- */

	evstar_field_group( 'products_page', 'หน้าสินค้า', 'productsPage', [
		evstar_message( 'สินค้าและหมวดสินค้าแก้ไขที่เมนู <a href="edit.php?post_type=product">สินค้า</a>' ),
		evstar_textarea( 'title', 'หัวข้อหน้า', [ 'required' => 1, 'rows' => 2 ] ),
		evstar_textarea( 'lead', 'คำโปรย' ),
		evstar_cta(),
	], evstar_on_page( 'products' ), [ 'Page' ], $hide_editor );

	/* --------------------------------------------------------------------
	 * Services — src/types/services.ts
	 * ----------------------------------------------------------------- */

	evstar_field_group( 'services_page', 'หน้าบริการ', 'servicesPage', [
		evstar_tab( 'หัวข้อ' ),
		evstar_textarea( 'title', 'หัวข้อหน้า', [ 'required' => 1, 'rows' => 2 ] ),
		evstar_textarea( 'lead', 'คำโปรย' ),

		evstar_tab( 'บริการ' ),
		evstar_repeater( 'services', 'บริการ', [
			evstar_select( 'icon', 'ไอคอน', [
				'install'     => 'ติดตั้ง',
				'platform'    => 'แพลตฟอร์ม',
				'maintenance' => 'บำรุงรักษา',
			], [ 'wrapper' => [ 'width' => 50 ], 'default_value' => 'install' ] ),
			evstar_text( 'anchor', 'Anchor (ไม่บังคับ)', [
				'wrapper'      => [ 'width' => 50 ],
				'instructions' => 'ภาษาอังกฤษ ไม่มีเว้นวรรค เช่น install — เว้นว่างเพื่อใช้ชื่อไอคอน',
			] ),
			evstar_text( 'title', 'ชื่อบริการ', [ 'required' => 1 ] ),
			evstar_textarea( 'body', 'รายละเอียด' ),
			evstar_text_list( 'bullets', 'หัวข้อย่อย' ),
		], [ 'button_label' => 'เพิ่มบริการ' ] ),

		evstar_tab( 'ขั้นตอน' ),
		evstar_steps( 'process', 'ขั้นตอนการทำงาน (แบบละเอียด)' ),

		evstar_tab( 'CTA' ),
		evstar_cta(),
	], evstar_on_page( 'services' ), [ 'Page' ], $hide_editor );

	/* --------------------------------------------------------------------
	 * About — src/types/about.ts
	 * ----------------------------------------------------------------- */

	evstar_field_group( 'about_page', 'หน้าเกี่ยวกับเรา', 'aboutPage', [
		evstar_tab( 'Hero' ),
		evstar_group( 'hero', 'ส่วนบนสุด', [
			evstar_text( 'kicker', 'ข้อความเล็กด้านบน' ),
			evstar_textarea( 'title', 'หัวข้อ', [ 'required' => 1, 'rows' => 2 ] ),
			evstar_textarea( 'lead', 'คำโปรย' ),
			evstar_image( 'image', 'รูปภาพแนวกว้าง (21:9)', [ 'instructions' => 'ทีมงาน สำนักงาน หรือหน้างานที่ติดตั้งเสร็จ' ] ),
		] ),

		evstar_tab( 'เรื่องราว' ),
		evstar_group( 'story', 'เรื่องราวของเรา', [
			evstar_text( 'kicker', 'ข้อความเล็กด้านบน' ),
			evstar_textarea( 'title', 'หัวข้อ', [ 'rows' => 2 ] ),
			evstar_text_list( 'paragraphs', 'ย่อหน้า', [ 'instructions' => 'ย่อหน้าแรกจะแสดงตัวใหญ่เป็นบทนำ' ], true ),
			evstar_image( 'image', 'รูปภาพแนวตั้ง (4:5)' ),
		] ),

		evstar_tab( 'ทำไมต้องเรา' ),
		evstar_highlights( 'why', 'ทำไมต้อง ChargeCore' ),

		evstar_tab( 'CTA' ),
		evstar_cta(),
	], evstar_on_page( 'about' ), [ 'Page' ], $hide_editor );

	/* --------------------------------------------------------------------
	 * Portfolio page — src/types/portfolio.ts
	 * ----------------------------------------------------------------- */

	evstar_field_group( 'portfolio_page', 'หน้าผลงาน', 'portfolioPage', [
		evstar_message( 'ผลงานแต่ละชิ้นแก้ไขที่เมนู <a href="edit.php?post_type=portfolio">ผลงาน</a>' ),
		evstar_textarea( 'title', 'หัวข้อหน้า', [ 'required' => 1, 'rows' => 2, 'instructions' => 'ใช้เป็นหัวข้อส่วนผลงานบนหน้าแรกด้วย' ] ),
		evstar_textarea( 'lead', 'คำโปรย' ),
		evstar_cta(),
	], evstar_on_page( 'portfolio' ), [ 'Page' ], $hide_editor );

	/* --------------------------------------------------------------------
	 * Quote page
	 * ----------------------------------------------------------------- */

	evstar_field_group( 'quote_page', 'หน้าขอใบเสนอราคา', 'quotePage', [
		evstar_message( 'เบอร์โทร อีเมล LINE ที่อยู่ และขนาดมิเตอร์ แก้ไขที่ <a href="admin.php?page=evstar-settings">ตั้งค่าเว็บไซต์</a> · รุ่นในแบบฟอร์มมาจากสินค้าที่เผยแพร่อยู่' ),
		evstar_textarea( 'title', 'หัวข้อ (ขอใบเสนอราคา)', [ 'required' => 1, 'rows' => 2 ] ),
		evstar_textarea( 'surveyTitle', 'หัวข้อ (จองคิวสำรวจหน้างาน)', [ 'rows' => 2 ] ),
		evstar_textarea( 'lead', 'คำโปรย' ),
		evstar_textarea( 'thankYou', 'ข้อความหลังส่งฟอร์ม', [ 'rows' => 3 ] ),
	], evstar_on_page( 'quote' ), [ 'Page' ], $hide_editor );

	/* --------------------------------------------------------------------
	 * SEO — every site page (Privacy policy included)
	 * ----------------------------------------------------------------- */

	evstar_field_group( 'seo', 'SEO', 'pageSeo', [
		evstar_text( 'seoTitle', 'Title', [ 'instructions' => 'ประมาณ 50–60 ตัวอักษร — เว้นว่างเพื่อใช้ชื่อหน้า', 'maxlength' => 70 ] ),
		evstar_textarea( 'seoDescription', 'Description', [ 'instructions' => 'ประมาณ 120–155 ตัวอักษร', 'maxlength' => 200 ] ),
	], evstar_on_pages( array_keys( evstar_page_definitions() ) ), [ 'Page' ], [
		'menu_order' => 100,
		'position'   => 'normal',
	] );

	/* --------------------------------------------------------------------
	 * Product — ProductDetail in src/types/products.ts
	 * ----------------------------------------------------------------- */

	evstar_field_group( 'product', 'ข้อมูลสินค้า', 'productFields', [
		evstar_message( 'ชื่อเรื่อง = รหัสรุ่น (เช่น ADC002) · Slug ใช้เป็นค่าในแบบฟอร์มใบเสนอราคา (เช่น adc002) อย่าเปลี่ยนหลังเผยแพร่ · รูปหลัก = Featured image · ลำดับการแสดงผล = ช่อง Order' ),
		evstar_text( 'brand', 'แบรนด์', [ 'default_value' => 'ChargeCore', 'wrapper' => [ 'width' => 40 ] ] ),
		evstar_text( 'kicker', 'ข้อความเล็กด้านบน', [ 'wrapper' => [ 'width' => 60 ], 'instructions' => 'เช่น DC Fast Charger · 120–180 kW' ] ),
		evstar_textarea( 'tagline', 'Tagline', [ 'required' => 1 ] ),
		evstar_text_list( 'features', 'จุดเด่น / ฟังก์ชัน' ),
		evstar_repeater( 'specs', 'สเปก', [
			evstar_text( 'label', 'หัวข้อ', [ 'wrapper' => [ 'width' => 35 ] ] ),
			evstar_text( 'value', 'ค่า', [ 'wrapper' => [ 'width' => 65 ] ] ),
		], [ 'layout' => 'table', 'button_label' => 'เพิ่มสเปก' ] ),
		evstar_text( 'audience', 'เหมาะกับ', [ 'instructions' => 'เช่น บ้านเดี่ยว · ทาวน์โฮม · ลานจอดส่วนตัว' ] ),
		evstar_select( 'ctaType', 'ปุ่ม', [
			'quote'   => 'ขอใบเสนอราคา',
			'consult' => 'ปรึกษาโครงการ',
			'ask'     => 'สอบถามเพิ่มเติม',
		], [ 'default_value' => 'quote' ] ),
	], [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ] ] ], [], [
		'hide_on_screen' => [ 'the_content', 'excerpt', 'discussion', 'comments', 'author', 'format', 'send-trackbacks' ],
	] );

	/* --------------------------------------------------------------------
	 * Product category — ProductCategory in src/types/products.ts
	 * The term slug is the page anchor (/products#dc-fast).
	 * ----------------------------------------------------------------- */

	evstar_field_group( 'product_category', 'ข้อมูลหมวดสินค้า', 'productCategoryFields', [
		evstar_text( 'navLabel', 'ชื่อในแถบเมนูหมวด', [ 'instructions' => 'สั้น ๆ เช่น DC Fast Charger' ] ),
		evstar_textarea( 'title', 'หัวข้อหมวด', [ 'rows' => 2 ] ),
		evstar_textarea( 'lead', 'คำโปรย' ),
		evstar_number( 'order', 'ลำดับ', [ 'default_value' => 0, 'instructions' => 'น้อยแสดงก่อน' ] ),
	], [ [ [ 'param' => 'taxonomy', 'operator' => '==', 'value' => 'product_category' ] ] ] );

	/* --------------------------------------------------------------------
	 * Portfolio case — CaseCardData + ReviewData in src/types/portfolio.ts
	 * ----------------------------------------------------------------- */

	evstar_field_group( 'portfolio', 'ข้อมูลผลงาน', 'portfolioFields', [
		evstar_message( 'ชื่อเรื่อง = ชื่อโครงการ · รูปหลัก = Featured image (ขอไฟล์ต้นฉบับ ≥ 2000px) · เลือก "ประเภทสถานที่" ทางขวา' ),
		evstar_post_picker( 'model', 'รุ่นที่ติดตั้ง', 'product', [ 'wrapper' => [ 'width' => 50 ] ] ),
		evstar_text( 'location', 'สถานที่', [ 'wrapper' => [ 'width' => 50 ], 'instructions' => 'เขต, จังหวัด' ] ),
		evstar_true_false( 'featuredOnHome', 'แสดงบนหน้าแรก' ),
		evstar_group( 'review', 'รีวิวจากลูกค้า (ไม่บังคับ)', [
			evstar_textarea( 'quote', 'ข้อความรีวิว', [ 'rows' => 4 ] ),
			evstar_text( 'author', 'ชื่อผู้รีวิว', [ 'wrapper' => [ 'width' => 50 ] ] ),
			evstar_text( 'context', 'บริบท', [ 'wrapper' => [ 'width' => 50 ], 'instructions' => 'เช่น เจ้าของบ้าน, ผู้จัดการอาคาร' ] ),
		] ),
	], [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'portfolio' ] ] ], [], [
		'hide_on_screen' => [ 'the_content', 'excerpt', 'discussion', 'comments', 'author', 'format', 'send-trackbacks' ],
	] );
}
