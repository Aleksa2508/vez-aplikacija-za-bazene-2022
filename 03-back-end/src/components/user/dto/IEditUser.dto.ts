import Ajv from 'ajv';
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export default interface IEditUser extends IServiceData {
    password_hash?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    is_active?: number;
    activation_code?: string;
    password_reset_code?: string;
}

export interface IEditUserDto {
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    isActive?: boolean;
}

const EditUserSchema = {
    type: "object",
    properties: {
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
            //pattern: "^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
        },
        isActive: {
            type: "boolean",
        }
    },
    required: [],
    additionalProperties: false,
}

const EditUserValitator = ajv.compile(EditUserSchema);

export {EditUserValitator};
