import {
    FETCH_GENRES,
    SEARCH_FOR_MOVIE,
    SEARCH_FOR_MOVIES,
    SEARCH_FOR_MOVIES_BY_QUERY,
    SEARCH_FOR_TOP_RATED_MOVIES,
    SELECT_MOVIE
} from "./constants";
import {Genre, Movie} from "../reducers/types";
import {ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";
import themoviedb, {KEY} from "../apis/themoviedb";

interface ActionType {
    type: string
}

interface MoviesSearchAction extends ActionType {
    movies: Array<Movie>
}

interface MoviesSelectAction extends ActionType {
    selectedMovie: Movie
}

interface TopRatedMoviesSearchAction extends ActionType {
    selectedMovies: Array<Movie>
}

interface FetchGenresAction extends ActionType {
    genres: Array<Genre>
}

export type MoviesActions = MoviesSearchAction | MoviesSelectAction | TopRatedMoviesSearchAction | FetchGenresAction;

export function searchForMovie(searchTerm: string): ThunkAction<Promise<void>, any, {}, MoviesActions> {
    return async (dispatch: ThunkDispatch<{}, {} , MoviesActions>): Promise<void> => {
        try {
            const res = await themoviedb.get(`/search/movie`, {
                params: {
                    api_key: KEY,
                    query: searchTerm
                }
            });
            dispatch({
                movies: res.data.results,
                type: SEARCH_FOR_MOVIES
            });
        } catch (e) {
            console.error(e);
        }
    }
}

export function fetchTopRatedMovies(): ThunkAction<Promise<void>, any, {}, MoviesActions> {
    return async (dispatch: ThunkDispatch<{}, {} , MoviesActions>): Promise<void> => {
        try {
            const res = await themoviedb.get(`/movie/top_rated`, {
                params: {
                    api_key: KEY,
                    language: 'en-US',
                    page: 1
                }
            });
            dispatch({
                selectedMovies: res.data.results,
                type: SEARCH_FOR_TOP_RATED_MOVIES
            });
        } catch (e) {
            console.error(e);
        }
    }
}

export function fetchMovieById(id: number): ThunkAction<Promise<void>, any, {}, MoviesActions> {
    return async (dispatch: ThunkDispatch<{}, {} , MoviesActions>): Promise<void> => {
        try {
            const res = await themoviedb.get(`/movie/${id}`, {
                params: {
                    api_key: KEY,
                    language: 'en-US'
                }
            });
            dispatch({
                selectedMovie: res.data,
                type: SEARCH_FOR_MOVIE
            });
        } catch (e) {
            console.error(e);
        }
    }
}

export function fetchGenres(): ThunkAction<Promise<void>, any, {}, MoviesActions> {
    return async (dispatch: ThunkDispatch<{}, {} , MoviesActions>): Promise<void> => {
        try {
            const res = await themoviedb.get(`/genre/movie/list`, {
                params: {
                    api_key: KEY,
                    language: 'en-US'
                }
            });
            dispatch({
                genres: res.data.genres,
                type: FETCH_GENRES
            });
        } catch (e) {
            console.error(e);
        }
    }
}

export function searchForMoviesBySelectedQuery(query: string): ThunkAction<Promise<void>, any, {}, MoviesActions> {
    return async (dispatch: ThunkDispatch<{}, {} , MoviesActions>): Promise<void> => {
        try {
            const res = await themoviedb.get(`/search/movie`, {
                params: {
                    api_key: KEY,
                    query
                }
            });
            dispatch({
                selectedMovies: res.data.results,
                type: SEARCH_FOR_MOVIES_BY_QUERY
            });
        } catch (e) {
            debugger;
            console.error(e);
        }
    }
}

export const selectMovie = (selectedMovie: Movie): MoviesSelectAction => {
  return {
      type: SELECT_MOVIE,
      selectedMovie
  };
};
