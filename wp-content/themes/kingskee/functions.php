<?php
// Allows Wordpress to output the <title> tag
add_theme_support( 'title-tag' );
add_theme_support( 'post-thumbnails', array('newsletter') );
add_theme_support('post-thumbnails');
add_image_size('full');
// Disable Admin Bar
function cn_function_admin_bar(){ return false; }
add_filter( 'show_admin_bar' , 'cn_function_admin_bar');

// Menus
function cn_menus() {
    register_nav_menus(array(
        'header-menu' => __( 'Header Menu' ),
        'footer-menu' => __( 'Footer Menu' )
    ));
}
add_action( 'init', 'cn_menus' );



add_filter('acf/settings/google_api_key', function () {
    return 'AIzaSyC9whyiAa6-otOP8QMrQvjI-rfnf4dNXF4';
});

// Custom ACF Options
if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array(
        'page_title' 	=> 'Theme General Settings',
        'menu_title'	=> 'Theme Settings',
        'menu_slug' 	=> 'theme-general-settings',
        'capability'	=> 'edit_posts',
        'redirect'		=> false
    ));

}

remove_filter ('acf_the_content', 'wpautop');

// Custom Post Types
function cn_register_custom_post_types() {
    register_post_type( 'event', cn_custom_post_type_event() );
    register_post_type( 'testimonial', cn_custom_post_type_testimonial() );
}
add_action( 'init', 'cn_register_custom_post_types' );

function cn_custom_post_type_labels( $singular, $plural )  {
    $lower_singular = strtolower( $singular );
    $lower_plural = strtolower( $plural );
    return array(
        'name' => _x( $plural, $lower_singular ),
        'singular_name' => _x( $singular, $lower_singular ),
        'add_new' => _x( 'Add New', $lower_singular ),
        'add_new_item' => _x( 'Add New ' . $singular, $lower_singular ),
        'edit_item' => _x( 'Edit ' . $singular, $lower_singular ),
        'new_item' => _x( 'New ' . $singular, $lower_singular ),
        'update_item' => _x( 'Update ' . $singular, $lower_singular ),
        'all_items' => _x( 'All ' . $plural, $lower_singular ),
        'parent_item' => _x( 'Parent ' . $singular, $lower_singular ),
        'view_item' => _x( 'View ' . $singular, $lower_singular ),
        'search_items' => _x( 'Search ' . $plural, $lower_singular ),
        'not_found' => _x( 'No ' . $lower_plural . ' found', $lower_singular ),
        'not_found_in_trash' => _x( 'No ' . $lower_plural . ' found in the Trash', $lower_singular ),
        'parent_item_colon' => _x( 'Parent ' . $singular . ':', $lower_singular ),
        'menu_name' => $plural
    );
}
// Custom Post Type 'press'
function cn_custom_post_type_event() {
    return array(
        'labels' => cn_custom_post_type_labels( 'Event', 'Events' ),
        'public' => true,
        'menu_position' => 21,
        'menu_icon' => 'dashicons-megaphone',
        'supports' => array( 'title', 'editor' ),
        'hierarchical' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => false,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'has_archive' => true,
        'query_var' => true,
        'can_export' => true,
        'capability_type' => 'post',
        'rewrite' => array(
            'slug' => 'event',
            'with_front'=> false
        )
    );
}

// Custom Post Type 'testimonial'
function cn_custom_post_type_testimonial() {
    return array(
        'labels' => cn_custom_post_type_labels( 'Testimonial', 'Testimonials' ),
        'public' => true,
        'menu_position' => 22,
        'menu_icon' => 'dashicons-editor-quote',
        'supports' => array( 'title', 'editor' ),
        'hierarchical' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => false,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'has_archive' => true,
        'query_var' => true,
        'can_export' => true,
        'capability_type' => 'post',
        'rewrite' => array(
            'slug' => 'testimonial',
            'with_front'=> false
        )
    );
}


function submit_email() {
    if( isset( $_POST[ 'data' ]) ) {
        parse_str( $_POST[ 'data' ], $data );
        // die( json_encode( $data ) );
        // var_dump($data);
        $visitor_email = $data['email'];
        $activity = $data['activity'];
        $budget = $data['budget'];
        $to = "remykartzman@gmail.com";
        $email_subject = "New Form submission";
        $mailBody="Activity: $activity \n Budget: $budget\n ";
        
        mail($to, $email_subject ,$mailBody, "From: $visitor_email");
    }

    
    
    
}


add_action('wp_ajax_submit_email', 'submit_email');
add_action('wp_ajax_nopriv_submit_email', 'submit_email');