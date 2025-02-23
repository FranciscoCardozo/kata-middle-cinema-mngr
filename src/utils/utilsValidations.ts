export default class UtilsValidations{

    public static removeEmptyElements(object: any){
        Object.entries(object).forEach(([key, value]) => {
            Object.entries(value as any).some(([subkey, subvalue]) => {
                console.log(subvalue, subkey === undefined, key);
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
                room_reservations: room.room_reservations.length >= 1? room.room_reservations: 'No Room Reservations'
            }
        });
    }
}