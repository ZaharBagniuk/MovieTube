import * as React from 'react';
import {useEffect, useMemo, useRef, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {MoviesActions, searchForMovie, selectMovie} from "../../../actions/movies";
import {ThunkDispatch} from "@reduxjs/toolkit";
import SearchWrapper from "./SearchWrapper";
import {Movie} from "../../../reducers/types";
import {sortBy} from 'lodash';
import {useNavigate} from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";
import SearchResult from "./SearchResult";

const SearchBar = ({placeholder, movies}) => {
    const inputEl = useRef(null);
    const [filteredData, setFilteredData] = useState([]);
    const [areResultsLoading, setResultsLoading] = useState(false);
    const [wordEntered, setWordEntered] = useState('');
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<{}, {}, MoviesActions> = useDispatch();

    const sortedMovies = useMemo(() => {
        return getSortedResultsByVoteAverage(filteredData);
    }, [filteredData]);

    useEffect(() => {
        if (wordEntered) {
            setFilteredData(movies);
        }
    }, [movies, wordEntered]);

    const handleFilter = async event => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      if (searchWord) {
          setResultsLoading(true);
          await dispatch(searchForMovie(searchWord))
              .then(() => {
                  setResultsLoading(false);
              });
      }

      if (searchWord === "") {
          setFilteredData([]);
      }
    };

    const handleSubmit = e => {
        e.preventDefault();
        navigate(`/?query=${wordEntered}`, { replace: true });
        clearDataAndCloseResults();
    };

    const handleOutsideClick = e => {
        if (!inputEl.current?.contains(e.target)) {
            clearDataAndCloseResults();
        }
    };

    const clearDataAndCloseResults = () => {
        setWordEntered('');
        setFilteredData([]);
    };

    const onResultClicked = (value: Movie) => {
        dispatch(selectMovie(value));
        clearDataAndCloseResults();
    };

    if (wordEntered) {
        document.addEventListener("click", handleOutsideClick, false);
    } else {
        document.removeEventListener("click", handleOutsideClick, false);
    }

    return (
        <SearchWrapper ref={inputEl} data-testid="SearchBar">
            <form data-testid="searchBarForm" onSubmit={handleSubmit}>
                <div data-testid="searchInputs" className="searchInputs">
                    <input
                        data-testid="input"
                        type="text"
                        value={wordEntered}
                        placeholder={placeholder}
                        onChange={handleFilter}
                        className={`${filteredData.length !== 0 ? 'hasResults' : ''}`}
                    />
                    <div className={`searchIcon ${!!filteredData.length ? 'hasResults' : ''}`} >
                        {
                            !filteredData.length ?
                                <SearchIcon /> :
                                <CloseIcon id="clearBtn" onClick={clearDataAndCloseResults} />
                        }
                    </div>
                </div>
            </form>
            {
                !!filteredData.length && (
                    <div data-testid="dataResult" className="dataResult">
                        {areResultsLoading ?
                            <span data-testid="SearchBarLoader">
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                                    <CircularProgress />
                                </Box>
                            </span> :
                            sortedMovies.map((value: Movie) => (
                                <SearchResult key={value.id} value={value} onResultClicked={onResultClicked} />
                            ))
                        }
                    </div>
                )
            }
        </SearchWrapper>
    );
};

const mapStateToProps = state => {
    return {
        movies: state.movies.movies.movies
    };
};

export const getSortedResultsByVoteAverage = (results: Array<Movie>) => {
    return sortBy(results, 'vote_average').reverse();
};

export default connect(mapStateToProps)(SearchBar);