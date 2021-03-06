# Liri-node-app

**This is an app that uses the command line node pacakages to respond to user input. The node packages used in this app are including "Axios", "Spotify","Moment","DotEnv","FS", "OMDB API" and "Bands In Town API".**

**The App will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.**

## How to use this App?

### spotify-this-song

On the command line, enter "node liri.js spotify-this-song '[song name here]'", [song name] is the name input of the song. This will show the following information about the song in your terminal/bash window. 

     * Artist(s)
     
     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from


*See the example below:*

1. Search song "Rolling in the Deep":

![spotify-this-song](/images/spotify-this-song1.PNG)


If no song is provided then the program will default to "The Sign" by Ace of Base.

2. No song's name is provided:

![spotify-this-song](/images/spotify-this-song2.PNG)

### movie-this

On the command line, enter "node liri.js movie-this '[movie name here]'", [movie name] is the name input of the movie. This will output the following information to your terminal/bash window:

       * Title of the movie.

       * Year the movie came out.

       * IMDB Rating of the movie.

       * Rotten Tomatoes Rating of the movie.

       * Language of the movie.

       * Plot of the movie.

       * Actors in the movie.

*See the example below:*

1. Search movie "Big Fish":

![movie-this](/images/movie-this1.PNG)


If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

2. No movie's name is provided:

![movie-this](/images/movie-this2.PNG)


### concert-this

On the command line, enter "node liri.js movie-this '[concert name here]'", [concert name] is the name input of the concert. This will output the following information to your terminal/bash window:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

*See the example below:*

1. Search concert "Four Lights":

![concert-this](/images/concert-this1.PNG)

### do-what-it-says

When user askes do-what-it-says, this app will take the text inside of random.txt and use it to call one of LIRI's commands.

It should run 'spotify-this-song','movie-this" or "concert-this" for "I Want it That Way," as follows the text in 'random.txt'. 

*See the example below:*

#### spotify-this-song

"random.txt" for 'spotify-this-song":

![do-what-it-says](/images/random-spotify-this-song.PNG)

Search song "Rolling in the Deep":

![do-what-it-says](/images/do-what-it-says-spotify-this-song.PNG)


#### movie-this

"random.txt" for 'movie-this":

![do-what-it-says](/images/random-movie-this.PNG)

Search movie "Deadpool":

![do-what-it-says](/images/do-what-it-says-movie-this.PNG)


#### concert-this

"random.txt" for 'concert-this":

![do-what-it-says](/images/random-concert-this.PNG)

Search concert "Dido":

![do-what-it-says](/images/do-what-it-says-concert-this.PNG)


### log.txt

The log.txt file stores all the command output.

![log](/images/log-append.PNG)