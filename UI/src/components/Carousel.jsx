import React, { useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

function Carousel(props) {
  const movies = props.data;
  const [index, setIndex] = useState(0);
  const length = movies.length;

  function previousMovies() {
    if (index === 0) {
      setIndex(length - 1);
    } else setIndex(index - 1);
  }
  function nextMovies() {
    if (index === length - 1) {
      setIndex(0);
    } else setIndex(index + 1);
  }

  return (
    <div className="w-full h-full relative group text-white text-left">
      <div className="w-full h-full absolute bg-gradient-to-r from-black to-pink-500 opacity-50 group"></div>
      <img
        className="w-full h-full object-cover"
        src={`https://image.tmdb.org/t/p/original/${movies[index].backdrop_path}`}
        alt={movies[index].title}
      />
      <div
        onClick={previousMovies}
        className="cursor-pointer absolute opacity-50 hover:opacity-100 left-10 -translate-y-1/2 group-hover:block top-1/4 sm:top-1/3 md:top-2/4 hidden"
      >
        <FaRegArrowAltCircleLeft className="text-5xl" />
      </div>
      <div
        onClick={nextMovies}
        className="cursor-pointer absolute opacity-50 hover:opacity-100 right-10 -translate-y-1/2 group-hover:block top-1/4 sm:top-1/3  md:top-2/4 hidden"
      >
        <FaRegArrowAltCircleRight className="text-5xl" />
      </div>
      <div className="absolute top-[35%] sm:top-[50%] md:top-1/2  flex flex-col gap-y-4 w-4/5 ml-[10%]">
        <h1 className="text-3xl font-bold text-left">{movies[index].title}</h1>
        <div className="flex flex-row gap-4 items-center ">
          <button
            className="px-4 py-2 rounded-[20px] bg-white text-black hover:bg-transparent hover:text-white"
            value={movies[index].id}
          >
            Trailer
          </button>
          <button
            className="px-4 py-2 rounded-[20px] border-[1px] text-slate-300 border-slate-300 hover:bg-white hover:text-black"
            value={movies[index].id}
          >
            Detail
          </button>
        </div>
        <div className="flex flex-row gap-x-4 items-center">
          <p className="text-slate-300 border-r-2 pr-4">
            Released {movies[index].release_date}
          </p>
          <p>Rating: {movies[index].vote_average}</p>
        </div>

        <p className="sm:w-full md:w-3/4">{movies[index].overview}</p>
      </div>
    </div>
  );
}

export default Carousel;
