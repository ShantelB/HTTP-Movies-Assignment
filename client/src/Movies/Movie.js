import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const {push} = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
    push(`/update-movie/${params.id}`);
  }


  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log(res);
        setMovieList(...movieList, res.data);
        push('/');
      })
      .catch((err) => console.error({ err }));
    setTimeout(push('/'), 10000);
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button className="md-button" onClick={editMovie}>Edit</button>
      <button className='delete-button' onClick={deleteMovie}>
        Delete Movie
      </button>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      
    </div>
  );
}

export default Movie;
