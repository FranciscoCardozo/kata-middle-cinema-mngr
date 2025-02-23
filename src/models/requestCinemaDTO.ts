import UtilsValidations from "../utils/utilsValidations";

export default class RequestCinemaDTO {
    public movie_title?: string;
    public movie_description?: string;
    public movie_duration?: string;
    public movie_score?: string;
    public movie_img_path?: string;
    public movie_id?: string;
    public movie_genre?: string;

    constructor(request: any){
        UtilsValidations.assignDefinedProperties(this, request);
    }
    
    public getDynamoObject(){
        return Object.entries(this).map(([key, value]) => {
            return UtilsValidations.validationMapper(key, value);
        });
    }
}
