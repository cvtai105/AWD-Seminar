import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { fetchMovies } from '../apis/movie';
import { useEffect } from 'react';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};


const SearchPage = () => {
    const query = useQuery();
    const searchTerm = query.get('query');
    const [totalPages, setTotalPages] = React.useState(0);
    const [movies, setMovies] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [endOfResults, setEndOfResults] = React.useState(false);

    useEffect(() => {
        console.log("search term changed: ", searchTerm);
        setIsLoading(true);
        fetchMovies(searchTerm).then((data) => {
            setMovies(data?.results || []);
            setTotalPages(data?.total_pages || 0);
            setPage(data?.page || 1);
            setIsLoading(false);
            
        });
    }
    , [searchTerm]);    

    useEffect(() => {
        console.log("page changed: ", page);
        if (page === 1) return;
        if (page > totalPages) {
            setEndOfResults(true);
            return;
        }
        setIsLoading(true);
        fetchMovies(searchTerm, page).then((data) => {
            const newMovies = data?.results || [];
            setMovies(prevMovies => [...prevMovies, ...newMovies]);
            setIsLoading(false);
        })
        
    }
    , [page]);

    useEffect(() => {
        let debounceTimeout;
        const handleScroll = () => {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
    
            if (scrollTop + windowHeight >= documentHeight - 100 && !isLoading) {
              setPage(prevPage => prevPage + 1);
            }
          }, 200);  // adjust the delay as needed
        };
    
        if (!isLoading) {
            document.addEventListener('scroll', handleScroll);
        }
    
        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading]);

    return (
        <div >
            <div style={containerStyles}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            {endOfResults ? <p className="text-center font-bold text-black py-4">THE END</p> : <p className="text-center font-bold text-black py-4">LOADING</p>}
        </div>
    );
};

const containerStyles = {
    display: 'flex',
    flexWrap: 'wrap', // Wrap items to the next row if needed
    gap: '16px', // Gap between items
    paddingLeft: '16px', // Left padding
    justifyContent: 'flex-start', // Center items horizontally
    maxWidth: '1200px', // Optional: Limit the maximum width of the container
    margin: '1rem auto', // Center the container itself in the page
};



export default SearchPage;