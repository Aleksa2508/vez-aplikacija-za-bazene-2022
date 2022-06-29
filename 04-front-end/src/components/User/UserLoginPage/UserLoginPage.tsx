import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { api } from "../../../api/api";
import AuthStore from "../../../stores/AuthStore";

export default function UserLoginPage() {
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();

    const doLogin = () => {
        api("post", "/api/auth/user/login", "user", {email, password})
            .then(res => {
                if(res.status !== "ok") {
                    throw new Error("Prijava nije uspela. Razlog: " + JSON.stringify(res.data));
                }
                return res.data;
            })
            .then(data => {
                AuthStore.dispatch({type: "update", key: "authToken", value: data?.authToken});
                AuthStore.dispatch({type: "update", key: "refreshToken", value: data?.refreshToken});
                AuthStore.dispatch({type: "update", key: "id", value: +(data?.id)});
                AuthStore.dispatch({type: "update", key: "identity", value: email});
                AuthStore.dispatch({type: "update", key: "role", value: "user"});

                navigate("/browse-periods", {replace: true});
            })
            .catch(error => {
                setErrorMessage(error?.message ?? "Prijava nije uspela!");

                setTimeout(() => {
                    setErrorMessage("");
                }, 3500);
            });
            
    }
    
    return (
        <div className="row">
            <div className="column col-xs-12 col-md-6 offset-md-3">
                <h1 className="h4 mt-3 mb-3">Prijavite se na Vaš nalog</h1>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <span className="input-group-text">Email</span>
                        <input className="form-control" type="text" placeholder="Unesite Vaš email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <span className="input-group-text">Lozinka</span>
                        <input className="form-control" type="password" placeholder="Unesite Vašu lozinku" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <button className="btn btn-primary px-5" onClick={() => doLogin()}>Prijavi se</button>
                </div>
                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                <Link className="text-decoration-none link-primary" to="/auth/user/register">Nemate nalog? Registrujte se!</Link>
                <br/>
                <Link className="text-decoration-none link-primary" to="/auth/admin/login">Prijavite se kao administrator!</Link>
                
            </div>
        </div>
    );
}
