import { useAuth } from "../../hooks/useAuth";
import "./Library.scss";

export function Library() {
    const { user } = useAuth();

    return (
        <div id="library-page">
            {!!!user || !!!user.user_metadata.movies ? (
                <h1>Nenhum filme adicionado</h1>
            ) : (
                <div className="images">
                    {user.user_metadata.movies.map((movie) => (
                        <img
                            key={movie.id}
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
