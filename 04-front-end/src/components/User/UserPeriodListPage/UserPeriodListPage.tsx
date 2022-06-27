import { useEffect, useState } from "react";
import IPeriod from "../../../models/IPeriod.model";
import { api } from '../../../api/api';
import { spawn } from "child_process";


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

        function doMakeAReservation(periodId: number) {
            api("post", "/api/period/" + periodId, "user", {
                userId: 2,  // treba napraviti rezervaciju za ulogovanog korisnika
            })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage(res.data + "");
                }
                alert("Termin rezervisan");
                // redirect do MyPeriods
            });
        }
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
                {periods.filter(period => new Date(period.period) > new Date(Date.now())).map(period => (
                        <tr key={"period-" + period.periodId}>
                            <td>{new Date(period.period).toLocaleDateString('en-US', {timeZone: 'Europe/London'})}</td>
                            <td>{new Date(period.period).toLocaleTimeString('en-US', {timeZone: 'Europe/London'})}</td>
                            <td>{period.emptySpots}</td>
                            <td>
                                {period.emptySpots > 0 &&
                                    <button className="btn btn-primary btn-sm" onClick={() => doMakeAReservation(period.periodId)}>Rezerviši</button>  // Dugme treba da se sakrije ukoliko je korisnik vec rezervisao termin
                                }
                                {period.emptySpots <= 0 &&
                                    <span>Termin je pun.</span>  
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