import "./Header.scss";

export function Header(props) {
    return (
        <div id="header-page">
            <button
                id="login"
                onClick={() => props.setCurrentView(0)}
                className={`${props.currentView === 0 && "selected"}`}
            >
                Usuário
            </button>
            <button
                id="films"
                onClick={() => props.setCurrentView(1)}
                className={`${props.currentView === 1 && "selected"}`}
            >
                Filmes
            </button>
            <button
                id="library"
                onClick={() => props.setCurrentView(2)}
                className={`${props.currentView === 2 && "selected"}`}
            >
                Biblioteca
            </button>
        </div>
    );
}
