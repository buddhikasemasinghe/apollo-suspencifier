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
            overview: movie.overview
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

    movieDetailsReducer(movie){
        return {
            id: movie.id,
            title: movie.title,
            rating: movie.vote_average,
            votes: movie.vote_count,
            poster: this.imageAPI+movie.poster_path,
            backdrop: this.imageAPI+movie.backdrop_path,
            overview: movie.overview,
            budget: movie.budget,
            revenue: movie.revenue,
            runtime: movie.runtime,
            productionCountries: movie.production_countries.map((country) => country.name),
            genres: movie.genres.map((genre) => genre.name)
        }
    }

    movieImageReducer(image){
        return {
            id: image.id,
            height: image.height,
            width: image.width,
            filePath: this.imageAPI+image.file_path
        }
    }

    movieVideoReducer(video){
        return {
            id: video.id,
            key: video.key,
            name: video.name,
            size: video.size,
            type: video.type,
            source: video.site.toLowerCase()
        }
    }

    async searchMovies(query) {
        const apiPath = `search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
        const response = await this.get(apiPath);
        return Array.isArray(response.results) ? response.results.map(movie => this.movieReducer(movie)) : [];
    }

    async getReview(movieId) {
        const response = await this.get(`${movieId} /reviews?api_key=${this.apiKey} `);
        return Array.isArray(response.results) ? response.results.map(review => this.reviewReducer(review)) : [];
    }

    async getMovieDetails(movieId) {
        const response = await this.get(`/movie/${movieId}?api_key=${this.apiKey} `);
        return this.movieDetailsReducer(response);
    }

    async getMovieImages(movieId) {
        const response = await this.get(`/movie/${movieId}/images?api_key=${this.apiKey} `);
        return Array.isArray(response.backdrops) ? response.backdrops.map(image => this.movieImageReducer(image)) : [];
    }

    async getMovieVideos(movieId) {
        const response = await this.get(`/movie/${movieId}/videos?api_key=${this.apiKey} `);
        return Array.isArray(response.results) ? response.results.map(video => this.movieVideoReducer(video)) : [];
    }

    async getSimilarMovies(movieId) {
        const response = await this.get(`/movie/${movieId}/similar?api_key=${this.apiKey} `);
        return Array.isArray(response.results) ? response.results.map(movie => this.movieReducer(movie)) : [];
    }
}

module.exports = MovieAPI;