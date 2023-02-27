// Upon page load completion...
jQuery(document).ready(function($) {	

	
	// Look for Media Files and Add Player
	jQuery( '.eeSFL_Item' ).each(function( index ) {
		
		// Get the name of this row's ID
		var eeThisID = jQuery(this).attr('id');
		
		if (eeThisID !== undefined) { // Like in the header row
			
			var eeID = eeThisID.replace( /^\D+/g, ''); // Get just the number
			
			console.log('Row ID: ' + eeID);
			
			var eeFileName = jQuery('#' + eeThisID + " span.eeSFL_RealFileName" ).text(); // Get the File Name
			
			console.log('Name: ' + eeFileName);
			
			var eeFileLink = jQuery('#' + eeThisID + " a.eeSFL_FileName" ).attr('href'); // Get the File Link
			
			console.log('Link: ' + eeFileLink);
			
			var eeExt = eeFileName.split('.').pop(); // Get the File Extension
			
			console.log('Extension: ' + eeExt);
			
			if(eeExt == 'mp3') {
				
				console.log('MP3 File Found: ' + eeFileName);
				console.log('Updating the Display...');
				
				var eeAudioPlayer = '<audio id="eeSFL_AudioPlayer' + eeID + '" class="eeSFL_AudioPlayer" controls><source src="' + eeFileLink + '" type="audio/mpeg">Not Supported</audio>';
				
				// Change the Open Link to Play
				jQuery('#' + eeThisID + ' .eeSFL_FileOpen').text('Play');
				jQuery('#' + eeThisID + ' .eeSFL_FileOpen').attr('id', 'eeSFL_Play_' + eeID);
				
				if(eeSFL_ShowListStyle == 'TABLE') {
					
					jQuery('#' + eeThisID + " td.eeSFL_FileName" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeAudioPlayer +  '</div>');
					
				} else if(eeSFL_ShowListStyle == 'TILES') {
					
					jQuery('#' + eeThisID + " .eeSFL_FileDesc" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeAudioPlayer +  '</div>');
					
				} else if(eeSFL_ShowListStyle == 'FLEX') {
					
					jQuery('#' + eeThisID + " .eeSFL_FileLink" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeAudioPlayer +  '</div>');
					
				}
			}
		}
	});
	
	
	jQuery('.eeSFL_FileOpen').on('click', function() {
		
		var eeRowID = jQuery(this).attr('id');
		
		if(eeRowID !== undefined) {
			
			event.preventDefault();
			
			eeRowID = eeRowID.replace( /^\D+/g, ''); // Get just the number
		
			document.getElementById('eeSFL_AudioPlayer' + eeRowID).play();
		}
		
	});
	
		

}); // END Ready Function