import { useEffect, useState } from "react";
import { api } from '../../../api/api';
import { IUserPeriod } from "../../../models/IUser.model";



export default function MyPeriodsPage() {
    
    const [periods, setPeriods] = useState<IUserPeriod[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {

        api("get", "/api/user/2", "user")
            .then(apiResponse => {
                if(apiResponse.status === "ok"){
                    return setPeriods(apiResponse.data?.periods);
                }
            })
            .catch(error => {
                setErrorMessage(error?.message ?? "Unknown error occured while loading periods.")
            });
            
        }, [periods]);    
         
        
        
    return (
        
        <div>
        { errorMessage && <p className="alert alert-danger">{ errorMessage }</p> }
        { !errorMessage &&
            <table className="table table-sm table-hover">
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Vreme</th>
                        <th>Otkaži</th>
                    </tr>
                </thead>
                <tbody>
                {periods.map(period => (
                       
                        <tr key={"period-" + period.period.periodId}>
                            <td>{new Date(period.period.period).toLocaleDateString()}</td>
                            <td>{new Date(period.period.period).toLocaleTimeString()}</td>
                            <td>
                                { period.isCanceled && <span>Otkazan</span> }
                                { !period.isCanceled &&
                                <button className="btn btn-danger btn-sm">Otkaži</button>}
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        }
    </div>
    );
}