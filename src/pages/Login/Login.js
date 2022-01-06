import "./Login.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../../services/supabase";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../components/Loading/Loading";

export function Login() {
    const { user, setUser } = useAuth();
    const [currentScreen, setCurrentScreen] = useState(0);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChangeValues = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFormRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (values.password !== values.passwordConfirm)
            toast.error("As senhas não se coincidem.");
        if (values.password.length < 6)
            toast.error("A senha deve ter pelo menos 6 caracteres.");

        let { user, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
        });

        if (error) {
            console.log(error);
            return;
        }

        setUser(user);
        setLoading(false);
        toast.success("Cadastro realizado com sucesso");
    };

    const handleFormLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let { user, error } = await supabase.auth.signIn({
            email: values.email,
            password: values.password,
        });

        if (error) {
            console.log(error);
            return;
        }
        setUser(user);
        setLoading(false);
        toast.success("Login realizado com sucesso");
    };

    const handleSignOut = async () => {
        setLoading(true);
        let { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error);
            return;
        }
        toast.success("Usuário deslogado com sucesso");
        setUser();
        setLoading(false);
    };

    return (
        <div id="login-page">
            {loading && <Loading />}
            {user && (
                <div id="authenticated">
                    <h2>{user.email}</h2> <p>{user.id}</p>{" "}
                    <button onClick={handleSignOut}>Deslogar</button>
                </div>
            )}

            {!user && currentScreen === 0 && (
                <form onSubmit={handleFormLoginSubmit}>
                    <h2>Entrar</h2>

                    <span>
                        <label>Email</label>
                        <input
                            required
                            name="email"
                            type="text"
                            onChange={handleChangeValues}
                            value={values.email}
                        />
                    </span>

                    <span>
                        <label>Senha</label>
                        <input
                            required
                            name="password"
                            type="text"
                            onChange={handleChangeValues}
                            value={values.password}
                        />
                    </span>

                    <button type="submit">Entrar</button>

                    <p className="space-between">
                        <span className="space-between row-direction">
                            Não tem conta?{" "}
                            <a
                                onClick={() => {
                                    setCurrentScreen(1);
                                    setValues({
                                        email: "",
                                        password: "",
                                        passwordConfirm: "",
                                    });
                                }}
                            >
                                Cadastrar
                            </a>
                        </span>
                    </p>
                </form>
            )}

            {!user && currentScreen === 1 && (
                <form onSubmit={handleFormRegisterSubmit}>
                    <h2>Registrar</h2>

                    <span>
                        <label>Email</label>
                        <input
                            required
                            name="email"
                            type="text"
                            onChange={handleChangeValues}
                            value={values.email}
                        />
                    </span>

                    <span>
                        <label>Senha</label>
                        <input
                            required
                            name="password"
                            type="text"
                            onChange={handleChangeValues}
                            value={values.password}
                        />
                    </span>

                    <span>
                        <label>Confirmar Senha</label>
                        <input
                            required
                            name="passwordConfirm"
                            type="text"
                            onChange={handleChangeValues}
                            value={values.passwordConfirm}
                        />
                    </span>

                    <button type="submit">Cadastrar</button>
                    <p>
                        Já tem uma conta?{" "}
                        <a
                            onClick={() => {
                                setCurrentScreen(0);
                                setValues({
                                    email: "",
                                    password: "",
                                    passwordConfirm: "",
                                });
                            }}
                        >
                            Entrar
                        </a>
                    </p>
                </form>
            )}
        </div>
    );
}
