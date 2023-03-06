// Upon page load completion...
jQuery(document).ready(function($) {	
	
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
			
			// Detect Type
			if(eeSFLM_Ext == 'mp3') { 
				eeSFLM_Type = 'audio/mpeg';
				console.log('MP3 File Found: ' + eeSFLM_FileName);
			}
			if(eeSFLM_Ext == 'ogg') { 
				eeSFLM_Type = 'audio/ogg';
				console.log('MP3 File Found: ' + eeSFLM_FileName);
			}
			if(eeSFLM_Ext == 'wav') { 
				eeSFLM_Type = 'audio/wav';
				console.log('MP3 File Found: ' + eeSFLM_FileName);
			}
			
			if(eeSFLM_Type) {
				
				var eeSFLM_AudioPlayer = '<audio controls "id="eeSFL_AudioPlayer' + eeSFLM_ID + '" class="eeSFL_AudioPlayer" style="';
				
				if(eeSFLM_AudioHeight >= 1) { eeSFLM_AudioPlayer += 'height:' + eeSFLM_AudioHeight + 'px;'; }
				
				eeSFLM_AudioPlayer += '"><source src="' + eeSFLM_FileLink + '" type="' + eeSFLM_Type + '">Not Supported</audio>';
				
				// Change the Open Link to Play
				jQuery('#' + eeSFLM_ThisID + ' .eeSFL_FileOpen').text('Play');
				jQuery('#' + eeSFLM_ThisID + ' .eeSFL_FileOpen').attr('id', 'eeSFL_Play_' + eeSFLM_ID);
				
				if(eeSFL_ShowListStyle == 'TABLE') {
					
					jQuery('#' + eeSFLM_ThisID + " td.eeSFL_FileName" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeSFLM_AudioPlayer +  '</div>');
					
				} else if(eeSFL_ShowListStyle == 'TILES') {
					
					jQuery('#' + eeSFLM_ThisID + " .eeSFL_FileDesc" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeSFLM_AudioPlayer +  '</div>');
					
				} else if(eeSFL_ShowListStyle == 'FLEX') {
					
					jQuery('#' + eeSFLM_ThisID + " .eeSFL_FileLink" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeSFLM_AudioPlayer +  '</div>');
					
				}
			
			}
			
		}
	});
	
	
	jQuery('.eeSFL_FileOpen').on('click', function() {
		
		var eeSFLM_RowID = jQuery(this).attr('id');
		
		if(eeSFLM_RowID !== undefined) {
			
			event.preventDefault();
			
			eeSFLM_RowID = eeSFLM_RowID.replace( /^\D+/g, ''); // Get just the number
		
			document.getElementById('eeSFL_AudioPlayer' + eeSFLM_RowID).play();
		}
		
	});
	
		

}); // END Ready Function