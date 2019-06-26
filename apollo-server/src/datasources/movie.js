const { RESTDataSource } = require('apollo-datasource-rest');

class MovieAPI extends RESTDataSource {
    constructor(){
        super();
        this.baseURL = process.env.MOVIE_DB_API;
        this.apiKey = process.env.MOVIE_DB_API_KEY
        this.imageAPI = process.env.MOVIE_DB_IMAGE_API
    }

    movieReducer(movie){
        return {
            id: movie.id,
            title: movie.title,
            released: movie.release_date,
            popularity: movie.popularity,
            poster: this.imageAPI+movie.poster_path,
            logo: movie.logo_path
        }
    }

    reviewReducer(review){
        return {
            id: review.id,
            author: review.author,
            url: review.url,
            content: review.content
        }
    }

    async searchMovies(query) {
        const apiPath = `search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
        const response = await this.get(apiPath);
        console.log(response.results);
        return Array.isArray(response.results) ? response.results.map(movie => this.movieReducer(movie)) : [];
    }

    async getReview(movieId) {
        const response = await this.get(`${movieId} /reviews?api_key= ${this.apiKey} `);
        return Array.isArray(response.results) ? response.results.map(review => this.reviewReducer(review)) : [];
    }
}

module.exports = MovieAPI;