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
    }, [ periodId, period ]);

    function doCancelReservation(periodId: number, userId: number){
        api("put", "/api/period/" + periodId + "/cancel", "administrator", {
            userId: userId,  
        })
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }
            //alert("Termin otkazan");
        });
    }

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
                            <th>Opcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        { period?.users?.map(user => (
                            <tr key={"user-" + user.user.userId}>
                                <td>{user.user.userId}</td>
                                <td>{user.user.email}</td>
                                <td>{user.user.firstName + " " + user.user.lastName}</td>
                                <td>
                                    
                                    {(!user.isCanceled && new Date(period.period) < new Date(Date.now())) &&
                                       <span>Završen</span>
                                    }
                                    {(!user.isCanceled && new Date(period.period) > new Date(Date.now())) &&
                                       <span>Aktivan</span>
                                    }
                                    {user.isCanceled &&
                                       <span>Otkazan</span>
                                    }
                                </td>
                                <td>
                                    {(!user.isCanceled && new Date(period.period) > new Date(Date.now())) &&
                                        <button className="btn btn-sm btn-danger" onClick={() => doCancelReservation(period.periodId, user.user.userId)}>Otkaži</button>
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