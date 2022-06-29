import { api } from '../../../api/api';
import { useEffect, useState } from 'react';
import IAdministrator from '../../../models/IAdministrator.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquarePlus } from '@fortawesome/free-regular-svg-icons';

interface IAdminAdministratorRowProperties {
    administrator: IAdministrator;
}

export default function AdminListPage(){
    const [ administrators, setAdministrators ] = useState<IAdministrator[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [newAdminUsername, setNewAdminUsername] = useState<string>("");
    const [newAdminPassword, setNewAdminPassword] = useState<string>("");

    function loadAdministrators() {
        api("get", "/api/administrator", "administrator")
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }

            setAdministrators(res.data);
        });
    }

    function doAddNewAdmin(){
        api("post", "/api/administrator/", "administrator", {
            username: newAdminUsername,
            password: newAdminPassword
        })
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }

            loadAdministrators();
            setNewAdminUsername("");
            setNewAdminPassword("");
        });
    }

    useEffect(loadAdministrators, [ ]);

    function AdminAdministratorRow(props: IAdminAdministratorRowProperties) {
        const [ editPasswordVisible, setEditPasswordVisible ] = useState<boolean>(false);
        const [ newPassword, setNewPassword ] = useState<string>("");

        const activeSideClass   = props.administrator.isActive  ? " btn-primary" : " btn-light";
        const inactiveSideClass = !props.administrator.isActive ? " btn-primary" : " btn-light";

        function doToggleAdministratorActiveState() {
            api("put", "/api/administrator/" + props.administrator.administratorId, "administrator", {
                isActive: !props.administrator.isActive,
            })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage(res.data + "");
                }

                loadAdministrators();
            });
        }

        function doChangePassword() {
            api("put", "/api/administrator/" + props.administrator.administratorId, "administrator", {
                password: newPassword,
            })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage(res.data + "");
                }

                loadAdministrators();
            });
        }

        function changePassword(e: React.ChangeEvent<HTMLInputElement>) {
            setNewPassword(e.target.value);
        }

        

        return (
            <tr>
                <td>{ props.administrator.administratorId }</td>
                <td>{ props.administrator.username }</td>
                <td>
                    <div className="btn-group" onClick={() => { doToggleAdministratorActiveState() }}>
                        <div className={"btn btn-sm" + activeSideClass}>
                            <FontAwesomeIcon icon={ faSquareCheck } />
                        </div>
                        <div className={"btn btn-sm" + inactiveSideClass}>
                            <FontAwesomeIcon icon={ faSquareCheck } />
                        </div>
                    </div>
                </td>
                <td>
                    { !editPasswordVisible && <button className="btn btn-primary btn-sm" onClick={() => { setEditPasswordVisible(true); }}>Change password</button> }
                    { editPasswordVisible && <div className="input-group">
                        <input type="password" className="form-control form-control-sm" value={ newPassword } onChange={ e => changePassword(e) } />
                        <button className="btn btn-success btn-sm" onClick={() => doChangePassword()}>Save</button>
                        <button className="btn btn-danger btn-sm" onClick={() => { setEditPasswordVisible(false); setNewPassword(""); }}>Cancel</button>
                    </div> }
                </td>
            </tr>
        );
    }

    return (
        <div>
            { errorMessage && <p className="alert aler-danger">{ errorMessage }</p> }
            { !errorMessage &&
                <table className="table table-sm table-hover admin-list">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        { administrators.map(admin => <AdminAdministratorRow key={ "administrator" + admin.administratorId } administrator={ admin } />) }
                    </tbody>
                </table>
            }
             <div className=''>
                
                <input  type="text" className="form-control form-control-sm w-25" placeholder="Unesite korisničko ime"  value={ newAdminUsername } onChange={ e => setNewAdminUsername(e.target.value) } />
                <input  type="password" className="form-control form-control-sm w-25" placeholder="Unesite lozinku"  value={ newAdminPassword } onChange={ e => setNewAdminPassword(e.target.value) } />
                <button className="btn btn-md btn-success mt-2" onClick={() => doAddNewAdmin()}><FontAwesomeIcon icon={ faSquarePlus } />  Napravi novog administratora</button>
            </div>
        </div>
    );
}