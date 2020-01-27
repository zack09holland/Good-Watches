# Good-Watches
Movie suggestion app using React, Redux, Express, Mongoose, and The Movie Database API. Good Watches allows users to find recommendations when they cant decide on a movie to watch and want to find something similar to other movies they enjoy. App also allows users to find information on movie and tv shows.
## Website
[Good-Watches](https://good-watches.herokuapp.com)

### How-To:
Steps for Using the Site:
1. Type a movie you like into the search box to find movies you could watch that are similar 
    -FYI: The movie card details for the recommended movies are currently not implemented
2. Users can find information for movies that are Now Playing, Top Rated, Popular and Upcoming
3. Users can also find information for TV shows that are Currently Airing Today, On the air, Top Rated, and Popular
3. Features that are in development and are not yet implemented in the back-end
    -User favoriting
      -Allow users to favorite movies to curate recomendations based on their tastes 
    -User watched list
      -Allow users to say they've watched it, to avoid getting recommended a movie they've already seen
    -User Do not watch list
      -Allow users to say they do not want to watch it, to avoid getting recommended it
      
### Technologies Used:
- TMDB API - Movie to pull all movie and tv show information
- Passport - Used to authorize user logins
- MongoDB - Used to hold movie database information and user information pertaining to favorites, watched list, and do not watch list
- React.js - Used to build front end
- React Redux - Used to control change of state of movie and tv cards to allow modal displays

