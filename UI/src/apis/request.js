const requests = {
  NowPlaying: {
    url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`,
    config: {
      accept: "application/json",
      Authorization:
        `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`, 
    },
  },
  Popular: {
    url: `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`,
    config: {
      accept: "application/json",
      Authorization:
        `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,  
    },
  },
  TopRated: {
    url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`,
    config: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  },
  Upcoming: {
    url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`,
    config: {
      accept: "application/json",
      Authorization:
        `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  },
  Trending: {
    day_url: `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`,
    week_url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`,
    config: {
      accept: "application/json",
      Authorization:
        `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  },
};

export default requests;
