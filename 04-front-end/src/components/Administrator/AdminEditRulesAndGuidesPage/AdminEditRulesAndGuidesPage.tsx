import { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import IWebsiteContent from '../../../models/IWebsiteContent.model';
export default function AdminEditRulesAndGuidesPage() {
    const [websiteContent, setWebsiteContent] = useState<IWebsiteContent|null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [swimmingPoolRules, setSwimmingPoolRules] = useState<string>("");
    const [periodReservationGuide, setPeriodReservationGuide] = useState<string>("");
    

    useEffect(() => {

        api("get", "/api/website-content", "administrator")
            .then(apiResponse => {
                if(apiResponse.status === "ok"){
                    return setWebsiteContent(apiResponse.data);
                }
            })
            .catch(error => {
                setErrorMessage(error?.message ?? "Unknown error occured while loading periods.")
            });
            
        }, []);

        function doEditWebsiteContent(){
            let dataToEdit: any = {};

            if(swimmingPoolRules !== ""){
               dataToEdit.swimmingPoolRules = swimmingPoolRules;
               setSwimmingPoolRules("");
            }

            if(periodReservationGuide !== ""){
                dataToEdit.periodReservationGuide = periodReservationGuide;
                setPeriodReservationGuide("");
            }

            

            console.log(dataToEdit);

            api("put", "/api/website-content", "administrator", dataToEdit)
                .then(apiResponse => {
                    if(apiResponse.status === "ok"){
                        return setWebsiteContent(apiResponse.data);
                    }
                })
                .catch(error => {
                    setErrorMessage(error?.message ?? "Unknown error occured while loading periods.")
                });
        }

    return (
        <div className='mt-4'>
            <h1 className='h4 mb-4'>Uredi pravila ponašanja na bazenu:</h1>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-text">Pravila ponašanja na bazenu</span>
                    <textarea className="form-control form-control-sm" rows={ 10 }
                                    value={ swimmingPoolRules }
                                    onChange={ e => setSwimmingPoolRules(e.currentTarget.value) }
                                    />
                </div>
            </div>
            <strong>Trenutno:</strong>
            {websiteContent?.swimmingPoolRules !== undefined && websiteContent?.swimmingPoolRules.split("\n").map(string => (
                <p key={"string-" + Math.random()}>{string}</p>
            ))
            }
           
            <br/>
            <br/>
            <h1 className='h4 mb-4'>Uredi uputstvo za rezervaciju termina:</h1>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-text">Uputstvo za rezervaciju termina</span>
                    <textarea className="form-control form-control-sm" rows={ 5 }
                                    value={ periodReservationGuide }
                                    onChange={ e => setPeriodReservationGuide(e.currentTarget.value) }
                                    />
                </div>
            </div>
            <span><strong>Trenutno:</strong><br/> {websiteContent?.periodReservationGuide}</span>
            <br/>
            <br/>
            
          
            
            <div className="form-group mb-3">
                <button className="btn btn-primary px-5" onClick={() => doEditWebsiteContent()}>Sačuvaj</button>
            </div>
        </div>
    );
}