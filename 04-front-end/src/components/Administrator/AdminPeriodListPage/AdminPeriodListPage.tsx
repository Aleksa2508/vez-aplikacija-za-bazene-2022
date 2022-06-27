import { useState, useEffect } from 'react';
import IPeriod from '../../../models/IPeriod.model';
import { api } from '../../../api/api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

export default function AdminPeriodListPage() {
      
    const [periods, setPeriods] = useState<IPeriod[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [ newPeriodDate, setNewPeriodDate ] = useState<string>("");
    
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

   
        }, [periods]);    
        
        function doAddNewPeriod(){
            api("post", "/api/period/", "administrator", {
                period: newPeriodDate,  
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
        { !errorMessage && <>
            <table className="table table-sm table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Datum</th>
                        <th>Vreme</th>
                        <th>Broj slobodnih mesta</th>
                        <th>Rezervacije</th>
                    </tr>
                </thead>
                <tbody>
                {periods.map(period => (
                        <tr key={"period-" + period.periodId}>
                            <td>{period.periodId}</td>
                            <td>{new Date(period.period).toLocaleDateString('en-US', {timeZone: 'Europe/London'})}</td>
                            <td>{new Date(period.period).toLocaleTimeString('en-US', {timeZone: 'Europe/London'})}</td>
                            <td>{period.emptySpots}</td>
                            <td>
                                <Link className="btn btn-primary btn-sm" to={"/admin/period/" + period.periodId}>Pogledaj rezervacije</Link>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
            <div className=''>
                
                <input min={new Date().toISOString().slice(0, 16)} type="datetime-local" className="form-control form-control-sm"  value={ newPeriodDate } onChange={ e => setNewPeriodDate(e.target.value) } />
                <button className="btn btn-md btn-success mt-2" onClick={() => doAddNewPeriod()}><FontAwesomeIcon icon={ faSquarePlus } />  Napravi novi termin</button>
            </div>
            
            </>
        }
    </div>
    );
}