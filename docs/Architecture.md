# Current Architecture
## App Component
* LabelledSetCard - card image and numeric label
* Layout data for the Set spritesheet - how to pull a particular card from the PNG file
* Layout data for the table grid - where to render a card on the screen
* Form for local play - text field and submit button
* TwitchListener
* Game Info - cards remaining, sets on table, game over status
* Game state + logic class (not Component)

## Game Logic Class
* Cards in the deck (shuffled)
* Cards on the table
* Player scores
* Functions for resetting the game
* Functions for updating the game when a Set is found
* Functions for getting the properties of a card (shape, color, number, shading)

## TwitchListener
* tmi.js client
    * connected anonymously to a hardcoded channel
    * listening for messages containing exactly three numbers

# Next Architecture

## App Component
* Game state
* Input Form
* Game Info - cards remaining, sets on table
* Scores
* Tabletop
* Rules explanation
* A chat stream with numbers converted to card images with green check or red x

## Input Form
* [x] Text field for Twitch channel name + dis/connect button
* [x] Text field for Set numbers + submit button
* Maybe a checkbox to only show one or the other?

## Game Info Panel
* Cards remaining
* Sets on table
* (when game is over) message congratulating winner
* (when game is over) countdown until the next game

## Scores
* \<place/rank\>. \<player name\> - \<sets found\>
* Ties broken by turn their latest set was found

## Tabletop
* Grid of cards. 7 columns by 3 rows, usually only 4 columns used. Maybe dynamically sized so cards are larger at 4 columns

## Card
* Programmatically created SVG element rendering the shapes on the card with the appropriate color, shading, and count. Also labels the card with its number to be used when calling a set

TODOs:
[ ] redo game logic code to track sets on table rather than iterating over it every time we need to know how many sets there are. should save cycles and also enable a hint function