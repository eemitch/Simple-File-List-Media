<?php

/**
 * @package Element Engage - Simple File List Media
 */
/*
Plugin Name: Simple File List Media
Plugin URI: http://simplefilelist.com
Description: Adds basic audio playback to Simple File List
Author: Mitchell Bennis
Version: 1.0.1
Author URI: http://simplefilelist.com
License: EULA
 * Intellectual Property rights, and copyright, reserved by Mitchell Bennis as allowed by law include,
 * but are not limited to, the working concept, function, and behavior of this plugin,
 * the logical code structure and expression as written.
 *
 * @category    Plugin
 * @copyright   Copyright (c) Mitchell Bennis
Text Domain: ee-simple-file-list-media
Domain Path: /languages
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// SFL Versions
define('eeSFLM_Version', '1.0.1'); // Plugin version
// define('eeSFLM_DB_Version', '0');


// Text Strings to Pass to JavaScript
$eeSFLM_VarsForJS = array('Browser is Not Compatible');

// Language Enabler
function eeSFLM_Textdomain() {
    load_plugin_textdomain( 'ee-simple-file-list-media', FALSE, basename( dirname( __FILE__ ) ) . '/languages/' );
}
eeSFLM_Textdomain(); // Language Setup


// Enqueue Our CSS and JS

// Front-side <head>
function eeSFLM_Enqueue() {
	
	global $eeSFLM_VarsForJS;
	
	// CSS
    wp_register_style( 'ee-simple-file-list-media-css', plugin_dir_url(__FILE__) . 'ee-media-styles.css', '', eeSFLM_Version);
	wp_enqueue_style('ee-simple-file-list-media-css');
	
	// Javascript
	$deps = array('jquery'); // Requires jQuery
	
	// Register Scripts
	wp_register_script( 'ee-simple-file-list-media-head-js', plugin_dir_url(__FILE__) . 'ee-media-scripts-head.js' );
	wp_register_script( 'ee-simple-file-list-media-footer-js', plugin_dir_url(__FILE__) . 'ee-media-scripts-footer.js' );	
	// Enqueue
	wp_enqueue_script('ee-simple-file-list-media-head-js', plugin_dir_url(__FILE__) . 'ee-media-scripts-head.js', $deps, eeSFLM_Version, FALSE); // Head
	wp_enqueue_script('ee-simple-file-list-media-footer-js', plugin_dir_url(__FILE__) . 'ee-media-scripts-footer.js', $deps, eeSFLM_Version, TRUE); // Footer
	
	// Pass variables
	wp_localize_script('ee-simple-file-list-media-head-js', 'eeSFLM_Head_Variables', $eeSFLM_VarsForJS);

}

add_action( 'wp_enqueue_scripts', 'eeSFLM_Enqueue' );



// Admin <head>
function eeSFLM_AdminHead($eeHook) {

	global $eeSFLM_VarsForJS;
	
	$deps = array('jquery');
	
	// wp_die($eeHook); // Check the hook
    $eeHooks = array('toplevel_page_ee-simple-file-list',
    					'toplevel_page_ee-simple-file-list-pro');
    
    if(in_array($eeHook, $eeHooks)) {
        
        // CSS
        wp_enqueue_style( 'ee-simple-file-list-media-css', plugins_url('ee-media-styles.css', __FILE__), '', eeSFLM_Version );
        
		// Javascript
        wp_enqueue_script('ee-simple-file-list-media-head-js', plugin_dir_url(__FILE__) . 'ee-media-scripts-head.js',$deps, eeSFLM_Version, TRUE);
        wp_enqueue_script('ee-simple-file-list-media-footer-js', plugin_dir_url(__FILE__) . 'ee-media-scripts-footer.js',$deps, eeSFLM_Version, TRUE);
		
		// Pass variables
		wp_localize_script('ee-simple-file-list-media-head-js', 'eeSFLM_Head_Variables', $eeSFLM_VarsForJS );
		// wp_localize_script( 'ee-simple-file-list-media-footer-js', 'eeSFLM_Footer_Variables', $eeSFLM_VarsForJS );
    }  
}
add_action('admin_enqueue_scripts', 'eeSFLM_AdminHead');





// Activate
function eeSFLM_Activate() {
	
	return TRUE; // All done, nothing to do here.	
}
register_activation_hook( __FILE__, 'eeSFLM_Activate' );


?>