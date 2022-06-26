import { Link } from 'react-router-dom';
export default function AdminDashboardPage() {
    return (
        
            <div className="row">
                <div className=" card col-12 col-lg-4 col-md-5 mt-4 p-3 offset-md-4">
                    
                                <h1 className="h6">Korisnici</h1>
                                <Link className="btn btn-primary mb-2" to="/admin/users">Lista korisnika</Link>
                                <Link className="btn btn-primary" to="/admin/periods">Rezervacije</Link>

                                <h2 className="h6 mt-3">Administratori</h2>
                                <Link className="btn btn-primary" to="/admin/admin-list">Lista administratora</Link>

                                <h3 className="h6 mt-3">Ostalo</h3>
                                <Link className="btn btn-primary mb-2" to="/admin/edit-contact">Uredi kontakt stranicu</Link>
                                <Link className="btn btn-primary" to="/admin/edit-rules-and-guides">Uredi pravila i uputstva</Link>
                           
                </div>
            </div>
        
    );
}