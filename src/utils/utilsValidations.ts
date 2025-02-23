export default class UtilsValidations{
    public static validationMapper(key: string, value: any) {
        if (typeof value === "string") return { [key]: { S: value } };
        if (typeof value === "number") return { [key]: { N: value.toString() } };
        if (Array.isArray(value)) return { [key]: { L: value.map(v => ({ S: v.toString() })) } };
        return { [key]: { S: value.toString() } };
    }

    public static assignDefinedProperties(instance: any) {
        Object.entries(this).forEach(([key, value]) => {
            if (value !== undefined) {
                instance[key] = value;
            }
        });
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