import { useState, useEffect } from 'react';
import IUser from '../../../models/IUser.model';
import { api } from '../../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";

interface IAdminUserRowProperties {
    user: IUser;
}

export default function UserListPage() {
    const [ users, setUsers ] = useState<IUser[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    function loadUsers() {
        api("get", "/api/user", "administrator")
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }

            setUsers(res.data);
        });
    }

    useEffect(loadUsers, [ ]);

    function AdminUserRow(props: IAdminUserRowProperties) {
        const [ editPasswordVisible, setEditPasswordVisible ] = useState<boolean>(false);
        const [ editNamePartsVisible, setEditNamePartsVisible ] = useState<boolean>(false);
        const [ newPassword, setNewPassword ] = useState<string>("");
        const [ newFirstName, setNewFirstName ] = useState<string>(props.user.firstName);
        const [ newLastName, setNewLastName ] = useState<string>(props.user.lastName);
       
        const activeSideClass   = props.user.isActive  ? " btn-primary" : " btn-light";
        const inactiveSideClass = !props.user.isActive ? " btn-primary" : " btn-light";

        function doToggleUserActiveState() {
            api("put", "/api/user/" + props.user.userId, "administrator", {
                isActive: !props.user.isActive,
            })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage(res.data + "");
                }

                loadUsers();
            });
        }

        function doChangePassword() {
            api("put", "/api/user/" + props.user.userId, "administrator", {
                password: newPassword,
            })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage(res.data + "");
                }

                loadUsers();
            });
        }

        function doEditNameParts() {
            api("put", "/api/user/" + props.user.userId, "administrator", {
                firstName: newFirstName,
                lastName: newLastName,
            })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage(res.data + "");
                }

                loadUsers();
            });
        }

        return (
            <>
                <tr>
                    <td>{ props.user.userId }</td>
                    <td>{ props.user.email }</td>
                    <td>
                        { !editNamePartsVisible &&
                            <div className="row">
                                <span className="col col-9">{ props.user.firstName + " " + props.user.lastName }</span>
                                <div className="col col-3">
                                    <button className="btn btn-primary btn-sm" onClick={ () => setEditNamePartsVisible(true) }>
                                        Izmeni
                                    </button>
                                </div>
                            </div>
                        }
                        { editNamePartsVisible && <div>
                            <div className="form-group mb-3">
                                <input type="text" className="form-control form-control-sm" value={ newFirstName } onChange={ e => setNewFirstName(e.target.value) } />
                            </div>

                            <div className="form-group mb-3">
                                <input type="text" className="form-control form-control-sm" value={ newLastName } onChange={ e => setNewLastName(e.target.value) } />
                            </div>

                            { (newFirstName !== props.user.firstName || newLastName !== props.user.lastName) &&
                            ( <button className="btn btn-sm btn-primary" onClick={ () => doEditNameParts() }>
                                Sačuvaj
                            </button> ) }

                            <button className="btn btn-sm btn-danger" onClick={ () => {
                                setNewFirstName(props.user.firstName);
                                setNewLastName(props.user.lastName);
                                setEditNamePartsVisible(false);
                            } }>
                                Otkaži
                            </button>
                        </div> }
                    </td>
                    <td>
                        <div className="btn-group" onClick={() => { doToggleUserActiveState() }}>
                            <div className={"btn btn-sm" + activeSideClass}>
                                <FontAwesomeIcon icon={ faSquareCheck } />
                            </div>
                            <div className={"btn btn-sm" + inactiveSideClass}>
                                <FontAwesomeIcon icon={ faSquare } />
                            </div>
                        </div>
                    </td>
                    <td>
                        { !editPasswordVisible && <button className="btn btn-primary btn-sm" onClick={() => { setEditPasswordVisible(true); }}>Promeni lozinku</button> }
                        { editPasswordVisible && <div className="input-group">
                            <input type="password" className="form-control form-control-sm" value={ newPassword } onChange={ e => setNewPassword(e.target.value) } />
                            <button className="btn btn-success btn-sm" onClick={() => doChangePassword()}>Sačuvaj</button>
                            <button className="btn btn-danger btn-sm" onClick={() => { setEditPasswordVisible(false); setNewPassword(""); }}>Otkaži</button>
                        </div> }
                       
                    </td>
                </tr>
            
            </>
        );
    }

    return (
        <div>
            { errorMessage && <p className="alert aler-danger">{ errorMessage }</p> }
            { !errorMessage &&
                <table className="table table-sm table-hover user-list">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Puno ime</th>
                            <th>Status</th>
                            <th>Opcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map(user => <AdminUserRow key={ "user" + user.userId } user={ user } />) }
                    </tbody>
                </table>
            }
        </div>
    );
}