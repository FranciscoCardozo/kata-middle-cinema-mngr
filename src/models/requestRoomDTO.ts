import UtilsValidations from "../utils/utilsValidations";

export default class RequestRoomDTO {
    
    public room_id?: string;
    public room_capacity?: number;
    public room_name?: string;
    public room_reservations?: string;

    constructor(request: any){
        this.room_id = request.roomId;
        this.room_capacity = request.roomCapacity;
        this.room_name = request.roomName;
        this.room_reservations = request.roomReservation;
        UtilsValidations.assignDefinedProperties(this);
    }

    public getDynamoObject(){
        return Object.entries(this).map(([key, value]) => {
            return UtilsValidations.validationMapper(key, value);
        });
    }
}
