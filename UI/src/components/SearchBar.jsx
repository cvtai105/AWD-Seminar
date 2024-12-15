import React from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({input = "", search = useNavigate()}) => {
    
    const handleClick = () => {
        const searchInput = document.getElementById("search-input");
        if (!searchInput.value) return;
        //replace " " with "+"
        const query = searchInput.value.replace(/ /g, "+");

        search(`/search?query=${query}`);
    }


    return (
        <div className="text-center w-1/3 flex bg-white rounded-full ">
            <div className="w-full flex">
                <input
                    id="search-input"
                    type="text"
                    defaultValue={input}
                    placeholder="Search for a movie"
                    className=" px-6 py-2 rounded-full w-5/6 focus:outline-none text-black "
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleClick();
                        }
                    }}
                />
                <button onClick={handleClick} className=" text-white px-6 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400  rounded-full hover:text-black transition-all">
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
