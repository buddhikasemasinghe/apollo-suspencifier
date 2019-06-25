const { RESTDataSource } = require('apollo-datasource-rest');

class MovieAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = 'https://api.themoviedb.org/3/';
    }

    searchMovieReducer(response){
        return {
            id: response.results.id,
            title: response.results.title,
            released: response.results.release_date,
            popularity: response.results.popularity,
            poster: 'https://image.tmdb.org/t/p/w500/'+response.results.poster_path
        }
    }

    async searchMovies(query){
        const response = await this.get('search/movie?api_key=d05447705ce5d01a84770f3a40e28f6c&language=en-US&query=lord%20of%20the%20rings&page=1&include_adult=false');

    }
}