import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "./App.css";
import AddFavorite from "./components/AddFavorite";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import RemoveFavorites from "./components/RemoveFavorites";
import SearchBox from "./components/SearchBox";
// const api = axios.create({
//   baseURL: "http://www.omdbapi.com/?i=tt3896198&apikey=78b96e97&page",
// });

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("star wars");
  const [favorites, setFavorites] = useState([]);
  const [searchYear, setSearchYear] = useState("");

  const getMovieRequest = (searchValue, searchYear) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&y=${searchYear}&apikey=78b96e97&page`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        }
      });
  };

  useEffect(() => {
    getMovieRequest(searchValue, searchYear);
  }, [searchValue, searchYear]);

  const addFavoriteMovie = (movie) => {
    const exist = favorites.some((favMovie) => {
      return favMovie.imdbID === movie.imdbID;
    });
    console.log(exist);
    if (!exist) {
      setFavorites([...favorites, movie]);
    } else {
      alert("The movie already exist in favorite list");
    }
    // }
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter((favorite) => {
      return favorite.imdbID !== movie.imdbID;
    });
    setFavorites(newFavoriteList);
  };

  return (
    <div className={"container-fluid movie-app"}>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchYear={searchYear}
          setSearchYear={setSearchYear}
        />
      </div>
      <div className={"row"}>
        <MovieList
          movies={movies}
          handleFavoritesClick={addFavoriteMovie}
          favoriteComponent={AddFavorite}
        />
      </div>

      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className={"row"}>
        <MovieList
          movies={favorites}
          handleFavoritesClick={removeFavoriteMovie}
          favoriteComponent={RemoveFavorites}
        />
      </div>
    </div>
  );
};

export default App;
