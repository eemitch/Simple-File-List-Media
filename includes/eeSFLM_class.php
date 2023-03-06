<?php
	
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
if ( ! wp_verify_nonce( $eeSFLM_Nonce, 'eeSFLM_Include' )) exit('ERROR 98 - Media Class'); // Exit if nonce fails

class eeSFLM_class {
	
	public $eePluginName = 'Media Player';							
									
	// Default Settings							
	public $eeSFLM_SettingsDefault = array(
		'AudioEnabled' => 'YES'
		,'AudioHeight' => 0
	);
	
	
	public function eeSFLM_InstallCheck() {
		
		global $eeSFL_BASE;
		
		// Free or Pro ?
		if(is_object($eeSFL_BASE)) { $eeObject = $eeSFL_BASE; $eeID = 1; } 
			else { global $eeSFL; $eeObject = $eeSFL; $eeID = $eeObject->eeListID; }
		
		if(!isset($eeObject->eeListSettings['AudioEnable'])) {
			
			$eeListSettings = array_merge($eeObject->eeListSettings, $this->eeSFLM_SettingsDefault);
			update_option('eeSFL_Settings_' . $eeID, $eeListSettings);
			
			if(is_object($eeSFL_BASE)) {
				$eeSFL_BASE->eeListSettings = $eeListSettings;
			} else {
				$eeSFL->eeListSettings = $eeListSettings;
			}
		}
	}
	
	
	
	
	public function eeSFLM_SettingsProcess($eeString, $eeGo, $eeID = 1) { // $eeSFL_BASE or ''
		
		if($eeString == '_BASE') {
			global $eeSFL_BASE;
		} else {
			global $eeSFL;
			$eeString = '';
		}
		
		// Build the object variable name
		$eeObject = ${'eeSFL' . $eeString};
		
		// YES/NO Checkboxes
		$eeCheckboxes = array(
			'AudioEnabled'
		);
		
		if(function_exists('eeSFL_BASE_ProcessCheckboxInput')) {
			foreach( $eeCheckboxes as $eeTerm ) {
				$eeObject->eeListSettings[$eeTerm] = eeSFL_BASE_ProcessCheckboxInput($eeTerm);
			}
		} else {
			foreach( $eeCheckboxes as $eeTerm ) {
				$eeObject->eeListSettings[$eeTerm] = eeSFL_ProcessCheckboxInput($eeTerm);
			}
		}
		
		
		$eeTextInputs = array(
			'AudioHeight'
		);
		
		if(function_exists('eeSFL_BASE_ProcessTextInput')) {
			foreach( $eeTextInputs as $eeTerm ) {
				$eeObject->eeListSettings[$eeTerm] = eeSFL_BASE_ProcessTextInput($eeTerm);
			}
		} else {
			foreach( $eeTextInputs as $eeTerm ) {
				$eeObject->eeListSettings[$eeTerm] = eeSFL_ProcessTextInput($eeTerm);
			}
		}
		
		// echo '<pre>'; print_r($_POST); echo '</pre>';
		// echo '<pre>'; print_r($eeObject->eeListSettings); echo '</pre>'; exit;
		
		ksort($eeObject->eeListSettings);
		update_option('eeSFL_Settings_' . $eeID, $eeObject->eeListSettings);
			
	}
	
	
	
	
	public function eeSFLM_SettingsInputsDisplay() {
		
		global $eeSFL_BASE, $eeSFL;
		
		// Free or Pro ?
		if(is_object($eeSFL_BASE)) { $eeObject = $eeSFL_BASE; } else { $eeObject = $eeSFL; }
		
		$eeOutput = '<div class="eeSettingsTile">
		
		<h2>' . __('Media Player', 'ee-simple-file-list-media') . '</h2>
		
		<fieldset>
		
			<legend>' . __('Enable In-Line Audio Player', 'ee-simple-file-list-media') . '</legend>
			
			<div>
			<label for="eeAudioEnabled">' . __('Enable', 'ee-simple-file-list-media') . ':</label>
			<input type="checkbox" name="eeAudioEnabled" id="eeAudioEnabled" value="YES" ';
			
			if($eeObject->eeListSettings['AudioEnabled'] == 'YES') { $eeOutput .= 'checked="checked"'; }
			
			$eeOutput .= ' />
			</div>
			
			<div class="eeNote">' . __('Show the HTML5 Audio Player next to the file name', 'ee-simple-file-list-media') . '</div>
			
			
		</fieldset>
			
		<fieldset>
		
			<legend>' . __('Choose the Audio Player Height', 'ee-simple-file-list-media') . '</legend>	
			
			<div><label for="eeAudioHeight">' . __('Height', 'ee-simple-file-list-media') . ':</label>
			<input type="number" name="eeAudioHeight" id="eeAudioHeight" value="' . $eeObject->eeListSettings['AudioHeight'] . '" />
			</div>
			
			<div class="eeNote">' . __('Define the height of the audio player in pixels.', 'ee-simple-file-list-media') . ' ' . __('Set to zero to ignore this value.', 'ee-simple-file-list-media') . '</div>
			
		</fieldset>
		
		</div>';

		return $eeOutput;
		
	}
}