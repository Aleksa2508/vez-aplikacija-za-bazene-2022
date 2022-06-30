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
    
    return (
        <>
            {role === "visitor" && <MenuVisitor />}
            {role === "user" && <MenuUser />}
            {role === "administrator" && <MenuAdmin />}
        </>
    );
}

