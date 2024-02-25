import { Field, InputType } from "@nestjs/graphql"
import { MinLength, IsEmail, IsNotEmpty } from "class-validator"

@InputType()
export class LoginInput {

    @IsEmail()
    @Field(() => String)
    email: string

    @MinLength(6)
    @Field(() => String)
    password: string
}