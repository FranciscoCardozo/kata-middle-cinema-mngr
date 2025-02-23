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
            UtilsValidations.assignDefinedProperties(this, request);
        }
    
    public getDynamoObject(){
        return Object.entries(this).map(([key, value]) => {
            return UtilsValidations.validationMapper(key, value);
        });
    }
}
