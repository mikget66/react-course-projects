import { useEffect, useState } from "react";
import Nav from "./components/NavBar/Nav";
import Main from "./components/Main";
import Logo from "./components/NavBar/Logo";
import SearchBar from "./components/NavBar/SearchBar";
import NumResults from "./components/NavBar/NumResults";
import MovieList from "./components/movies/MovieList";
import WatchedList from "./components/watched/WatchedList";
import WatchedSummary from "./components/watched/WatchedSummary";
import Box from "./components/Box";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SelectedMovie from "./components/SelectedMovie";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

  //  fetch(`http://www.omdbapi.com/?apikey=${key}&s=interstellar
  //  `)
  //  .then(res => res.json())
  //  .then((data)=>setMovies(data.Search))//wrong way to fetch data

  const key = "efeea558";

export default function App() {

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");


  function handleSelectMovie (id){
    setSelectedId((selectedID)=> id === selectedID ? null : id )
  }
  function handleCloseMovie (){
    setSelectedId(null)
  }
  function handleAddWatched (movie){
    setWatched((watched)=>[...watched, movie])
  }
  function handleDeleteWatched (id){
    setWatched((watched)=>watched.filter((movie)=> movie.imdbID !== id))
  }



  useEffect(
    function () {
      const controller = new AbortController();//to prevent race condition and use it foe cleanup function
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,{signal: controller.signal}
          );

          if (!res.ok) throw new Error("Something went wrong");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
            if (err.name !== "AbortError"){// to ignore Abort error
              setError(err.message);
            }
        } finally {
          setIsLoading(false); //to remove the loading text after making the API call or catching error
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie()
      fetchMovies();

      return function (){// clean up function
        controller.abort();//cancel the request when a new request is placed that prevent too many requests 
      }
    },
    [query]
  ); // runs the effect whenever this state changes
  
  return (
    <>
      <Nav>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>

      <Main>
        <Box>
          {/* {isLoading? <Loader/> :<MovieList movies={movies}/>} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelect={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId? 
          <SelectedMovie 
            selectedId={selectedId}
            onClose={handleCloseMovie} 
            onAddWatched={handleAddWatched}
            watched={watched}
          />:
          <>
            <WatchedSummary watched={watched} />
            <WatchedList watched={watched} onDelete={handleDeleteWatched}/>
          </>}
        </Box>
      </Main>
          
    </>
  );
}


//passing Elements as props

//<Box element={<MovieList movies={movies}/>}/>
//<Box element={
//<>
//<WatchedSummary watched={watched}/> 
//<WatchedList watched={watched}/>
//</>}/>

