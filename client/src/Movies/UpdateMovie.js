import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';
import Movie from './Movie';
import MovieList from './MovieList';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const UpdateMovie = props => {
  const [moviesList, setMoviesList] = useState(initialMovie);
  const {id} = useParams();
  const {push} = useHistory();

useEffect(() => {
axios.get(`http://localhost:5000/api/movies/${id}`)
.then(res => {
  setMoviesList(res.data)
})
.catch(err => {
  console.log(err)
})
},[])

// useEffect(() => {
//     // const id = match.params.id;
//     axios.get(`http://localhost:5000/api/movies/${id}`)
//     .then(res => {
//         res.data = {
//             ...res.data,
//             stars: res.data.stars.toString()
//         }
//         setMoviesList(res.data)
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }, [id]);

  const changeHandler = e => {
    e.preventDefault();
    setMoviesList({
      ...moviesList,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, moviesList)
    .then(res => {
    props.setMoviesList({
        ...props.movieList, ...moviesList
    });
    push(`/movies/${id}`)
    })
    .catch(err => {
        console.log(err)
    })
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Movie Title"
          value={moviesList.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={moviesList.director}
        />
       
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={moviesList.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={moviesList.stars}
        />

        <button className="md-button form-button">Update</button>
        {/* <MovieCard movie={moviesList}/> */}
        <Movie  />
      </form>
    </div>
  );
};

export default UpdateMovie;
