import UtilsValidations from "../utils/utilsValidations";

export default class RequestConfirmDTO {
    
    public uuid?: string;
    public date?: number;
    public first_name?: string;
    public second_name?: string;
    public surname?: string;
    public second_surname?: string;
    public email?: string;  
    public phone?: string;
    public room_id?: string;
    public movie_id?: string;
    public seats_reserved?: String;

    constructor(request: any){
            this.uuid = request.uuid;
            this.date = request.date;
            this.first_name = request.firstName;
            this.second_name = request.secondName;
            this.surname = request.surname;
            this.second_surname = request.secondSurname;
            this.email = request.email;
            this.phone = request.phone;
            this.room_id = request.roomId;
            this.movie_id = request.movieId;
            this.seats_reserved = request.seatsReserved;
        }
    
    public getDynamoObject(){
        console.log(this);
        return Object.entries(this)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
            return UtilsValidations.validationMapper(key, value);
        });
    }
}
