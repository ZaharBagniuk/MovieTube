import * as React from 'react';
import {useSearchParams} from "react-router-dom";

const ResultsHeader = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    return (
        <div className="resultsHeader" data-testid="resultsHeader">
            <h1>
                {query ? `Movies results for: ${query}` : 'Most Rated of All Time'}
            </h1>
        </div>
    );
};

export default ResultsHeader;