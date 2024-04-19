import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    episode_id: Number;

    @Prop({ required: true })
    director: string;

    @Prop({ required: true })
    producer: string;

    @Prop({ required: true })
    realese_date: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);