import { useEffect, useState } from "react";
import { api } from '../../../api/api';
import { IUserPeriod } from "../../../models/IUser.model";
import AuthStore from "../../../stores/AuthStore";



export default function MyPeriodsPage() {
    
    const [periods, setPeriods] = useState<IUserPeriod[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {

        api("get", "/api/user/" + AuthStore.getState().id, "user")
            .then(apiResponse => {
                if(apiResponse.status === "ok"){
                    return setPeriods(apiResponse.data?.periods);
                }
            })
            .catch(error => {
                setErrorMessage(error?.message ?? "Unknown error occured while loading periods.")
            });
            
        }, [periods]);
        
        
         
    function doCancelReservation(periodId: number){
        api("put", "/api/period/" + periodId + "/cancel", "user", {
            userId: AuthStore.getState().id,  
        })
        .then(res => {
            if (res.status === 'error') {
                return setErrorMessage(res.data + "");
            }
            
        });
    }
        
    return (
        
        <div>
        { errorMessage && <p className="alert alert-danger">{ errorMessage }</p> }
        { !errorMessage &&
            <table className="table table-sm table-hover">
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Vreme</th>
                        <th>Status</th>
                        <th>Opcije</th>
                    </tr>
                </thead>
                <tbody>
                {periods.map(period => (
                       
                        <tr key={"period-" + period.period.periodId}>
                            <td>{new Date(period.period.period).toLocaleDateString('en-US', {timeZone: 'Europe/London'})}</td>
                            <td>{new Date(period.period.period).toLocaleTimeString('en-US', {timeZone: 'Europe/London'})}</td>
                            <td>
                                { period.isCanceled && <span>Otkazan</span> }
                                { (new Date(period.period.period) < new Date(Date.now()) && !period.isCanceled) && <span>Završen</span> }
                                { (new Date(period.period.period) > new Date(Date.now()) && !period.isCanceled) && <span>Aktivan</span> }
                            </td>
                            <td>
                                { (!period.isCanceled && (new Date(period.period.period) > new Date(Date.now()))) &&
                                    <button className="btn btn-danger btn-sm" onClick={() => doCancelReservation(period.period.periodId)}>Otkaži</button>
                                }
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        }
    </div>
    );
}