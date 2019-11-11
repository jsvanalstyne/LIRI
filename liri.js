// require("dotenv").config();
// var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require("moment");
var inquirer = require("inquirer");
// var spotify = new Spotify(keys.spotify);
var userInput = process.argv[3];
// var userSelection= process.argv[2];
inquirer.prompt([
  {
    type: "input",
    message: "what would you like to do?",
    name: "question"
  },
  {
    type: "input",
    message: "what band, song or movie would you like to search?",
    name: "response"

  }
]).then(function (userSelection) {
  switch (userSelection.question) {
    case "spotify-this-song":
      console.log("you in girl")

      var spotify = new Spotify({
        id: "fc93bddab75c455ea6c7e1091090fa8f",
        secret: "f408908194134ea2b4219785e63cbb28"
      });

      spotify.search({ type: 'track', query: userSelection.response }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        // Song name
        console.log(JSON.stringify(data.tracks.items[1].name));
        // song link
        console.log(JSON.stringify(data.tracks.items[1].href));
        // Artist name
        console.log(JSON.stringify(data.tracks.items[1].artists[0].name));
        // album name
        console.log(JSON.stringify(data.tracks.items[1].album.name));
      });

      break;
    case "concert-this":
      console.log("got a concert")
      var concertApi = "https://rest.bandsintown.com/artists/" + userSelection.response + "/events?app_id=codingbootcamp";
      axios.get(concertApi).then(
        function (response) {
          console.log(JSON.stringify(response.data[0].venue.name));
          console.log(JSON.stringify(response.data[0].venue.city));
          console.log(moment(response.data[0].datetime).format('L'));
        });
      break;
    case "movie-this":
      var queryUrl = "http://www.omdbapi.com/?t=" + userSelection.response + "&y=&plot=short&apikey=trilogy";
      axios.get(queryUrl).then(
        function (response) {
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
})