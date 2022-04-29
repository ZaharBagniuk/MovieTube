import * as React from 'react';
import {useState, useMemo, useEffect, useRef} from "react";
import {connect} from 'react-redux';
import {useDispatch} from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from '@mui/icons-material/Star';
import {MoviesActions, searchForMovie, selectMovie} from "../../../actions/movies";
import {ThunkDispatch} from "@reduxjs/toolkit";
import SearchWrapper from "./SearchWrapper";
import {Movie} from "../../../reducers/types";
import {sortBy} from 'lodash';
import {Link, useSearchParams} from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";

const SearchBar = ({placeholder, movies}) => {
    const inputEl = useRef(null);
    const [filteredData, setFilteredData] = useState([]);
    const [areResultsLoading, setResultsLoading] = useState(false);
    const [wordEntered, setWordEntered] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch: ThunkDispatch<{}, {}, MoviesActions> = useDispatch();

    const sortedMovies = useMemo(() => {
        return getSortedResultsByVoteAverage(filteredData);
    }, [filteredData]);

    useEffect(() => {
        if (wordEntered) {
            setFilteredData(movies);
        }
    }, [movies]);

    const handleFilter = async event => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      if (searchWord) {
          setResultsLoading(true);
          await dispatch(searchForMovie(searchWord)).then(() => setResultsLoading(false));
      }

      if (searchWord === "") {
          setFilteredData([]);
      }
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (filteredData.length) {
            searchParams.set('query', wordEntered);
            setSearchParams(searchParams);
            clearDataAndCloseResults();
        }
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
        <SearchWrapper ref={inputEl}>
            <form onSubmit={handleSubmit}>
                <div className="searchInputs">
                    <input
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
                    <div className="dataResult">
                        {areResultsLoading ?
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                                <CircularProgress />
                            </Box> :
                            sortedMovies.map((value: Movie) => {
                                const releaseYear = new Date(value.release_date).getFullYear();
                                const {overview} = value;
                                const detailsStr = `${releaseYear || ''}${formDetail(overview)}`;
                                return (
                                    <Link to={`/movie/${value.id}`} key={value.id} className="dataItem" onClick={() => onResultClicked(value)}>
                                        <img src={`http://image.tmdb.org/t/p/w200/${value.poster_path}`} alt='Not found' />
                                        <span className="detailsWrapper">
                                        <span className="generalInfo" title={value.title}>
                                            <span className="title">{`${value.title}`}</span>
                                            <span className="voteRate">
                                                <StarIcon />
                                                <span className="value">{value.vote_average}</span>
                                            </span>
                                        </span>
                                        <em title={detailsStr} className="details">{detailsStr}</em>
                                    </span>
                                    </Link>
                                );
                            })
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

const formDetail = (field: string | undefined) => {
    return field ? `, ${field}`: '';
};

export const getSortedResultsByVoteAverage = (results: Array<Movie>) => {
    return sortBy(results, 'vote_average').reverse();
};

export default connect(mapStateToProps)(SearchBar);