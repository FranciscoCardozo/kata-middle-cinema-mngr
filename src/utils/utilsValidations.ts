export default class UtilsValidations{

    public static removeEmptyElements(object: any){
        Object.entries(object).forEach(([key, value]) => {
            Object.entries(value as any).some(([subkey, subvalue]) => {
                if (!subvalue) {
                    delete (object as any)[key];
                }
            });
        });
        return object;
    }
    public static mapReservationsList(roomsResponse: any[]){
        return roomsResponse.map(room => {
            return {
                room_id: room.room_id,
                room_capacity: room.room_capacity,
                room_reservations: room.room_reservations
            }
        });
    }

    public static mapCustomBody(reqBody:any){
        return {
            roomId: reqBody.roomId,
            roomReservations:reqBody.seatsReserved
        }
    }
}