require("dotenv").config();

const axios = require("axios");

var task = process.argv[2];

// Spotify:
// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

if (task === "spotify-this-song") {

    var song = process.argv;
    var songName = "";

    //If no song is provided then display song "The sign" by Ace of Base.
    if (song.length === 3) {
        songName = "The Sign";
                console.log("==============================");
                console.log("Spotify Results for 'The Sign'");
                console.log("\n");
                console.log("Artist(s) Name: 'Ace of Base'");
                console.log("The song's name: 'The Sign'");
                console.log("A preview link of the song from Spotify: 'https://open.spotify.com/artist/5ksRONqssB7BR161NTtJAm'");
                console.log("The album that the song is from: 'The Sign'");
                console.log("\n");
                console.log("==============================");

    }
    //If song is provided, get song's info through Spotify Web
    else {
        //Loop through all the words in the node argument
        //And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < song.length; i++) {

            if (i > 3 && i < song.length) {
                songName = songName + "+" + song[i];
            }
            else {
                songName += song[i];
            }

        }
        spotify
            .search({ type: 'track', query: songName })
            .then(function (response) {
                console.log("==============================");
                console.log("Spotify Results for " + JSON.stringify(response.tracks.items[0].name));
                console.log("\n");
                console.log("Artist(s) Name: " + JSON.stringify(response.tracks.items[0].artists[0].name));
                console.log("The song's name: " + JSON.stringify(response.tracks.items[0].name));
                console.log("A preview link of the song from Spotify: " + JSON.stringify(response.tracks.items[0].external_urls.spotify));
                console.log("The album that the song is from: " + JSON.stringify(response.tracks.items[0].album.name));
                console.log("\n");
                console.log("==============================");

            })
            .catch(function (err) {
                console.log(err);
            });

    }
}


//The Bands in Town

if (task === "concert-this"){

    var artist = process.argv;

    var artistName = "";

    for (var i = 3; i < artist.length; i++) {

        if (i > 3 && i < artist.length) {
          artistName = artistName + "+" + artist[i];
        } else {
          artistName += artist[i];
      
        }
      }

 var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"
      
 axios.get(queryUrl).then(
    function(response) {
      console.log("==============================");
      console.log(response.data[0].lineup[0] +" is playing at:");
      console.log("Name of the venue: " + response.data[0].venue.name);
      console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
      console.log("Date of the Event: " + response.data[0].datetime);



    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  



}