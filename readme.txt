=== Simple File List Media ===
Contributors: eemitch
Donate link: http://simplefilelist.com
Tags: file list, file sharing, audio player, video player
Requires at least: 5.0
Requires PHP: 7.4
Tested up to: 6.1
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This plugin adds audio and video players to Simple File List.

== Description ==

Simple File List is a free plugin that is great for when you need to provide a list of files, either publicly available or private to logged-in users. This plugin is an add-on to SFL designed for those who have audio and video files in their lists. Instead of opening the media file in the browser, this plugin will allow you to show an in-line audio player and an HTML5 video player overlay.

## Features

* Add audio and video players to Simple File List.
* Display an inline audio player below the file name to allow your users to play audio files right on the list.
* Video files open in an overlay, rather than directly within a new tab.
* The audio player can be enabled/disabled in the settings.
* The height of the audio player can be defined in the settings.

This plugin requires that you have Simple File List installed...

[Simple File List](https://wordpress.org/plugins/simple-file-list/)


== Installation ==

1. To install, simply use the amazing WordPress plugin installer, or upload the plugin zip file to your WordPress website, and activate it.
1. Next, go to the File List > List Settings > Extension Settings tab
1. Choose to disable the inline player or change the player height
1. Playable file types will automatically be detected.


== Frequently Asked Questions ==

= Q: What types of files can be played? =

A: The types of files that can be played are determined by the user's web browser. The media file's MIME type is passed to the HTML5 player, and it will play the type if possible.

= Q: Is this plugin compatible with Simple File List Pro? =

A: Yes. If you upgrade this plugin will work with Pro too.



== Upgrade Notice ==

* 2.0.1 - Initial General Release


== Screenshots ==

1. Inline Audio Player.
2. Video Player Overlay.
3. Back-End Settings.

== Changelog ==

= 2.0.1 =
* Added an HTML5 video player, which opens in an page overlay.
* Now passing the file type MIME to the players and letting the browser play whatever it can.
* Now all file open actions begin the playback, including thumb clicks and file name clicks.
* Added settings to enable or disable the inline audio player, plus define its height.
* Rewrote and improved the core.
* Added language translations to match SFL.

= 1.1.1 =
* Updates required for SFL 6, adding support for the new Tiles and Flex list styles.
* Bug fix where the open action for non-media files failed. 

= 1.0.2 =
* Made the Play button play the audio in the player rather than opening the file in a new tab.

= 1.0.1 =
* Initial Plugin Build