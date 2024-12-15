import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../apis/movie";
import MovieInfo from "./MovieInfo";
import Recomendation from "./Recomendation";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    if (!id) {
      return <h1>The movie id is undefine.</h1>;
    }

    const fetchMovie = async () => {
      // fetch the data of the movie
      const movieResponse = await getMovieDetails(id);
      setMovieData(movieResponse);
    };

    fetchMovie();
  }, [id]);

  return (
    <div>
      <MovieInfo info={movieData} />
      <Recomendation movieId={id}/>
    </div>
  );
};

export default MovieDetails;
