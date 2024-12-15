import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { IoMdArrowDropright } from "react-icons/io";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = (props) => {
  const request = props.request;
  const title = props.title;
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    // Lấy danh sách film yêu thích của user rồi nạp vào chương trình
    async function updateSavedMovies() {}
    updateSavedMovies();

    async function fetchData() {
      try {
        const result = await axios.get(request.url, request.config);
        setMovies(result.data.results);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  function moveSlideToLeft() {
    const id = props.rowID;
    let slider = document.getElementById(`slider_${id}`);
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  function moveSlideToRight() {
    const id = props.rowID;
    let slider = document.getElementById(`slider_${id}`);
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
          {title} <IoMdArrowDropright className="inline" />
        </h1>
      </div>
      <div
        id={`slider_${props.rowID}`}
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

export default Row;
