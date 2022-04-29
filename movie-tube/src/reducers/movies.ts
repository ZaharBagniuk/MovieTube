import {
    FETCH_GENRES,
    SEARCH_FOR_MOVIE,
    SEARCH_FOR_MOVIES, SEARCH_FOR_MOVIES_BY_QUERY,
    SEARCH_FOR_TOP_RATED_MOVIES,
    SELECT_MOVIE
} from "../actions/constants";
import {Genre, Movie} from "./types";

export interface State {
    movies: Array<Movie>,
    selectedMovies: Array<Movie>,
    selectedMovie: Movie,
    genres: Array<Genre>
}

const INITIAL_STATE = {
    movies: [],
    selectedMovies: [],
    selectedMovie: null,
    genres: []
};

export default function (state: State = INITIAL_STATE, action) {
    switch (action.type) {
        case SEARCH_FOR_MOVIES:
            const movies = Array.isArray(action?.movies) ? action.movies : [];
            return {
                ...state,
                movies
            };
        case SEARCH_FOR_TOP_RATED_MOVIES:
            return {
                ...state,
                selectedMovies: action?.selectedMovies
            }
        case SEARCH_FOR_MOVIE:
            return {
                ...state,
                selectedMovie: action?.selectedMovie
            };
        case SELECT_MOVIE:
            return {
                ...state,
                selectedMovie: action?.selectedMovie
            };
        case FETCH_GENRES:
            return {
                ...state,
                genres: action.genres
            }
        case SEARCH_FOR_MOVIES_BY_QUERY:
            return {
                ...state,
                selectedMovies: action?.selectedMovies
            };
        default:
            return state;
    }
}