import * as React from 'react';
import StarIcon from "@mui/icons-material/Star";
import {Link} from "react-router-dom";

const SearchResult = ({value, onResultClicked}) => {
    const releaseYear = new Date(value.release_date).getFullYear();
    const {overview} = value;
    const detailsStr = `${releaseYear || ''}${formDetail(overview)}`;

    return (
        <Link to={`/movie/${value.id}`}
              data-testid="dataItem"
              className="dataItem"
              onClick={() => onResultClicked(value)}
        >
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
};

const formDetail = (field: string | undefined) => {
    return field ? `, ${field}`: '';
};

export default SearchResult;