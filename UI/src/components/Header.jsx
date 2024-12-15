import React from "react";
import { useAppContext } from "../AppContext";
import SearchBar from "./SearchBar";

const Header = () => {
    const { logout, isAuthenticated, userData } = useAppContext();
    return (
        <header className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-14">
                <a href="/" className="text-2xl font-bold flex items-center text-cyan-400 ">TMDB</a>
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-cyan-400 font-bold">
                        Movies
                    </a>
                    <a href="#" className="hover:text-cyan-400 font-bold">
                        Books 
                    </a>
                    <a href="#" className="hover:text-cyan-400 font-bold">
                        About
                    </a>
                </nav>
            </div>

            <SearchBar />

            {/* Language Selector and Login */}
            <div className="flex items-center space-x-4">
            
            {isAuthenticated ? (
                <img 
                    onClick={logout}
                    src={userData.picture} 
                    alt="User Avatar" 
                    className="w-9 h-9 rounded-full cursor-pointer hover:opacity-80" 
                />
            ) : (
                <a href="/login" className="hover:text-cyan-400 font-bold">Login</a>
            )}
            </div>
        </div>
        </header>
    );
};

export default Header;
