import React, { useEffect, FunctionComponent } from 'react';
import { View, Text } from 'react-native';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../api-client';

type MovieListInterface = {
  movies: [];
};

const MovieList = ({ movies: [] }: MovieListInterface) => {
  const dispatch = useDispatch();
  const screenState = useSelector((state: RootState) => state.movies);
  // console.log(
  //   '🚀 ~ file: Movie.tsx ~ line 10 ~ screenState',
  //   screenState.movies
  // );

  // useEffect(() => {
  //   dispatch(fetchMovies);
  // }, []);
  return (
    <>
      {screenState.loading && <Text>LOADING</Text>}
      {screenState.error && <Text>ERROR</Text>}
      {!screenState.loading && !screenState.error && <Text>Movies</Text>}
    </>
  );
};

export default MovieList;
