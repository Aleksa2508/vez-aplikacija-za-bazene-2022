import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function UserRegisterPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const doRegister = () => {
        console.log("Registracija...", email, password, firstName, lastName, phoneNumber);
    }
    
    return (
        <div className="row">
            <div className="column col-xs-12 col-md-6 offset-md-3">
                <h1 className="h4 mt-3 mb-3">Napravite svoj nalog!</h1>
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
                    <div className="input-group">
                        <span className="input-group-text">Ime</span>
                        <input className="form-control" type="text" placeholder="Unesite vaše ime" value={firstName} onChange={e => setFirstName(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <span className="input-group-text">Prezime</span>
                        <input className="form-control" type="text" placeholder="Unesite vaše prezime" value={lastName} onChange={e => setLastName(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <span className="input-group-text">Broj telefona</span>
                        <input className="form-control" type="text" placeholder="Unesite vaš broj telefona" value={phoneNumber} onChange={e => setPhoneNumber(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <button className="btn btn-primary px-5" onClick={() => doRegister()}>Registrujte se</button>
                </div>

                <Link className="text-decoration-none link-primary" to="/auth/user/login">Već imate nalog? Prijavite se!</Link>
                <br/>
                <Link className="text-decoration-none link-primary" to="/auth/admin/login">Prijavite se kao administrator!</Link>
            </div>
        </div>
    );
}