import Ajv from 'ajv';
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export default interface IAddUser extends IServiceData {
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    phone_number: string;
}

export interface IAddUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

const AddUserSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
        },
        password: {
            type: "string",
            pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$",
        },
        firstName: {
            type: "string"
        },
        lastName: {
            type: "string"
        },
        phoneNumber: {
            type: "string"
        }
    },
    required: [
        "email",
        "password",
        "firstName",
        "lastName",
        "phoneNumber"
    ],
    additionalProperties: false,
}

const AddUserValitator = ajv.compile(AddUserSchema);

export {AddUserValitator};
