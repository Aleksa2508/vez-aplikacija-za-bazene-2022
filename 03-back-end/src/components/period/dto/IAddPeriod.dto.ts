import Ajv from 'ajv';
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export default interface IAddPeriod extends IServiceData {
    period: Date
}

export interface IAddPeriodDto {
    period: Date
}

export interface IPeriodUser extends IServiceData {
    period_id: number;
    user_id: number;
    
    is_canceled?: number;
}

const AddPeriodSchema = {
    type: "object",
    properties: {
        period: {
            type: "string",
            pattern: "date-time",
        }
    },
    required: [
        "period",
    ],
    additionalProperties: false,
}

const AddPeriodValitator = ajv.compile(AddPeriodSchema);

export {AddPeriodValitator};
