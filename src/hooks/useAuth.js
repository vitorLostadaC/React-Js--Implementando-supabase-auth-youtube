import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../services/supabase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        const user = supabase.auth.user();
        if (user) {
            setUser(user);
            console.log(user);
        }
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
