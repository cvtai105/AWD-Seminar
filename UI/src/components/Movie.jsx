import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

const Movie = ({ movie, savedMovies, props }) => {
  const [like, setLike] = useState(false);
  const [display, setDisplay] = useState(false);
  const { isAuthenticated } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Kích hoạt hiệu ứng khi movie thay đổi
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 500); // Hiệu ứng delay 0.5s
    return () => clearTimeout(timer); // Dọn dẹp timeout khi component unmount
  }, [movie]);

  function handleClick() {
    const previousState = like;
    const currentState = !like;
    setLike(!like);
    setTimeout(() => {
      setDisplay(true);
    }, 500);
    setTimeout(() => {
      setDisplay(false);
    }, 1500);

    if (currentState) {
      // Thêm phim vào danh sách yêu thích.
    } else if (previousState == true) {
      // Nếu trạng thái hiện tại là false nhưng trạng thái trước đó là true thì điều này có nghĩa là user đã huỷ phim yêu thích này.
    }
  }

  return (
    <Link to={`/movies/${movie.id}`}>
      <div
        className={`${
          visible ? "fade-in" : "fade-out"
        } h-full w-[350px] inline-block mr-8 cursor-pointer group relative text-white`}
      >
        <img
          className={`${
            visible ? "fade-in" : "fade-out"
          } w-full object-cover rounded-2xl group-hover:shadow-lg group-hover:shadow-[#000B58]/70`}
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title}
        />
        {isAuthenticated ? (
          <button
            onClick={handleClick}
            className="absolute top-5 right-5 hidden group-hover:block p-2 rounded-3xl bg-white"
          >
            {!like ? (
              <FaRegHeart className="text-2xl text-red-500" />
            ) : (
              <FaHeart className="text-2xl text-red-500" />
            )}
          </button>
        ) : null}
        <p className="hidden group-hover:flex w-full absolute bottom-0 bg-black py-3 px-2 opacity-70 rounded-b-2xl -translate-y-[50%]">
          {movie.title}
        </p>
        {display ? (
          <div>
            {like ? (
              <div className="w-[400px] h-[130px] rounded-2xl bg-[#F6F6F6] fixed top-[20%] left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center gap-y-3 items-center opacity-80 z-50">
                <p className="text-black text-[22px]">
                  Thêm vào phim yêu thích thành công!
                </p>
                <img
                  className="w-[15%]"
                  src="https://image.similarpng.com/very-thumbnail/2020/11/Correct-icon-button-on-transparent-background-PNG.png"
                />
              </div>
            ) : (
              <div className="w-[400px] h-[130px] rounded-2xl bg-[#F6F6F6] fixed top-[20%] left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center gap-y-3 items-center opacity-80 z-50">
                <p className="text-black text-[22px]">
                  Xoá phim yêu thích thành công!
                </p>
                <img
                  className="w-[15%]"
                  src="https://image.similarpng.com/very-thumbnail/2020/11/Red-incorrect-icon-button-on-transparent-background-PNG-1.png"
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default Movie;
