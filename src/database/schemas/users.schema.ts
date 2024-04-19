import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    id: UUID;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);