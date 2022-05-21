import Ajv from 'ajv';


const ajv = new Ajv();

export default interface IAddAdministrator {
    username: string;
    passwordHash: string;
} 

const AddAdministratorSchema = {
    type: "object",
    properties: {
        username: {
            type: "string",
            minLength: 5,
            maxLength: 32
        },
        passwordHash: {
            type: "string",
            minLength: 8,
            maxLength: 128
        }
    },
    required: [
        "username",
        "passwordHash"
    ],
    additionalProperties: false
}

const AddAdministratorValitator = ajv.compile(AddAdministratorSchema);

export {AddAdministratorValitator};
