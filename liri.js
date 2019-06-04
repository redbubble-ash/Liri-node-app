require("dotenv").config();

const axios = require("axios");

var moment = require('moment');

var fs = require('fs');

const task = process.argv[2];

//***BONUS: A function that console.logs AND also takes the output data append to the log.txt for each command.
function consoleLog(outputData) {
    console.log(outputData);
    // use fs.appendFile() node pacakge to append the string (output data) from console.logs to the end of the file "log.txt".
    fs.appendFile('log.txt', outputData, function (err) {
        if (err) throw err;
    });

}

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
        consoleLog("==============================");
        consoleLog("Spotify Results for 'The Sign'");
        consoleLog("\n");
        consoleLog("Artist(s) Name: 'Ace of Base'");
        consoleLog("The song's name: 'The Sign'");
        consoleLog("A preview link of the song from Spotify: 'https://open.spotify.com/artist/5ksRONqssB7BR161NTtJAm'");
        consoleLog("The album that the song is from: 'The Sign'");
        consoleLog("\n");
        consoleLog("==============================");

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
                consoleLog("==============================");
                consoleLog("Spotify Results for " + JSON.stringify(response.tracks.items[0].name));
                consoleLog("\n");
                consoleLog("Artist(s) Name: " + JSON.stringify(response.tracks.items[0].artists[0].name));
                consoleLog("The song's name: " + JSON.stringify(response.tracks.items[0].name));
                consoleLog("A preview link of the song from Spotify: " + JSON.stringify(response.tracks.items[0].external_urls.spotify));
                consoleLog("The album that the song is from: " + JSON.stringify(response.tracks.items[0].album.name));
                consoleLog("\n");
                consoleLog("==============================");

            })
            .catch(function (err) {
                consoleLog(err);
            });

    }
}


//The Bands in Town:

if (task === "concert-this") {

    // Store all of the arguments in an array
    var artist = process.argv;

    // Create an empty variable for holding the artist name
    var artistName = "";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < artist.length; i++) {

        if (i > 3 && i < artist.length) {
            artistName = artistName + "+" + artist[i];
        } else {
            artistName += artist[i];

        }
    }

    // Then run a request with axios to the Band in Town API with the artist specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(
        function (response) {
            consoleLog("==============================");
            consoleLog("\n");
            consoleLog("'" + response.data[0].lineup[0] + "'" + " is playing at:");
            consoleLog("\n");
            consoleLog("Name of the venue: " + response.data[0].venue.name);
            consoleLog("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            consoleLog("Date of the Event: " + moment(response.data[0].datetime).format("MM-DD-YYYY HH:mm"));
            consoleLog("\n");
            consoleLog("==============================");
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                consoleLog("---------------Data---------------");
                consoleLog(error.response.data);
                consoleLog("---------------Status---------------");
                consoleLog(error.response.status);
                consoleLog("---------------Status---------------");
                consoleLog(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                consoleLog(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                consoleLog("Error", error.message);
            }
            consoleLog(error.config);
        });

}

// OMDB Movie search:

if (task === "movie-this") {

    // Store all of the arguments in an array
    var movie = process.argv;

    // Create an empty variable for holding the movie name
    var movieName = "";

    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (movie.length === 3) {

        movieName = "mr.nobody";

    }

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < movie.length; i++) {

        if (i > 3 && i < movie.length) {
            movieName = movieName + "+" + movie[i];
        } else {
            movieName += movie[i];

        }
    }

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    // consoleLog(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            consoleLog("==============================");
            consoleLog("\n");
            consoleLog("OMDB Results for " + "'" + response.data.Title + "':");
            consoleLog("\n");
            consoleLog("Title of the movie: " + response.data.Title);
            consoleLog("Year the movie came out: " + response.data.Year);
            consoleLog("IMDB Rating of the movie: " + response.data.Ratings[0].Value);
            consoleLog("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            consoleLog("Language of the movie: " + response.data.Language);
            consoleLog("Plot of the movie: " + response.data.Plot);
            consoleLog("Actors in the movie: " + response.data.Actors);
            consoleLog("\n");
            consoleLog("==============================");
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                consoleLog("---------------Data---------------");
                consoleLog(error.response.data);
                consoleLog("---------------Status---------------");
                consoleLog(error.response.status);
                consoleLog("---------------Status---------------");
                consoleLog(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                consoleLog(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                consoleLog("Error", error.message);
            }
            consoleLog(error.config);
        });

}

//Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
if (task === "do-what-it-says") {

    // Tell Node to read in the file "random.txt", and then to get a callback when the file-reading has been finished. 
    fs.readFile("./random.txt", "utf8", function (err, contents) {
        // get the contents from random.txt and split a string to an array by ",". spotify-this-song,"I Want it That Way" will be converted to ["spotify-this-song","I Want it That Way"]
        var newContentsArray = contents.split(",");
        // consoleLog(newContentsArray);
        if (newContentsArray[0] === "spotify-this-song") {

            spotify
                .search({ type: 'track', query: newContentsArray[1] })
                .then(function (response) {
                    consoleLog("==============================");
                    consoleLog("Spotify Results for " + JSON.stringify(response.tracks.items[0].name));
                    consoleLog("\n");
                    consoleLog("Artist(s) Name: " + JSON.stringify(response.tracks.items[0].artists[0].name));
                    consoleLog("The song's name: " + JSON.stringify(response.tracks.items[0].name));
                    consoleLog("A preview link of the song from Spotify: " + JSON.stringify(response.tracks.items[0].external_urls.spotify));
                    consoleLog("The album that the song is from: " + JSON.stringify(response.tracks.items[0].album.name));
                    consoleLog("\n");
                    consoleLog("==============================");

                })
                .catch(function (err) {
                    consoleLog(err);
                });

        }
        if (newContentsArray[0] === "movie-this") {
            // Then run a request with axios to the OMDB API with the movie specified
            var queryUrl = "http://www.omdbapi.com/?t=" + newContentsArray[1] + "&y=&plot=short&apikey=trilogy";

            // This line is just to help us debug against the actual URL.
            // consoleLog(queryUrl);

            axios.get(queryUrl).then(
                function (response) {
                    consoleLog("==============================");
                    consoleLog("\n");
                    consoleLog("OMDB Results for " + "'" + response.data.Title + "':");
                    consoleLog("\n");
                    consoleLog("Title of the movie: " + response.data.Title);
                    consoleLog("Year the movie came out: " + response.data.Year);
                    consoleLog("IMDB Rating of the movie: " + response.data.Ratings[0].Value);
                    consoleLog("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
                    consoleLog("Language of the movie: " + response.data.Language);
                    consoleLog("Plot of the movie: " + response.data.Plot);
                    consoleLog("Actors in the movie: " + response.data.Actors);
                    consoleLog("\n");
                    consoleLog("==============================");
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        consoleLog("---------------Data---------------");
                        consoleLog(error.response.data);
                        consoleLog("---------------Status---------------");
                        consoleLog(error.response.status);
                        consoleLog("---------------Status---------------");
                        consoleLog(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an object that comes back with details pertaining to the error that occurred.
                        consoleLog(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        consoleLog("Error", error.message);
                    }
                    consoleLog(error.config);
                });

        }
        if (newContentsArray[0] === "concert-this") {
            // Run a request with axios to the Band in Town API with the artist specified
            // slice(1,-1) = remove "" (double quotes), so "four light" return four light or use:substring(1,newContentsArray[1].length-1)
            var queryUrl = "https://rest.bandsintown.com/artists/" + newContentsArray[1].slice(1, -1) + "/events?app_id=codingbootcamp"
            consoleLog(queryUrl);
            axios.get(queryUrl).then(
                function (response) {
                    consoleLog("==============================");
                    consoleLog("\n");
                    consoleLog("'" + response.data[0].lineup[0] + "'" + " is playing at:");
                    consoleLog("\n");
                    consoleLog("Name of the venue: " + response.data[0].venue.name);
                    consoleLog("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                    consoleLog("Date of the Event: " + moment(response.data[0].datetime).format("MM-DD-YYYY HH:mm"));
                    consoleLog("\n");
                    consoleLog("==============================");
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        consoleLog("---------------Data---------------");
                        consoleLog(error.response.data);
                        consoleLog("---------------Status---------------");
                        consoleLog(error.response.status);
                        consoleLog("---------------Status---------------");
                        consoleLog(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an object that comes back with details pertaining to the error that occurred.
                        consoleLog(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        consoleLog("Error", error.message);
                    }
                    consoleLog(error.config);
                });
        }



    })
}


