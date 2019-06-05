# Liri-node-app

This is an app that uses the command line node pacakages to respond to user input. The node packages used in this app are including "Axios", "Spotify","Moment","DotEnv","FS", "OMDB API" and "Bands In Town API". 

The App will search Spotify for songs, Bands in Town for concerts, and OMDB for movies. 

## How to use this App?

** 'spotify-this-song'

On the command line, enter 'node liri.js spotify-this-song '<song name here>'', <song name> is an input of the song's name. This will show the following information about the song in your terminal/bash window. 
     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

     * If no song is provided then your program will default to "The Sign" by Ace of Base.

See the example below:

1. Search song "Rolling in the Deep":
![spotify-this-song](/images/spotify-this-song1.PNG)

2. No song is provided:
![spotify-this-song](/images/spotify-this-song2.PNG)

