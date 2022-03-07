// Upon page load completion...
jQuery(document).ready(function($) {	

	
	// Look for Media Files and Add Player
	jQuery( '.eeFiles tr' ).each(function( index ) {
		
		// Get the name of this row's ID
		var eeThisID = jQuery(this).attr('id'); // TO DO - Change id to class to class in SFL 5/6
		
		if (eeThisID !== undefined) { // Like in the header row
			
			var eeID = eeThisID.replace( /^\D+/g, ''); // Get just the number
			
			var eeFileName = jQuery('#' + eeThisID + " span.eeSFL_RealFileName" ).text(); // Get the File Name
			
			var eeFileLink = jQuery('#' + eeThisID + " a.eeSFL_FileName" ).attr('href'); // Get the File Link
			
			var eeExt = eeFileName.split('.').pop(); // Get the File Extension
			
			// console.log( index + ": " + eeFileName );
			
			var eeAudioPlayer = '<audio id="eeSFL_AudioPlayer' + eeID + '" class="eeSFL_AudioPlayer" controls><source src="' + eeFileLink + '" type="audio/mpeg">Not Supported</audio>';
			
			if(eeExt == 'mp3') {
				
				// console.log('MP3 File Found: ' + eeFileName);
				// console.log('Updating the Display...');
				
				// Change the Open Link to Play
				jQuery('#' + eeThisID + ' .eeSFL_FileOpen').text('Play');
				jQuery('#' + eeThisID + ' .eeSFL_FileOpen').attr('id', 'eeSFL_Play_' + eeID);
				jQuery('#' + eeThisID + " td.eeSFL_FileName" ).append('<div class="eeSFL_AudioPlayerWrap">' + eeAudioPlayer +  '</div>'); // TO DO - Update this for SFL 5/6
				
				
			}
		}
	});
	
	
	jQuery('.eeSFL_FileOpen').on('click', function() {
		
		event.preventDefault();

		var eeRowID = jQuery(this).attr('id');
		
		eeRowID = eeRowID.replace( /^\D+/g, ''); // Get just the number
		
		document.getElementById('eeSFL_AudioPlayer' + eeRowID).play();
	});
	
		

}); // END Ready Function