import { combineReducers, configureStore } from '@reduxjs/toolkit';
import movieReducerSlice from './features/movies/movieSlice';

const rootReducer = combineReducers({
  movies: movieReducerSlice
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
