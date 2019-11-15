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
    console.log("working")
    console.log(!data);
    if (!data === false) {
      console.log("Your search did not return any results. Might I interest you in: \n'The Sign' \nby 'Ace of Base' \nfrom 'The Sign' album. \nHere is a link: https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB")
    }

    // Song name

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
    }
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


      if ((result.data.Response) === "False") {
        console.log("Movie not found");
      } else {
        console.log("unfiltered JSON " + result.data)

        console.log("Movie Title: " + result.data.Title);
        console.log("Year Released: " + result.data.Year);
        console.log("imdbRating: " + result.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.stringify(result.data.Ratings[1].Value));
        console.log("Produced in which country: " + result.data.Country);
        console.log("Movie Language: " + result.data.Language);
        console.log("Movie Plot: " + result.data.Plot);
        console.log("Actors in movie: " + result.data.Actors);

      }
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
  // console.log("line 23"+user)
  // console.log("line 24" + user.question);
  // console.log(user.response);
  switch (user.question.toString()) {
    case 'spotify-this-song':
    if(user.response ===""){
      console.log("Your search did not return any results. Might I interest you in: \n'The Sign' \nby 'Ace of Base' \nfrom 'The Sign' album. \nHere is a link: https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB")
    }else{

      spotifyThis(user.response)}
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
        console.log(doWhatitSays);
        var switchItem = doWhatitSays[0];
        console.log(doWhatitSays[0]);
        console.log(doWhatitSays[1]);
        var songMovieConcert = doWhatitSays[1].trim();
        console.log("before switch" +songMovieConcert);
        switch (switchItem) {
          case 'spotify-this-song':

            spotifyThis(songMovieConcert);
            break;
          case "concert-this":
            console.log("inside switch "+ songMovieConcert);

            concertThis(songMovieConcert);
            break;
          case "movie-this":
          // console.log("inside switch "+ songMovieConcert);
          
            movieThis(songMovieConcert);
            break;
        }
      })
      break;
    default:
      console.log("Please select a viable option");
  }
})