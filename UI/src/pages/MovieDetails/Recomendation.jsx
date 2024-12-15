import {useState, useEffect} from "react";
import { getRecommendation } from "../../apis/movie";
import { IoMdArrowDropright } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Movie from "../../components/Movie";

const Recomendation = ({ movieId }) => {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    async function updateSavedMovies() {}
    updateSavedMovies();

    async function fetchData() {
      try {
        const movieResponse = await getRecommendation(movieId);
        setMovies(movieResponse);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, [movieId]);

  function moveSlideToLeft() {
    let slider = document.getElementById('slider_recomendation');
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  function moveSlideToRight() {
    let slider = document.getElementById('slider_recomendation');
    slider.scrollLeft = slider.scrollLeft + 500;
  }
  return (
    <div className="mx-auto w-[90%] h-[300px] flex flex-col gap-y-4 justify-around items-start relative group/item my-4 ">
      <MdChevronLeft
        onClick={moveSlideToLeft}
        className="cursor-pointer hidden group-hover/item:block z-30 absolute top-2/4 -translate-y-[25%] text-4xl -left-5 rounded-3xl bg-black opacity-50 hover:opacity-100  text-white"
      />
      <div className="flex flex-row justify-between w-full">
        <h1 className="text-2xl row-title py-2 px-3 relative cursor-pointer">
          {"Recomendation"} <IoMdArrowDropright className="inline" />
        </h1>
      </div>
      <div
      id={`slider_recomendation`}
        className="w-full h-full scrollbar-hide overflow-y-hidden whitespace-nowrap scroll-smooth"
      >
        {movies.length !== 0 &&
          movies.map((movie) => {
            return (
              <Movie
                key={movie.id || movie.id_film}
                movie={movie}
                savedMovies={savedMovies}
              />
            );
          })}
      </div>
      <MdChevronRight
        onClick={moveSlideToRight}
        className="cursor-pointer hidden group-hover/item:block z-30 absolute top-2/4 -translate-y-[25%] text-4xl -right-5 rounded-3xl bg-black opacity-50 hover:opacity-100 text-white"
      />
    </div>
  );
};

export default Recomendation;
