import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IPeriod from '../../../models/IPeriod.model';
import { api } from '../../../api/api';

export interface IAdminPeriodPageUrlParams extends Record<string, string | undefined> {
    id: string
}

export interface IAdminPeriodPageProperties {
    periodId?: number;
}

export default function AdminPeriodPage(props: IAdminPeriodPageProperties){

    const [ period, setPeriod ] = useState<IPeriod|null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const params = useParams<IAdminPeriodPageUrlParams>();

    const periodId = props?.periodId ?? params.id;

    useEffect(() => {

        api("get", "/api/period/" + periodId, "administrator")
        .then(res => {
            if (res.status === 'error') {
                throw new Error('Could not get period data!');
            }
           
            setPeriod(res.data);
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Unknown error while loading this period!');
        })
    }, [ periodId ]);

    return (
        <div>
            { errorMessage && <p className="alert aler-danger">{ errorMessage }</p> }
            { (!errorMessage && period !== null) &&
            <>
                <h1 className="h3">Termin: {new Date(period.period).toLocaleString()}</h1>
                <table className="table table-sm table-hover user-list">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Puno ime</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { period?.users?.map(user => (
                            <tr key={"user-" + user.user.userId}>
                                <td>{user.user.userId}</td>
                                <td>{user.user.email}</td>
                                <td>{user.user.firstName + " " + user.user.lastName}</td>
                                <td>
                                    {!user.isCanceled &&
                                        <button className="btn btn-sm btn-danger">Otkaži</button>
                                    }
                                    {user.isCanceled &&
                                       <span>Otkazan</span>
                                    }
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </>
            }
        </div>
        
    );
}