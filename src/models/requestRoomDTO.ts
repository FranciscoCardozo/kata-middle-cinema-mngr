import UtilsValidations from "../utils/utilsValidations";

export default class RequestRoomDTO {
    
    public room_id: string;
    public room_capacity: number;
    public room_name: string;
    public room_reservations: string;
    public room_reservate_hours: string;

    constructor(request: any){
        this.room_id = request.roomId;
        this.room_capacity = request.roomCapacity;
        this.room_name = request.roomName;
        this.room_reservations = request.roomReservations;
        this.room_reservate_hours = request.roomReservationHour;
    }

    public getDynamoObject(){
        const dynamoObject = {
            'room_id': { S: this.room_id },
            'room_capacity': { N: this.room_capacity },
            'room_name': { S: this.room_name },
            'room_reservations': { S: this.room_reservations },
            'room_reservate_hours': {S: this.room_reservate_hours}
        };

        return UtilsValidations.removeEmptyElements(dynamoObject);
    }
}
