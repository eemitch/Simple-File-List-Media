// Upon page load completion...
jQuery(document).ready(function($) {
	
	// console.log(eeSFLM_Vars);
	
	// Look for Media Files and Add Player
	jQuery( '.eeSFL_Item' ).each(function( index ) {
		
		// Get the name of this row's ID
		var eeSFLM_ThisID = jQuery(this).attr('id');
		
		if (eeSFLM_ThisID !== undefined) { // Like in the header row
			
			// Get File Info
			var eeSFLM_ID = eeSFLM_ThisID.replace( /^\D+/g, ''); // Get just the number
			var eeSFLM_FileName = jQuery('#' + eeSFLM_ThisID + " span.eeSFL_RealFileName" ).text(); // Get the File Name
			var eeSFLM_FileLink = jQuery('#' + eeSFLM_ThisID + " a.eeSFL_FileName" ).attr('href'); // Get the File Link
			var eeSFLM_FileMIME = jQuery('#' + eeSFLM_ThisID + " .eeSFL_FileMimeType" ).text(); // Get the File MIME Type
			var eeSFLM_Ext = eeSFLM_FileName.split('.'); // Get the File Extension
			
			// Detect Type
			var eeSFLM_MediaType = eeSFLM_FileMIME.split('/');
			var eeSFLM_Player = eeSFLM_MediaType[0].toUpperCase(); // audio or video
			
			// Setup for Playback
			if(eeSFLM_Player == 'AUDIO' || eeSFLM_Player == 'VIDEO') {
			
				// console.log(eeSFLM_FileMIME + ' Media File Found: ' + eeSFLM_FileName);
				
				// Change "Open" to "Play"
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileOpen').text(eeSFLM_Vars.eePlayLabel); 
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileOpen').removeAttr('target');
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileOpen').addClass('eeSFLM_Play' + eeSFLM_Player);
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileOpen').attr('data-ee-id', eeSFLM_ID);
				
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileName').addClass('eeSFLM_Play' + eeSFLM_Player); 
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileName').removeAttr('target');
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileName').attr('data-ee-id', eeSFLM_ID);
				
				jQuery('#' + eeSFLM_ThisID + ' .eeSFL_Thumbnail a').addClass('eeSFLM_Play' + eeSFLM_Player); 
				jQuery('#' + eeSFLM_ThisID + ' .eeSFL_Thumbnail a').removeAttr('target');
				jQuery('#' + eeSFLM_ThisID + ' .eeSFL_Thumbnail a').attr('data-ee-id', eeSFLM_ID);
				
				
				
				// Inline Audio Player
				if(eeSFLM_Player == 'AUDIO' && eeSFLM_Vars.eeAudioEnabled == 'YES') {
							
					
					// Thumb, Name or Play, Go Ahead and Play
					jQuery('.eeSFLM_PlayAUDIO').on('click', function() {
						
						event.preventDefault();
			
						var eeSFLM_ThisID = jQuery(this).attr('data-ee-id');
						
						if(eeSFLM_ThisID !== undefined) {
						
							document.getElementById('eeSFLM_AudioPlayer' + eeSFLM_ThisID).play();
						}
						
					});
					
					
					// Build and Add the Player
					var eeSFLM_AudioPlayer = '<audio controls id="eeSFLM_AudioPlayer' + eeSFLM_ID + '" class="eeSFL_AudioPlayer" style="';
					
					if(eeSFLM_Vars.eeAudioHeight >= 1) { eeSFLM_AudioPlayer += 'height:' + eeSFLM_Vars.eeAudioHeight + 'px;'; }
					
					eeSFLM_AudioPlayer += '"><source src="' + eeSFLM_FileLink + '" type="' + eeSFLM_FileMIME + '">Not Supported</audio>';
					
					if(eeSFL_ShowListStyle == 'TABLE') {
						
						jQuery('#' + eeSFLM_ThisID + " td.eeSFL_FileName" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeSFLM_AudioPlayer +  '</div>');
						
					} else if(eeSFL_ShowListStyle == 'TILES') {
						
						jQuery('#' + eeSFLM_ThisID + " .eeSFL_FileDesc" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeSFLM_AudioPlayer +  '</div>');
						
					} else if(eeSFL_ShowListStyle == 'FLEX') {
						
						jQuery('#' + eeSFLM_ThisID + " .eeSFL_FileLink" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeSFLM_AudioPlayer +  '</div>');
						
					}
	
				} 
				
				
			}
		}
	});
	
	
	// Thumb, Name or Play, Go Ahead and Play
	jQuery('.eeSFLM_PlayAUDIO').on('click', function() {
		
		event.preventDefault();

		var eeSFLM_ThisID = jQuery(this).attr('data-ee-id');
		
		if(eeSFLM_ThisID !== undefined) {
		
			document.getElementById('eeSFLM_AudioPlayer' + eeSFLM_ThisID).play();
		}
		
	});
	
	
	// VIDEO
	// Produce the Video Player
	jQuery('.eeSFLM_PlayVIDEO').on('click', function() {
			
		event.preventDefault();
		
		var eeSFLM_ThisID = jQuery(this).attr('data-ee-id');
		var eeSFLM_ThisURL = jQuery(this).attr('href');
		var eeSFLM_FileMIME = jQuery("eeSFL_FileID-" + eeSFLM_ThisID + " .eeSFL_FileMimeType").text();
		
		if(eeSFLM_ThisID !== undefined) {
		
			// alert('PLAY');
			
			var eeSFLM_VideoPlayer = '<div class="eeSFLM_Modal" id="eeSFLM_Video"><div class="eeSFLM_ModalBackground"></div><div class="eeSFLM_ModalBody">';
			
			eeSFLM_VideoPlayer += '<button class="eeSFLM_ModalClose">&times;</button>';
			
			eeSFLM_VideoPlayer += '<video autoplay controls><source src="' + eeSFLM_ThisURL + '" type="' + eeSFLM_FileMIME + '">' + eeSFLM_Vars.eeBrowserWarning + '</video>';
			
			eeSFLM_VideoPlayer += '</div></div>';
			
			eeSFLM_VideoPlayer += '<script>' + "jQuery('.eeSFLM_ModalClose').on('click', function() { jQuery('#eeSFLM_Video').remove(); }); jQuery('.eeSFLM_Modal').on('click', function() { jQuery('#eeSFLM_Video').remove(); }); " + '</script>';
			
			jQuery('.eeSFL').append(eeSFLM_VideoPlayer);
	
			jQuery('#eeSFLM_Video').show();
			
		}
		
	});
	
	

}); // END Ready Function