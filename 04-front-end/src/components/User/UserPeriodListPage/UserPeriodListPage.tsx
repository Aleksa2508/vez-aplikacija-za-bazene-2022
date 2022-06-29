import { useEffect, useState } from "react";
import IPeriod from "../../../models/IPeriod.model";
import { api } from '../../../api/api';
import AuthStore from "../../../stores/AuthStore";
import { IUserPeriod } from "../../../models/IUser.model";



export default function UserPeriodListPage() {
    
    const [periods, setPeriods] = useState<IPeriod[]>([]);
    const [myPeriods, setMyPeriods] = useState<IUserPeriod[]>([]);
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
        api("get", "/api/user/" + AuthStore.getState().id, "user")
            .then(apiResponse => {
                if(apiResponse.status === "ok"){
                    return setMyPeriods(apiResponse.data?.periods);
                }
            })
            .catch(error => {
                setErrorMessage(error?.message ?? "Unknown error occured while loading periods.")
            });
            
        }, [periods]);   
       

        function doMakeAReservation(periodId: number) {
            api("post", "/api/period/" + periodId, "user", {
                userId: AuthStore.getState().id,  
            })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage(res.data + "");
                }
                
            });
        }
        
        function isUserAlreadyInAPeriod(periodId: number): boolean{
            let booleanToReturn: boolean = false;
           
                for(let period of myPeriods){
                    if(period.period.periodId === periodId) {
                        return booleanToReturn = true;
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
                {periods.filter(period => new Date(period.period) > new Date(Date.now())).sort((p1, p2) => new Date(p1.period).getTime() - new Date(p2.period).getTime()).map(period => (
                        <tr key={"period-" + period.periodId}>
                            <td>{new Date(period.period).toLocaleDateString('en-US', {timeZone: 'Europe/London'})}</td>
                            <td>{new Date(period.period).toLocaleTimeString('en-US', {timeZone: 'Europe/London'})}</td>
                            <td>{period.emptySpots}</td>
                            <td>
                                {(period.emptySpots > 0 && !isUserAlreadyInAPeriod(period.periodId)) &&
                                    <button className="btn btn-primary btn-sm" onClick={() => doMakeAReservation(period.periodId)}>Rezerviši</button>  
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