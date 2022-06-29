import { useState, useEffect } from 'react';
import IContactInfo from '../../../models/IContactInfo.model';
import { api } from '../../../api/api';
export default function ContactPage() {

    const [contactInfo, setContactInfo] = useState<IContactInfo|null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {

        api("get", "/api/contact-info", "user")
            .then(apiResponse => {
                if(apiResponse.status === "ok"){
                    return setContactInfo(apiResponse.data);
                }
            })
            .catch(error => {
                setErrorMessage(error?.message ?? "Unknown error occured while loading periods.")
            });
            
        }, []);

    return (
        <div className='mt-4'>
            <h1 className='h4'>Kontakt</h1>
            <span><strong>Broj telefona:</strong> {contactInfo?.phone}</span> <br/>
            <span><strong>Email:</strong> {contactInfo?.email}</span> <br/>
            <span><strong>Adresa:</strong> {contactInfo?.address}</span> <br/>
        </div>
    );
}