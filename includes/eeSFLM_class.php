<?php
	
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
if ( ! wp_verify_nonce( $eeSFLM_Nonce, 'eeSFLM_Include' )) exit('ERROR 98 - Media Class'); // Exit if nonce fails

class eeSFLM_class {
	
	public $eePluginName = 'Media Player';							
									
	// Default Settings							
	public $eeSFLM_SettingsDefault = array(
		'AudioEnabled' => 'YES'
		,'AudioHeight' => 20
		,'AudioColor' => '#000000'
		,'AudioTypes' => 'mp3'
		,'VideoTypes' => 'mp4'
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
			,'AudioColor'
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
		
		
		
		// Audio Types
		if(isset($_POST['eeAudioTypes'])) { // Strip all but what we need for the comma list of file extensions
			
			$eeFileFormatsIN = preg_replace("/[^a-z0-9,]/i", "", $_POST['eeAudioTypes']);
			$eeFileFormatsIN = explode(',', $eeFileFormatsIN);
			$eeFileFormatsOK = '';
			foreach( $eeFileFormatsIN as $eeKey => $eeValue){
				$eeValue = trim($eeValue);
				if(in_array($eeValue, $eeObject->eeForbiddenTypes)) {
					$eeObject->eeLog[$eeGo]['errors'][] = __('This audio file type is not allowed', 'ee-simple-file-list-media') . ': ' . $eeValue;
				} elseif($eeValue) {
					$eeFileFormatsOK .= $eeValue . ',';
				}
			}
			$eeObject->eeListSettings['AudioTypes'] = substr($eeFileFormatsOK, 0, -1);
		}
		
		
		// Video Types
		if(isset($_POST['eeVideoTypes'])) { // Strip all but what we need for the comma list of file extensions
			
			$eeFileFormatsIN = preg_replace("/[^a-z0-9,]/i", "", $_POST['eeVideoTypes']);
			$eeFileFormatsIN = explode(',', $eeFileFormatsIN);
			$eeFileFormatsOK = '';
			foreach( $eeFileFormatsIN as $eeKey => $eeValue){
				$eeValue = trim($eeValue);
				if(in_array($eeValue, $eeObject->eeForbiddenTypes)) {
					$eeObject->eeLog[$eeGo]['errors'][] = __('This video file type is not allowed', 'ee-simple-file-list-media') . ': ' . $eeValue;
				} elseif($eeValue) {
					$eeFileFormatsOK .= $eeValue . ',';
				}
			}
			$eeObject->eeListSettings['VideoTypes'] = substr($eeFileFormatsOK, 0, -1);
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
			
			<div class="eeNote">' . __('Define the height of the audio player in pixels.', 'ee-simple-file-list-media') . '</div>
			
		</fieldset>
			
		<fieldset>
		
			<legend>' . __('Choose the Audio Player Color', 'ee-simple-file-list-media') . '</legend>	
			
			<div><label for="eeAudioHeight">' . __('Color', 'ee-simple-file-list-media') . ':</label>
			<input type="color" name="eeAudioColor" id="eeAudioColor" value="' . $eeObject->eeListSettings['AudioColor'] . '" />
			</div>
			
			<div class="eeNote">' . __('Define the color of the audio player.', 'ee-simple-file-list-media') . '</div>
	
		</fieldset>
			
		<fieldset>
		
			<legend>' . __('Audio File Types', 'ee-simple-file-list-media') . '</legend>
			
			<div>
			<label for="eeAudioTypes">' . __('Types', 'ee-simple-file-list-media') . ':</label>
			<input type="text" name="eeAudioTypes" id="eeAudioTypes" value="' . $eeObject->eeListSettings['AudioTypes'] . '" />
			</div>
			
			<div class="eeNote">' . __('Choose which types of audio files will display the player.', 'ee-simple-file-list-media') . '</div>
			
			
			
		</fieldset>
			
		<fieldset>	
		
			<legend>' . __('Video File Types', 'ee-simple-file-list-media') . '</legend>
			
			<div>
			<label for="eeVideoTypes">' . __('Types', 'ee-simple-file-list-media') . ':</label>
			<input type="text" name="eeVideoTypes" id="eeVideoTypes" value="' . $eeObject->eeListSettings['VideoTypes'] . '" />
			</div>
			
			<div class="eeNote">' . __('Choose which types of video files will display the player.', 'ee-simple-file-list-media') . '</div>				
				
		</fieldset>
		
		</div>';

		return $eeOutput;
		
	}
}