import * as React from 'react'
import { mount } from '@cypress/react'
import MoviesHome from './MoviesHome'

it('renders test span', () => {
    mount(<MoviesHome />);
});
