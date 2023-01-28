import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import searchIcon from "./search.svg";

// https://www.omdbapi.com/?i=tt3896198&apikey=68fa8f4a

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=68fa8f4a";

const App = () => {
  // Use State
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Search movie using API
  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    // console.log(data.seach);
  };

  // Uses Effect
  useEffect(() => {
    searchMovie("");
  }, []);

  return (
    <div className="app">
      <h1> Movie land</h1>
      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovie(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
