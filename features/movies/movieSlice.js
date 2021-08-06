import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import * as client from '../../api-client';

// interface MovieData {
//   name
// }

// export type MovieListState = {
//   movies: Movie[];
//   loading: boolean;
//   error: boolean | undefined;
// };

export const fetchMovies = createAsyncThunk('getMovies', async () => {
  let response = await client.fetchMovies();
  if (response) {
    return {
      movies: response
    };
  }
});

const initialState = {
  movies: [],
  loading: false,
  error: false
};

const movieSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        let data =
          // if (data) {
          (state.movies = action.payload?.movies);
        // }
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  }
});
export default movieSlice.reducer;
