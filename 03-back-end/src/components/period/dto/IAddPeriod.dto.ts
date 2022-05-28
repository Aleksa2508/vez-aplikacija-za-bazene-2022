import Ajv from 'ajv';
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export default interface IAddPeriod extends IServiceData {
    period: string
}

export interface IAddPeriodDto {
    period: string
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
            //pattern: "",
        }
    },
    required: [
        "period",
    ],
    additionalProperties: false,
}

const AddPeriodValitator = ajv.compile(AddPeriodSchema);

export {AddPeriodValitator};
