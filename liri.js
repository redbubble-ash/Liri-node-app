require("dotenv").config();

var axios = require("axios");

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


