import {SEARCH_FOR_MOVIE, SELECT_MOVIE} from "./constants";
import youtube from "../apis/youtube";
import {Movie} from "../reducers/types";
import {ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";

interface ActionType {
    type: string
}

interface MoviesSearchAction extends ActionType {
    movies: Array<Movie>
}

interface MoviesSelectAction extends ActionType {
    selectedMovie: Movie
}

export type MoviesActions = MoviesSearchAction | MoviesSelectAction;

export function searchForMovie(searchTerm: string): ThunkAction<Promise<void>, any, {}, MoviesActions> {
    return async (dispatch: ThunkDispatch<{}, {} , MoviesActions>): Promise<void> => {
        try {
            const res = await youtube.get("/search", {
                params: { q: searchTerm }
            });
            dispatch({
                movies: res.data.items,
                type: SEARCH_FOR_MOVIE
            });
        } catch (e) {
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