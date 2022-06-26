import { useState, useEffect } from 'react';
import IPeriod from '../../../models/IPeriod.model';
import { api } from '../../../api/api';
import { Link } from 'react-router-dom';
export default function AdminPeriodListPage() {
      
    const [periods, setPeriods] = useState<IPeriod[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    
    useEffect(() => {

        api("get", "/api/period", "administrator")
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
                        <th>Rezervacije</th>
                    </tr>
                </thead>
                <tbody>
                {periods.map(period => (
                        <tr key={"period-" + period.periodId}>
                            <td>{new Date(period.period).toLocaleDateString()}</td>
                            <td>{new Date(period.period).toLocaleTimeString()}</td>
                            <td>{period.emptySpots}</td>
                            <td>
                                <Link className="btn btn-primary btn-sm" to={"/admin/period/" + period.periodId}>Pogledaj rezervacije</Link>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        }
    </div>
    );
}