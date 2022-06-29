import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
import IWebsiteContent from '../../../models/IWebsiteContent.model';
export default function RulesAndGuidesPage() {
    const [websiteContent, setWebsiteContent] = useState<IWebsiteContent|null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {

        api("get", "/api/website-content", "user")
            .then(apiResponse => {
                if(apiResponse.status === "ok"){
                    console.log(apiResponse.data.swimmingPoolRules)
                    return setWebsiteContent(apiResponse.data);
                }
            })
            .catch(error => {
                setErrorMessage(error?.message ?? "Unknown error occured while loading periods.")
            });
            
        }, []);

    return (
        <div className='mt-4'>
            <h1 className='h4 mb-3'>Pravila ponašanja na bazenu</h1>
            {websiteContent?.swimmingPoolRules.split("\n").map(string => (
                <p key={"string-" + Math.random()}>{string}</p>
            ))
            }
            
            <h1 className='h4 mt-5'>Uputstvo za rezervacuju termina</h1>
            <p>{websiteContent?.periodReservationGuide}</p>
        </div>
    );
}