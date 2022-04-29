import * as React from 'react';
import {createContext} from "react";

const LoadingContext = createContext({
    loading: false,
    showLoading: () => {},
    hideLoading: () => {}
});

export default LoadingContext;