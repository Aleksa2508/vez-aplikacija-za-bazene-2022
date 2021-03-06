import { Link, useNavigate } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
export default function MenuUser() {
    
    const navigate = useNavigate();

    function doUserLogout(){
        AuthStore.dispatch({type: "reset"});
        navigate("/auth/user/login");
    }
    
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <strong className='px-2'>Zdravo, {AuthStore.getState().identity}</strong>
                        <Link className="nav-item nav-link pt-0 pb-0" to="/browse-periods">Lista termina</Link>
                        <Link className="nav-item nav-link pt-0 pb-0" to="/my-periods">Moji termini</Link>
                        <Link className="nav-item nav-link pt-0 pb-0" to="/rules-and-guides">Pravila i uputstva</Link>
                        <Link className="nav-item nav-link pt-0 pb-0" to="/contact">Kontakt</Link>
                        <div className="nav-item nav-link pt-0 pb-0" style={{cursor: "pointer"}} onClick={() => doUserLogout()}>Odjavi se</div>
                    </div>
                </div>
            </nav>
    );
}