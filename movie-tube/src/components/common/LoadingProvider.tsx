import * as React from 'react';
import {useState} from 'react';
import LoadingContext from './LoadingContext';

const LoadingProvider = ({ children }) => {
    const showLoading = () => {
        toggleLoading(prevState => {
            return {
                ...prevState,
                loading: true
            }
        })
    };

    const hideLoading = () => {
        toggleLoading(prevState => {
            return {
                ...prevState,
                loading: false
            }
        })
    };

    const loadingState = {
        loading: false,
        showLoading,
        hideLoading
    };

    const [loading, toggleLoading] = useState(loadingState);

    return (
        <LoadingContext.Provider value={loading}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;