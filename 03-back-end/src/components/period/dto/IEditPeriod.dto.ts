import Ajv from 'ajv';
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export default interface IEditPeriod extends IServiceData {
    period: Date
}

export interface IEditPeriodDto {
    period: Date
}

const EditPeriodSchema = {
    type: "object",
    properties: {
        period: {
            type: "string",
            pattern: "date-time",
        },
        
    },
    required: [
       "period"
    ],
    additionalProperties: false,
}

const EditPeriodValitator = ajv.compile(EditPeriodSchema);

export {EditPeriodValitator};
