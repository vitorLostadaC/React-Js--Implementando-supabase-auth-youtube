import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loading } from "../../components/Loading/Loading";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../services/supabase";

import "./Films.scss";

export function Films() {
    const [movies, setMovies] = useState();
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=e346d8bbd77bdb910913cb9da2901344&language=pt-BR"
        )
            .then((result) => result.json())
            .then((result) => setMovies(result.results));
    }, []);

    const handleClickMovie = async (currentMovie) => {
        setLoading(true);
        if (!!!user) {
            toast.error("Faça o login primeiro");
            setLoading(false);
            return;
        }

        let movieData = !!user.user_metadata.movies
            ? user.user_metadata.movies
            : [];

        if (movieData.length !== 0)
            if (movieData.find((movie) => movie.id === currentMovie.id)) {
                setLoading(false);
                toast.error("O filme ja foi adicionado a sua biblioteca");
                return;
            }

        movieData.push(currentMovie);

        const { currentUser, error } = await supabase.auth.update({
            data: { movies: movieData },
        });

        if (error) {
            console.log(error);
            return;
        }

        toast.success("Filme adicionado a sua biblioteca");
        setUser(currentUser);
        setLoading(false);
    };

    return (
        <div id="films-page">
            {loading && <Loading />}
            <div className="images">
                {!!movies &&
                    movies.map((movie) => (
                        <img
                            key={movie.id}
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            onClick={() => handleClickMovie(movie)}
                        />
                    ))}
            </div>
        </div>
    );
}
