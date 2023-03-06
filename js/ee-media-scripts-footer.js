// Upon page load completion...
jQuery(document).ready(function($) {
	
	console.log(eeSFLM_Vars);
	
	// Look for Media Files and Add Player
	jQuery( '.eeSFL_Item' ).each(function( index ) {
		
		// Get the name of this row's ID
		var eeSFLM_ThisID = jQuery(this).attr('id');
		
		if (eeSFLM_ThisID !== undefined) { // Like in the header row
			
			var eeSFLM_ID = eeSFLM_ThisID.replace( /^\D+/g, ''); // Get just the number
			
			// console.log('Row ID: ' + eeID);
			
			var eeSFLM_FileName = jQuery('#' + eeSFLM_ThisID + " span.eeSFL_RealFileName" ).text(); // Get the File Name
			
			// console.log('Name: ' + eeFileName);
			
			var eeSFLM_FileLink = jQuery('#' + eeSFLM_ThisID + " a.eeSFL_FileName" ).attr('href'); // Get the File Link
			
			// console.log('Link: ' + eeFileLink);
			
			var eeSFLM_Ext = eeSFLM_FileName.split('.').pop(); // Get the File Extension
			
			// console.log('Extension: ' + eeExt);
			
			var eeSFLM_Type = false;
			var eeSFLM_Player = false;
			
			// Detect Type
			if(eeSFLM_Ext == 'mp3') { 
				eeSFLM_Type = 'audio/mpeg';
				eeSFLM_Player = 'AUDIO';
			}
			if(eeSFLM_Ext == 'ogg') { 
				eeSFLM_Type = 'audio/ogg';
				eeSFLM_Player = 'AUDIO';
			}
			if(eeSFLM_Ext == 'wav') { 
				eeSFLM_Type = 'audio/wav';
				eeSFLM_Player = 'AUDIO';
				
			}
			if(eeSFLM_Ext == 'mp4') { 
				eeSFLM_Type = 'video/mp4';
				eeSFLM_Player = 'VIDEO';
				
			}
			if(eeSFLM_Ext == 'mp4') { 
				eeSFLM_Type = 'video/mp4';
				eeSFLM_Player = 'VIDEO';
				
			}
			if(eeSFLM_Ext == 'mov') { 
				eeSFLM_Type = 'video/mp4';
				eeSFLM_Player = 'VIDEO';
				
			}
			// console.log(eeSFLM_Type + ' File Found: ' + eeSFLM_FileName);
			
			
			// Setup for Playback
			if(eeSFLM_Player) {
				
				// Change the Open Link to Play
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileName').addClass('eeSFLM_Play' + eeSFLM_Player);
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileName').attr('data-ee-id', eeSFLM_ID);
				
				jQuery('#' + eeSFLM_ThisID + ' .eeSFL_Thumbnail a').addClass('eeSFLM_Play' + eeSFLM_Player);
				jQuery('#' + eeSFLM_ThisID + ' .eeSFL_Thumbnail a').attr('data-ee-id', eeSFLM_ID);
				
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileOpen').addClass('eeSFLM_Play' + eeSFLM_Player);
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileOpen').attr('data-ee-id', eeSFLM_ID);
				
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileOpen').text(eeSFLM_Vars.eePlayLabel); // Change "Open" to "Play"
			}
			
			
			// Inline Audio Player
			if(eeSFLM_Player == 'AUDIO' && eeSFLM_Vars.eeAudioEnabled == 'YES') {
				
				var eeSFLM_AudioPlayer = '<audio controls id="eeSFLM_AudioPlayer' + eeSFLM_ID + '" class="eeSFL_AudioPlayer" style="';
				
				if(eeSFLM_Vars.eeAudioHeight >= 1) { eeSFLM_AudioPlayer += 'height:' + eeSFLM_Vars.eeAudioHeight + 'px;'; }
				
				eeSFLM_AudioPlayer += '"><source src="' + eeSFLM_FileLink + '" type="' + eeSFLM_Type + '">Not Supported</audio>';
				
				if(eeSFL_ShowListStyle == 'TABLE') {
					
					jQuery('#' + eeSFLM_ThisID + " td.eeSFL_FileName" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeSFLM_AudioPlayer +  '</div>');
					
				} else if(eeSFL_ShowListStyle == 'TILES') {
					
					jQuery('#' + eeSFLM_ThisID + " .eeSFL_FileDesc" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeSFLM_AudioPlayer +  '</div>');
					
				} else if(eeSFL_ShowListStyle == 'FLEX') {
					
					jQuery('#' + eeSFLM_ThisID + " .eeSFL_FileLink" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeSFLM_AudioPlayer +  '</div>');
					
				}
			
			
			// Video Player
			} else if(eeSFLM_Player == 'VIDEO') {
				
				jQuery('#' + eeSFLM_ThisID + ' a.eeSFL_FileOpen').text(eeSFLM_Vars.eePlayLabel); // Change "Open" to "Play"
				
				
				
			}
			
		}
	});
	
	
	jQuery('.eeSFLM_PlayAUDIO').on('click', function() {
		
		var eeSFLM_ThisID = jQuery(this).attr('data-ee-id');
		
		if(eeSFLM_ThisID !== undefined) {
			
			event.preventDefault();
		
			document.getElementById('eeSFLM_AudioPlayer' + eeSFLM_ThisID).play();
		}
		
	});
	
	
	
	jQuery('.eeSFLM_PlayVIDEO').on('click', function() {
		
		var eeSFLM_ThisID = jQuery(this).attr('data-ee-id');
		var eeSFLM_ThisURL = jQuery(this).attr('href');
		
		if(eeSFLM_ThisID !== undefined) {
			
			event.preventDefault();
		
			// alert('PLAY');
			
			var eeSFLM_VideoPlayer = '<div class="eeSFLM_Modal" id="eeSFLM_Video"><div class="eeSFLM_ModalBackground"></div><div class="eeSFLM_ModalBody">';
			
			eeSFLM_VideoPlayer += '<button class="eeSFLM_ModalClose">&times;</button>';
			
			eeSFLM_VideoPlayer += '<video controls><source src="' + eeSFLM_ThisURL + '" type="video/mp4">' + eeSFLM_Vars.eeBrowserWarning + '</video>';
			
			eeSFLM_VideoPlayer += '</div></div>';
			
			jQuery('.eeSFL').append(eeSFLM_VideoPlayer);
	
			jQuery('#eeSFLM_Video').show();
			
		}
		
	});
	
	
	// Close the Video Modal
	jQuery('.eeSFLM_ModalClose').on('click', function() {
		
		alert('BOOM');
		
		
		jQuery('.eeSFLM_Modal').hide();
		jQuery('.eeSFLM_Modal').remove();
	});
	
	
	
	
	
		

}); // END Ready Function