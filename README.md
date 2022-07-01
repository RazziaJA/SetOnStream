# Introduction

[Set](https://en.wikipedia.org/wiki/Set_(card_game)) is a card game played by one or more players.

This repo is a React app allowing Set to be played by a Twitch chat. The streamer/host can get started at https://razziaja.github.io/SetOnStream


# TODOs
[x] fix striped fill on chrome/edge/webkit
[x] add query parameter to automatically connect to twitch channel on page load (and hide input controls?)
[ ] test Browser Source functionality, consider styling refactor to let streamers customize e.g. the background color
[x] try to improve instructions - maybe an example of a good/bad set with explanation?
[ ] redo game logic code to track sets on table rather than iterating over it every time we need to know how many sets there are. should save cycles and also enable a hint function