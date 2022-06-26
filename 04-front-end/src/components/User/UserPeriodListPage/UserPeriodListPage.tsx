import { useEffect, useState } from "react";
import IPeriod from "../../../models/IPeriod.model";
import { api } from '../../../api/api';


export default function UserPeriodListPage() {
    
    const [periods, setPeriods] = useState<IPeriod[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    
    useEffect(() => {

        api("get", "/api/period", "user")
            .then(apiResponse => {
                if(apiResponse.status === "ok"){
                    return setPeriods(apiResponse.data);
                }
            })
            .catch(error => {
                setErrorMessage(error?.message ?? "Unknown error occured while loading periods.")
            });

   
        }, []);       
    return (
        
        <div>
        { errorMessage && <p className="alert aler-danger">{ errorMessage }</p> }
        { !errorMessage &&
            <table className="table table-sm table-hover">
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Vreme</th>
                        <th>Broj slobodnih mesta</th>
                        <th>Rezerviši</th>
                    </tr>
                </thead>
                <tbody>
                {periods.map(period => (
                        <tr key={"period-" + period.periodId}>
                            <td>{new Date(period.period).toLocaleDateString()}</td>
                            <td>{new Date(period.period).toLocaleTimeString()}</td>
                            <td>{period.emptySpots}</td>
                            <td>
                                <button className="btn btn-primary btn-sm">Rezerviši</button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        }
    </div>
    );
}