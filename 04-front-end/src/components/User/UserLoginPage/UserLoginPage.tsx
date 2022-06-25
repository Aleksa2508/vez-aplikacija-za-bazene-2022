import { useState } from "react";

export default function UserLoginPage() {
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const doLogin = () => {
        console.log("Logovanje...", email, password);
    }
    
    return (
        <div className="row">
            <div className="column col-xs-12 col-md-6 offset-md-3">
                <h1 className="h4 mb-3">Prijavite se na vaš nalog</h1>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Unesite vaš email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="password" placeholder="Unesite vašu lozinku" value={password} onChange={e => setPassword(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary px-5" onClick={() => doLogin()}>Prijavi se</button>
                </div>
            </div>
        </div>
    );
}
