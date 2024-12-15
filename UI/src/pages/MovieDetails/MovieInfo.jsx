import React from "react";

const MovieInfo = ({ info }) => {
  console.log("info", info);
  return (
    <div className="relative text-white text-left">
      <section className="flex m-2 h-screen py-4">
        <div className="h-full w-[calc(100vh*9/16)] mx-4">
          <img
            className="h-full w-full object-cover rounded-md"
            src={`https://image.tmdb.org/t/p/original/${info?.poster_path}`}
            alt={info?.title}
          />
        </div>
        <div className="w-full bg-no-repeat bg-contain bg-center opacity-60 text-white mr-4">
          <img
            className="w-full h-full object-cover object-center"
            src={`https://image.tmdb.org/t/p/original/${info?.backdrop_path}`}
            alt={info?.title}
          />
          <section className="absolute sm:top-[50%] md:top-[10%] flex flex-col gap-4 mx-4 p-4">
            <div>
              <h1 className="text-4xl font-bold text-left">{info?.title} </h1>
              <div className="flex flex-row">
                {!!info?.release_date && (
                  <p className="text-slate-300 border-r-2 pr-2">
                    Released {info?.release_date}
                  </p>
                )}
                <ul className="flex flex-row border-r-2 pr-2">
                  {info?.genres.map((g, index) => {
                    if (index == info.genres.length - 1)
                      return <li className="ml-2">{g.name}</li>;
                    else return <li className="ml-2">{g.name}, </li>;
                  })}
                </ul>

                {!!info?.runtime && (
                  <span className="mx-2">
                    {Math.floor(info.runtime / 60)}h {info.runtime % 60}m
                  </span>
                )}
              </div>
            </div>

            {/* Score band */}
            <div className="flex flex-row gap-2 items-center">
              <div class="relative w-24 h-24">
                <svg
                  class="absolute inset-0 w-full h-full transform rotate-[-90deg]"
                  viewBox="0 0 36 36"
                >
                  <circle
                    class="text-slate-500"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="slate-500"
                    cx="18"
                    cy="18"
                    r="17"
                  />
                  <circle
                    class="text-gray-200"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    cx="18"
                    cy="18"
                    r="16"
                  />
                  <circle
                    class="text-green-500"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-dasharray={`${info?.vote_average * 10}, 100`}
                    fill="none"
                    cx="18"
                    cy="18"
                    r="16"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-2xl font-bold text-green-500">
                    {(info?.vote_average * 10).toFixed(1)}
                    <span className="text-sm">%</span>
                  </span>
                </div>
              </div>
              <p>User Score</p>
            </div>

            <div>
              <h2>Overview:</h2>
              <p className="sm:w-full md:w-3/4">{info?.overview}</p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              {/* Love Button */}
              <div className="relative">
                <button className="w-16 h-16 flex items-center justify-center bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600">
                  {/* Love Icon (Heart) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Love
                </span>
              </div>

              {/* Save Button */}
              <div className="relative">
                <button className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600">
                  {/* Save Icon (Bookmark) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 19c0 1.1.89 1.99 1.99 1.99L12 19l5.01 1.99c1.1 0 1.99-.89 1.99-1.99V5c0-1.1-.89-2-1.99-2zM12 17l-4-1.5V5h8v10.5L12 17z" />
                  </svg>
                </button>
                <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Save
                </span>
              </div>

              {/* Wishlist Button */}
              <div className="relative">
                <button className="w-16 h-16 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600">
                  {/* Wishlist Icon (Heart Outline) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
                <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Wishlist
                </span>
              </div>

              {/* Play Button */}
              <div className="relative">
                <button className="w-16 h-16 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600">
                  {/* Play Icon (Triangle) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Play
                </span>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default MovieInfo;
