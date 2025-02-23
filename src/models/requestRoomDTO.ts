import UtilsValidations from "../utils/utilsValidations";

export default class RequestRoomDTO {
    
    public room_id?: string;
    public room_capacity?: number;
    public room_name?: string;
    public room_reservations?: string;

    constructor(request: any){
        UtilsValidations.assignDefinedProperties(this, request);
    }

    public getDynamoObject(){
        return Object.entries(this).map(([key, value]) => {
            return UtilsValidations.validationMapper(key, value);
        });
    }
}
