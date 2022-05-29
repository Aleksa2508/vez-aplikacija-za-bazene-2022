import Ajv from 'ajv';
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export default interface IEditPeriod extends IServiceData {
    period: string
}

export interface IEditPeriodDto {
    period: string
}

const EditPeriodSchema = {
    type: "object",
    properties: {
        period: {
            type: "string",
            //pattern: "",
        },
        
    },
    required: [
       "period"
    ],
    additionalProperties: false,
}

const EditPeriodValitator = ajv.compile(EditPeriodSchema);

export {EditPeriodValitator};
