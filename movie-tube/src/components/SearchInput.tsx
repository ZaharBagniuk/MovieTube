import * as React from 'react';
import {useState} from 'react';
import { useSearchParams } from 'react-router-dom';

interface SearchInputProps {
    onSearch(s: string): void
}

const SearchInput = ({onSearch}: SearchInputProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [, setSearchParams] = useSearchParams();

    const onInputChange = e => {
        const {value} = e?.target;
        setSearchTerm(value);
        setSearchParams({movie: value});
    };

    const onFormSubmit = event => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <>
            <div className="search-bar ui segment">
                <form onSubmit={onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Movie Search</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={onInputChange}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default SearchInput;

