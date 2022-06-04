import Ajv from 'ajv';
import IServiceData from "../../../common/IServiceData.interface";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

export default interface IAddUser extends IServiceData {
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    activation_code: string;
}

export interface IRegisterUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

const RegisterUserSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
        },
        password: {
            type: "string",
            pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$",
        },
        firstName: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        lastName: {
            type: "string",
            minLength: 2,
            maxLength: 64,
        },
        phoneNumber: {
            type: "string",
           // pattern: "^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
        }
    },
    required: [
        "email",
        "password",
        "firstName",
        "lastName",
    ],
    additionalProperties: false,
}

const RegisterUserValitator = ajv.compile(RegisterUserSchema);

export {RegisterUserValitator};
