export default class RequestCinemaDTO {
    public movie_title: string;
    public movie_description: string;
    public movie_duration: string;
    public movie_score: string;
    public movie_img_path: string;
    public movie_id: string;
    public movie_genre: string;

    constructor(request: any){
        this.movie_title = request.movieTitle;
        this.movie_description = request.movieDescription;
        this.movie_duration = request.movieDuration;
        this.movie_score = request.movieScore;
        this.movie_img_path = request.movieImgPath;
        this.movie_id = request.movieId;
        this.movie_genre = request.movieGenre;
    }

    public getDynamoObject(){
        return {
            'movie_id': { S: this.movie_id },
            'movie_title': { S: this.movie_title },
            'movie_description': { S: this.movie_description },
            'movie_duration': { S: this.movie_duration },
            'movie_score': { S: this.movie_score },
            'movie_img_path': { S: this.movie_img_path },
            'movie_genre': { S: this.movie_genre }
        };
    }
}
