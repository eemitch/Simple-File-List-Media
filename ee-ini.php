<?php
	
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
if ( ! wp_verify_nonce( $eeSFL_Nonce, 'eeSFL_Include' )) exit('ERROR 98 - Media INI'); // Exit if nonce fails

global $eeSFLM; // Important
	
// Initiate our Class
$eeSFLM_Nonce = wp_create_nonce('eeSFLM_Include'); // Security
include_once(__DIR__ . '/includes/eeSFLM_class.php'); // Get Class File
$eeSFLM = new eeSFLM_class(); // Initiate the Class

$eeSFLM->eeSFLM_InstallCheck();

?>