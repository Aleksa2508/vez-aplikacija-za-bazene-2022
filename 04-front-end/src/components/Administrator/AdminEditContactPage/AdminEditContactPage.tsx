import { useEffect, useState } from 'react';
import { api } from '../../../api/api';
import IContactInfo from '../../../models/IContactInfo.model';
export default function AdminEditContactPage() {
    const [contactInfo, setContactInfo] = useState<IContactInfo|null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    useEffect(() => {

        api("get", "/api/contact-info", "administrator")
            .then(apiResponse => {
                if(apiResponse.status === "ok"){
                    return setContactInfo(apiResponse.data);
                }
            })
            .catch(error => {
                setErrorMessage(error?.message ?? "Unknown error occured while loading periods.")
            });
            
        }, []);

        function doEditContactInfo(){
            let dataToEdit: any = {};

            if(phone !== ""){
               dataToEdit.phone = phone;
            }

            if(email !== ""){
                dataToEdit.email = email;
            }

            if(address !== ""){
                dataToEdit.address = address;
            }

            console.log(dataToEdit);

            api("put", "/api/contact-info", "administrator", dataToEdit)
                .then(apiResponse => {
                    if(apiResponse.status === "ok"){
                        return setContactInfo(apiResponse.data);
                    }
                })
                .catch(error => {
                    setErrorMessage(error?.message ?? "Unknown error occured while loading periods.")
                });
        }

    return (
        <div className='mt-4'>
            <h1 className='h4 mb-4'>Uredi kontakt informacije:</h1>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-text">Broj telefona</span>
                    <input className="form-control" type="text" placeholder="Promenite broj telefona"  value={phone} onChange={e => setPhone(e.currentTarget.value)}/>
                </div>
            </div>
            <span><strong>Trenutno:</strong> {contactInfo?.phone}</span>
            <br/>
            <br/>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-text">Email</span>
                    <input className="form-control" type="text" placeholder="Promenite email"  value={email} onChange={e => setEmail(e.currentTarget.value)}/>
                </div>
            </div>
            <span><strong>Trenutno:</strong> {contactInfo?.email}</span>
            <br/>
            <br/>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-text">Adresa</span>
                    <input className="form-control" type="text" placeholder="Promenite adresu"  value={address} onChange={e => setAddress(e.currentTarget.value)}/>
                </div>
            </div>
            <span><strong>Trenutno:</strong> {contactInfo?.address}</span>
            <br/>
            <br/>
            <div className="form-group mb-3">
                <button className="btn btn-primary px-5" onClick={() => doEditContactInfo()}>Sačuvaj</button>
            </div>
        </div>
    );
}