import { useState } from "react";
import { Films } from "./pages/Films/Films";
import { Login } from "./pages/Login/Login";
import { Library } from "./pages/Library/Library";
import { Header } from "./components/Header/Header";

export default function App() {
    const [currentView, setCurrentView] = useState(0);
    return (
        <div id="app">
            <Header currentView={currentView} setCurrentView={setCurrentView} />
            {currentView === 0 && <Login />}
            {currentView === 1 && <Films />}
            {currentView === 2 && <Library />}
        </div>
    );
}
