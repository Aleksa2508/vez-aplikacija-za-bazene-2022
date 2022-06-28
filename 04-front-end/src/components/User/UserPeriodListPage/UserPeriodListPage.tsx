import { useEffect, useState } from "react";
import IPeriod from "../../../models/IPeriod.model";
import { api } from '../../../api/api';
import AuthStore from "../../../stores/AuthStore";



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

   
        }, [periods]);       

        function doMakeAReservation(periodId: number) {
            api("post", "/api/period/" + periodId, "user", {
                userId: AuthStore.getState().id,  // treba napraviti rezervaciju za ulogovanog korisnika
            })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage(res.data + "");
                }
                alert("Termin rezervisan");
                // redirect do MyPeriods
            });
        }
        function isUserAlreadyInAPeriod(periodId: number): boolean{
            let booleanToReturn: boolean = false;
            const period: IPeriod = periods.find(period => period.periodId === periodId) as IPeriod;
            if(period.users !== undefined) {
                for(let user of period.users){
                    if(user.user.userId === AuthStore.getState().id) {
                        return booleanToReturn = true;
                    }
                }
            }
            return booleanToReturn;
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
                                {(period.emptySpots > 0 && !isUserAlreadyInAPeriod(period.periodId)) &&
                                    <button className="btn btn-primary btn-sm" onClick={() => doMakeAReservation(period.periodId)}>Rezerviši</button>  // Dugme treba da se sakrije ukoliko je korisnik vec rezervisao termin
                                }
                                {period.emptySpots <= 0 &&
                                    <span>Termin je pun.</span>  
                                }
                                {isUserAlreadyInAPeriod(period.periodId) &&
                                    <span>Termin je rezervisan.</span>
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