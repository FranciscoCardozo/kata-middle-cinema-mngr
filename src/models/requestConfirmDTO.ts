import UtilsValidations from "../utils/utilsValidations";
import DynamoService from '../services/dynamoService/dynamo.service';

export default class RequestConfirmDTO {
    
    public uuid: string;
    public date: number;
    public first_name: string;
    public second_name: string;
    public surname: string;
    public second_surname: string;
    public email: string;  
    public phone: string;
    public room_id: string;
    public movie_id: string;
    public seats_reserved: String;

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
        const dynamoObject = {
            'uuid': { S: this.uuid },
            'date': { S: this.date },
            'first_name': {S: this.first_name},
            'second_name': {S: this.second_name},
            'surname': {S: this.surname},
            'second_surname': {S: this.second_surname},
            'email': {S: this.email},
            'phone': {S: this.phone},
            'room_id': {S: this.room_id},
            'movie_id': {S: this.movie_id},
            'seats_reserved': {S: this.seats_reserved}
        }
        return UtilsValidations.removeEmptyElements(dynamoObject);
    }
}
