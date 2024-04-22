export type MovieDto = {
    title:string;
    episode_id:Number;
    director:string;
    producer:string;
    release_date:Date;
}

export type UpdateDto = {
    episode_id:Number;
    update:UpdateMovieDto
}
export type UpdateMovieDto = {
    title?:string;
    episode_id?:Number;
    director?:string;
    producer?:string;
    release_date?:Date;
}
export type DeleteMovieDto = {
    episode_id:Number;
}