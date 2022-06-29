import { Link } from "react-router-dom";
import AuthStore from '../../stores/AuthStore';
import { useState } from 'react';
import MenuVisitor from "./MenuVisitor";
import MenuUser from './MenuUser';
import MenuAdmin from './MenuAdmin';

export default function Menu() {
    
    const [role, setRole] = useState<"visitor"|"user"|"administrator">(AuthStore.getState().role);


    AuthStore.subscribe(() => {
        setRole(AuthStore.getState().role);
    });
    
    /*return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <span>{role}</span>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        
                        <Link className="nav-item nav-link" to="/contact">Kontakt</Link>

                        <Link className="nav-item nav-link" to="/auth/user/login">Prijavi se</Link>
                        <Link className="nav-item nav-link" to="/auth/user/register">Registuj se</Link>
                        <Link className="nav-item nav-link" to="/browse-periods">Lista termina</Link>
                        <Link className="nav-item nav-link" to="/my-periods">Moji termini</Link>
                        <Link className="nav-item nav-link" to="/rules-and-guides">Pravila i uputstva</Link>

                        <Link className="nav-item nav-link" to="/auth/admin/login">Prijavi se kao administrator</Link>
                        <Link className="nav-item nav-link" to="/admin/dashboard">Dashboard</Link>
                    </div>
                </div>
            </nav>
    );*/

    return (
        <>
            {role === "visitor" && <MenuVisitor />}
            {role === "user" && <MenuUser />}
            {role === "administrator" && <MenuAdmin />}
        </>
    );
}

/*

<Route path="/" element={ <div></div> }></Route>
<Route path="/contact" element={ <ContactPage /> }></Route>

<Route path="/auth/user/login" element={ <UserLoginPage /> }></Route>
<Route path="/auth/user/register" element={ <UserRegisterPage /> }></Route>
<Route path="/periods" element={ <MyPeriodsPage /> }></Route>
<Route path="/rules_and_guides" element={ <RulesAndGuidesPage /> }></Route>
<Route path="/periods" element={ <UserPeriodListPage /> }></Route>

<Route path="/auth/admin/login" element={ <AdminLoginPage /> }></Route>
<Route path="/admin/dashboard" element={ <AdminDashboardPage /> }></Route>
<Route path="/admin/periods" element={ <AdminPeriodListPage /> }></Route>
<Route path="/admin/users" element={ <UserListPage /> }></Route>
<Route path="/admin/edit_contact" element={ <AdminEditContactPage /> }></Route>
<Route path="/admin/edit_rules_and_guides" element={ <AdminEditRulesAndGuidesPage /> }></Route>

*/