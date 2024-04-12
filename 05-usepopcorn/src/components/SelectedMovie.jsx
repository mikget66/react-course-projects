import { useEffect, useRef, useState } from "react";

import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useKey } from "../Hooks/useKey";

const SelectedMovie = ({ selectedId, onClose, onAddWatched, watched }) => {
  const key = "efeea558";
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const countRef = useRef(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };

    onAddWatched(newWatchedMovie);
    onClose(); 
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
          );

          const data = await res.json();
          setMovie(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false); //to remove the loading text after making the API call or catching error
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );
  useEffect(()=>{
    if(!title)return;
    document.title = `Movie | ${title}`

    return function (){
      document.title = 'usePopcorn'
    }
  },[title])

  useKey('Escape', onClose)


  useEffect(()=>{
    if(userRating) countRef.current++
    
    },[userRating])

  return (
    <div className="details">
      {isLoading && <Loader />}

      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull;{runtime}{" "}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMBD rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating size={24} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add
                    </button>
                  )}
                </>
              ) : (
                <p>you watched this movie {watchedUserRating} <span>⭐</span></p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default SelectedMovie;
