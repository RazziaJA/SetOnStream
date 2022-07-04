# Introduction

[Set](https://en.wikipedia.org/wiki/Set_(card_game)) is a card game played by one or more players.

This is an app allowing Set to be played alone or with a Twitch chat. The player/streamer/host can get started at https://razziaja.github.io/SetOnStream 

If playing solo, guesses can be entered in the field at the top left.

If playing on Twitch, enter your channel in the top left and click connect. You can also append your channel to the URL as a query parameter to connect automatically  The format for that is `https://razziaja.github.io/SetOnStream?twitch-channel=<channel>`

Once you've customized your URL consider adding it as a bookmark or to a Browser Source in OBS. If using a browser source, edit the "Custom CSS" field to remove the ` background-color: rgba(0, 0, 0, 0);` setting. You may also want to uncheck `Shutdown source when not visible` if you find the game resets as you navigate away from the scene.

# TODOs
[ ] Fix Browser Source going blank after finding a set
    - may not be Browser Source specific? Happened to *streamer friend* in normal Chrome
[ ] Hint function
[ ] More clear game over indication
[ ] Animate card drawing?
[ ] Highlight newest cards?
[ ] Optional "Sets on Table" indicator
[ ] Customize number of cards on the table (e.g. 15 instead of 12)
[ ] Increase guess history length
[ ] Label guess history section
[ ] Larger numbers on cards
[ ] Slightly smaller instruction text? for more game space
[ ] Hideable instruction text? for when the strimmer is around to explain or the chat has played before
[ ] Hideable scores, game info. really try to get as much space as possible for tabletop, so it's visible on mobile
[ ] Accept comma-separated guesses