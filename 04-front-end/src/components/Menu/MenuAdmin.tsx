import { useNavigate, Link } from 'react-router-dom';
import AuthStore from '../../stores/AuthStore';
export default function MenuAdmin(){
    const navigate = useNavigate();

    function doAdminLogout(){
        AuthStore.dispatch({type: "reset"});
        navigate("/auth/admin/login");
    }
    
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <strong className='px-2'>Zdravo, {AuthStore.getState().identity}</strong>
                        <Link className="nav-item nav-link pt-0 pb-0" to="/admin/dashboard">Dashboard</Link>
                        <Link className="nav-item nav-link pt-0 pb-0" to="/contact">Kontakt</Link>
                        
                        <div className="nav-item nav-link pt-0 pb-0" style={{cursor: "pointer"}} onClick={() => doAdminLogout()}>Odjavi se</div>
                    </div>
                </div>
            </nav>
    );
}