// type ResponseKind = 'success' | 'failure';
// type NetworkResponse<T> = {
//   responseKind: ResponseKind;
//   body?: T;
// };

export const fetchMovies = async () => {
  let response = await fetchMoviesAPIRequest();
  return response.body;
};

const fetchMoviesAPIRequest = async () => {
  const response = await fetch(
    'https://imdb8.p.rapidapi.com/auto-complete?q=marvel',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '82878dcda4msh05e58f8f9d20040p17efbbjsn16b625d2ffbf',
        'x-rapidapi-host': 'imdb8.p.rapidapi.com'
      }
    }
  );
  if (response.ok) {
    const data = await response.json();
    console.log('🚀 ~ file: index.ts ~ line 24 ~ fetchMovies ~ data', data);

    let cleanMovieData = {};
    cleanMovieData.image = data.d[0].i.imageUrl;
    cleanMovieData.id = data.d[0].id;
    cleanMovieData.title = data.d[0].l;
    return {
      responseKind: 'success',
      body: cleanMovieData
    };
  } else {
    return {
      responseKind: 'failure'
    };
  }
};
