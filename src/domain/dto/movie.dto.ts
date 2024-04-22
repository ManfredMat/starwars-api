import { Date } from "mongoose";

export type MovieDto = {
    title:string;
    episode_id:Number;
    director:string;
    producer:string;
    release_date:Date;
}

export type UpdateDto = {
    title:string;
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
    title:string;
}