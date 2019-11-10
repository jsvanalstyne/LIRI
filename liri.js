// require("dotenv").config();
// var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api')
// var spotify = new Spotify(keys.spotify);
var userInput = process.argv[3];
var userSelection= process.argv[2];

switch(userSelection){
    case "spotify-this-song": 
    console.log("you in girl")
   
    var spotify = new Spotify({
        id: "fc93bddab75c455ea6c7e1091090fa8f",
        secret: "f408908194134ea2b4219785e63cbb28"
    });
       
      spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      // console.log(data);
      // console.log(data.tracks.href)
      // console.log(JSON.stringify(data.tracks.items[1]))
      // Song name
      console.log(JSON.stringify(data.tracks.items[1].name));
        // song link
      console.log(JSON.stringify(data.tracks.items[1].href));
      // Artist name
      console.log(JSON.stringify(data.tracks.items[1].artists[0].name));
      // // album name
      console.log(JSON.stringify(data.tracks.items[1].album.name));
      });

    break;
    case "concert-this": ;
    break;
    case "movie-this":
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
        //   console.log("Release Year: " + response.data.Year);
        // console.log(response);
        console.log("Movie Title: " + response.data.Title);
        console.log("Year Released: " + response.data.Year);
        console.log("imdbRating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.stringify(response.data.Ratings[1].Value));
        console.log("Produced in which country: " + response.data.Country);
        console.log("Movie Language: " + response.data.Language);
        console.log("Movie Plot: " + response.data.Plot);
        console.log("Actors in movie: " + response.data.Actors);

        });
        break;
    case "do-what-it-says": 
    break;
}