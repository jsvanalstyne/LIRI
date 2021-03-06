# LIRI

LIRI is a command line node app that takes in user parameters and returns important information back to the user. This node application allows the user to search songs based on song titles, movies based on movie titles and concerts based on artists/musicians. 

## Getting Started

1. Clone the repository to your local device
2. Install the required node packages using "npm install". 
3. The required packages are:
    - node-spotify-api
    - axios
    - moment
    - inqurier
    - dotenv
4. Inside the terminal, four different commands may be performed:
    - concert-this
    - spotify-this-song
    - movie-this
    - do-what-it-says
5. Select the command using the space bar when prompted.
6. Then enter your query after "what would you like to search?"
7. Response information will be displayed inside the terminal. 

## Command Responses
  - 'spotify-this-song command will respond with
    - Artist
    - Song Title
    - Album
    - Link to song
 - 'movie-this' command will respond with
    - Movie title
    - Movie release year
    - IMDB rating
    - Rotten tomatoes rating
    - Country where the movie was produced
    - Summary of movie
    - Actors/Actresses
 - 'concert-this' command will respond with:
    - Venue name
    - Venue location
    - Event data
 - 'do-what-it-says' command will perform the command in the 'random.txt' file and search for the movie/song/artist listed. 


## Link to Demo

- [Liri Demo](https://drive.google.com/file/d/1EeHGlUs-zqyA4AeC0uP9aFEnIzwR_TCu/view)

## Built With
- Node
- JavaScript
- [OMDB API](http://omdbapi.com/)
- [BandsInTown API](https://artists.bandsintown.com/support/bandsintown-api)
- [Spotify API](https://developer.spotify.com/documentation/web-api/)
## Author
Jerrica VanAlstyne
