require("dotenv").config({path:'.env'});
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require("moment");
var inquirer = require("inquirer");
var spotify = new Spotify(keys.spotify);
// var userInput = process.argv[3];
// var userSelection= process.argv[2];
inquirer.prompt([
  {
    type: "checkbox",
    name: "question",
    message: "What would you like to do??",
    choices: ["spotify-this-song", "concert-this", "movie-this", "do-what-it-says"]
  },
  {
    type: "input",
    message: "what would you like to search?",
    name: "response"

  }
]).then(function (user) {
  console.log(user.question);
  console.log(user.response);
  switch (user.question.toString()) {
    // console.log("did you enter the switch");
    case 'spotify-this-song':
      console.log("did you go in here?")
      spotify.search({ type: 'track', query: user.response }, function (err, data) {
        console.log("working")
       console.log(!data);
        if (!data===false) {
          console.log("Your search did not return any results. Might I interest you in: \n'The Sign' \nby 'Ace of Base' \nfrom 'The Sign' album. \nHere is a link: https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB")        }
        
        // Song name
        
      for(var i=0; i<data.tracks.items.length; i++){
        console.log("-------------------------------");
        // song name
        console.log(JSON.stringify("Song name: "+data.tracks.items[i].name));
        // song link
        console.log(JSON.stringify("Song link: "+data.tracks.items[i].external_urls.spotify));
        // Artist name
        console.log(JSON.stringify("Artist: " +data.tracks.items[i].artists[0].name));
        // album name
        console.log(JSON.stringify("Album Name: "+data.tracks.items[i].album.name));
        console.log("-------------------------------");
      }
      });

      break;
    case "concert-this":
      console.log("got a concert")
      var concertApi = "https://rest.bandsintown.com/artists/" + user.response + "/events?app_id=codingbootcamp";
      axios.get(concertApi).then(
        function (response) {
          for(var i=0; i<response.data.length; i++){
            console.log("-------------------------------")
          console.log(JSON.stringify("Venue: "+response.data[i].venue.name));
          console.log(JSON.stringify("City: "+response.data[i].venue.city));
          console.log("Date: " +moment(response.data[i].datetime).format('L'));
        }}
        );
      break;
    case "movie-this":
      var queryUrl = "http://www.omdbapi.com/?t=" + user.response + "&y=&plot=short&apikey=trilogy";
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
    default:
    console.log("Please select a viable option");
  }
})