require("dotenv").config({ path: '.env' });
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require("moment");
var inquirer = require("inquirer");
var spotify = new Spotify(keys.spotify);

function spotifyThis(userSong) {
  spotify.search({ type: 'track', query: userSong }, function (err, data) {
    
    if (data.tracks.items.length<-1) {
      console.log("Your search did not return any results. Might I interest you in: \n'The Sign' \nby 'Ace of Base' \nfrom 'The Sign' album. \nHere is a link: https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB")
    }

    // Song name
    else{
    for (var i = 0; i < data.tracks.items.length; i++) {
      console.log("-------------------------------");
      // song name
      console.log(JSON.stringify("Song name: " + data.tracks.items[i].name));
      // song link
      console.log(JSON.stringify("Song link: " + data.tracks.items[i].external_urls.spotify));
      // Artist name
      console.log(JSON.stringify("Artist: " + data.tracks.items[i].artists[0].name));
      // album name
      console.log(JSON.stringify("Album Name: " + data.tracks.items[i].album.name));
      console.log("-------------------------------");
    }}
  });
}

function concertThis(userBand) {
  console.log("got a concert")
  console.log("insdie concertThis function "+userBand);
  console.log(typeof userBand)
  var concertApi = "https://rest.bandsintown.com/artists/" + userBand + "/events?app_id=codingbootcamp";
  axios.get(concertApi).then(
    function (response) {
      if (response.data.length === 0) {
        console.log("No events found.")
      } else {
        for (var i = 0; i < response.data.length; i++) {
          console.log("-------------------------------")
          console.log(JSON.stringify("Venue: " + response.data[i].venue.name));
          console.log(JSON.stringify("City: " + response.data[i].venue.city));
          console.log("Date: " + moment(response.data[i].datetime).format('L'));
        }
      }
    }
  );

}
function movieThis(movieTitle) {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
  console.log("inside movie function "+ movieTitle);
  axios.get(queryUrl).then(
    function (result) {



        console.log("Movie Title: " + result.data.Title);
        console.log("Year Released: " + result.data.Year);
        console.log("imdbRating: " + result.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.stringify(result.data.Ratings[1].Value));
        console.log("Produced in which country: " + result.data.Country);
        console.log("Movie Language: " + result.data.Language);
        console.log("Movie Plot: " + result.data.Plot);
        console.log("Actors in movie: " + result.data.Actors);

      
    });

}




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
  
  switch (user.question.toString()) {
    case 'spotify-this-song':
    
   
      spotifyThis(user.response)
      break;
    case "concert-this":


      concertThis(user.response);
      break;
    case "movie-this":
    if(user.response===""){
            movieThis("Mr.Nobody");

    }else{}
      movieThis(user.response);
      break;
    case "do-what-it-says":
      fs.readFile("random.txt", "utf8", function (error, data) {

        console.log(data);

        var doWhatitSays = data.split(",");
        
        var switchItem = doWhatitSays[0];
        
        var songMovieConcert = doWhatitSays[1].trim();
        
        switch (switchItem) {
          case 'spotify-this-song':

            spotifyThis(songMovieConcert);
            break;
          case "concert-this":
            console.log("inside switch "+ songMovieConcert);

            concertThis(songMovieConcert);
            break;
          case "movie-this":
          
          
            movieThis(songMovieConcert);
            break;
        }
      })
      break;
    default:
      console.log("Please select a viable option");
  }
})