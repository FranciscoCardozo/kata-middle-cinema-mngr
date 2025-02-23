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
        this.movie_description = request.movieDescription;
        this.movie_duration = request.movieDuration;
        this.movie_title = request.movieTitle;
        this.movie_score = request.movieScore;
        this.movie_img_path = request.movieImgPath;
        this.movie_id = request.movieId;
        this.movie_genre = request.movieGenre;
        UtilsValidations.assignDefinedProperties(this);
    }
    
    public getDynamoObject(){
        return Object.entries(this).map(([key, value]) => {
            return UtilsValidations.validationMapper(key, value);
        });
    }
}
