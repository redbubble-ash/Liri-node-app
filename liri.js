require("dotenv").config();

var axios = require("axios");

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var task = process.argv[2];

// var song = process.argv[2];

// console.log(song);

if (task === "spotify-this-song") {

    var song = process.argv.slice(1);
    var songName = "";

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
            console.log("Artist(s) Name: "+JSON.stringify(response.tracks.items[0].artists[0].name));
            console.log("The song's name: "+JSON.stringify(response.tracks.items[0].name));
            console.log("A preview link of the song from Spotify: "+JSON.stringify(response.tracks.items[0].external_urls.spotify));
            console.log("The album that the song is from: "+JSON.stringify(response.tracks.items[0].album.name));
        })
        .catch(function (err) {
            console.log(err);
        });

}