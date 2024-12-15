import React from 'react';

import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  return (
    
    <Link to={`/movies/${movie.id}`}>
    <div style={styles.card}>
      <div style={styles.posterWrapper}>
        { movie.poster? 
          <img src={movie.poster} style={styles.poster} /> :
          <div style={{...styles.poster, backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <span style={{color: '#999'}}>No Poster</span>
          </div>
        }
      </div>
      <div style={styles.details}>
        <h3 style={styles.title}>{movie.title}</h3>
        <p style={styles.year}>{movie.year}</p>
      </div>
    </div>
    </Link>
  );
};

export default MovieCard;

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '220px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  posterWrapper: {
    position: 'relative',
    height: '20rem',
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  details: {
    padding: '10px',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: '1rem',
    margin: '5px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  year: {
    fontSize: '0.8rem',
    color: '#555',
  },
};

