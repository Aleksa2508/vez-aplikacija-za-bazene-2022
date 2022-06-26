import { useState } from "react";
import { Link } from 'react-router-dom';

export default function UserLoginPage() {
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const doLogin = () => {
        console.log("Logovanje...", email, password);
    }
    
    return (
        <div className="row">
            <div className="column col-xs-12 col-md-6 offset-md-3">
                <h1 className="h4 mt-3 mb-3">Prijavite se na vaš nalog</h1>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <span className="input-group-text">Email</span>
                        <input className="form-control" type="text" placeholder="Unesite vaš email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <span className="input-group-text">Lozinka</span>
                        <input className="form-control" type="password" placeholder="Unesite vašu lozinku" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <button className="btn btn-primary px-5" onClick={() => doLogin()}>Prijavi se</button>
                </div>

                <Link className="text-decoration-none link-primary" to="/auth/user/register">Nemate nalog? Registrujte se!</Link>
                <br/>
                <Link className="text-decoration-none link-primary" to="/auth/admin/login">Prijavite se kao administrator!</Link>
            </div>
        </div>
    );
}
