
export async function fetchMovies(query, page = 1, language = 'en-US', year = null, primary_release_year = null, region = null, adult = false, ) {
    
    if (!query) {
        return null;
    }
    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`;
    console.log("query movies: ", url);
    if (language != 'en-US') {
        queryString += `&language=${language}`;
    }
    if (year) {
        queryString += `&year=${year}`;
    }
    if (primary_release_year) {
        queryString += `&primary_release_year=${primary_release_year}`;
    }
    if (region) {
        queryString += `&region=${region}`;
    }
    if (adult) {
        queryString += `&include_adult=${adult}`;
    }

    const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    console.log("response header: ", response);
    
    if (!response.ok) {
        return null;
    }


    
    const data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
        data.results[i].poster = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
        
        data.results[i].year = data.results[i].release_date.split('-')[0];
    }


    console.log("response body: ", data);
    return data;
}

export async function getMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        },
    });
    const data = await response.json()
    console.log("get movie details response: ", data);
    return data;
}

export async function getRecommendation(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        },
    });
    const data = await response.json()
    // console.log("get recomendation response: ", data);
    return data.results;
}