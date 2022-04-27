import {SEARCH_FOR_MOVIE, SELECT_MOVIE} from "../actions/constants";
import {Movie} from "./types";

export interface State {
    movies: Array<Movie>,
    selectedMovie: Movie
}

const INITIAL_STATE = {
    movies: [],
    selectedMovie: null
};

export default function (state: State = INITIAL_STATE, action) {
    switch (action.type) {
        case SEARCH_FOR_MOVIE:
            const movies = action.movies;
            return {
                ...state,
                movies: movies,
                selectedMovie: movies[0]
            }
        case SELECT_MOVIE:
            return {
                ...state,
                selectedMovie: action?.selectedMovie
            }
        default:
            return state;
    }
}