import { configureStore } from '@reduxjs/toolkit';
import movies from './../reducers';

export default configureStore({
    reducer: {
        movies
    }
});