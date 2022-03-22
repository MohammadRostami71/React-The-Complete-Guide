import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from "./components/AddMovie";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://react-http-f7666-default-rtdb.firebaseio.com/movies.json');
            const data = await response.json();
            if (!response.ok) {
                throw new Error('something failed');
            }
            const loadedMovie = [];
            for (const key in data) {
                loadedMovie.push({
                    id: key,
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate
                })
            }
            // const transformedMovies = data.map(movieData => {
            //     return {
            //         id: movieData.episode_id,
            //         title: movieData.title,
            //         openingText: movieData.opening_crawl,
            //         releaseDate: movieData.release_date
            //     }
            // });
            setMovies(loadedMovie);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false)

    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, [])

    let content = <p>Not Found!</p>;
    if (movies.length > 0) {
        content = <MoviesList movies={movies}/>
    }
    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading ...</p>;
    }

    async function addMovieHandler(movie) {
        const response = await fetch('https://react-http-f7666-default-rtdb.firebaseio.com/movies.json', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <React.Fragment>
            <section>
                <AddMovie onAddMovie={addMovieHandler}/>
            </section>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {/*{!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}*/}
                {/*{!isLoading && movies.length === 0 && !error && <p>Not Found!</p>}*/}
                {/*{!isLoading && error && <p>{error}</p>}*/}
                {/*{isLoading && <p>Loading ...</p>}*/}
                {content}
            </section>
        </React.Fragment>
    );
}

export default App;
