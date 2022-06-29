import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../api/api';
import AuthStore from '../../../stores/AuthStore';
export default function AdminLoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    const doLogin = () => {
        api("post", "/api/auth/administrator/login", "administrator", {username, password})
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
                AuthStore.dispatch({type: "update", key: "identity", value: username});
                AuthStore.dispatch({type: "update", key: "role", value: "administrator"});

                navigate("/admin/dashboard", {replace: true});
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
                        <span className="input-group-text">Korisničko ime</span>
                        <input className="form-control" type="text" placeholder="Unesite Vaše korisničko ime" value={username} onChange={e => setUsername(e.currentTarget.value)}/>
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

                <Link className="text-decoration-none link-primary" to="/auth/user/login">Prijavite se kao standardan korisnik!</Link>
            </div>
        </div>
    );
}