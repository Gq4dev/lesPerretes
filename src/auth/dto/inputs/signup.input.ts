import { Field, InputType } from "@nestjs/graphql"
import { MinLength, IsEmail, IsNotEmpty } from "class-validator"

@InputType()
export class SignupInput {

    @IsEmail()
    @Field(() => String)
    email: string

    @IsNotEmpty()
    @Field(() => String)
    fullName: string

    @MinLength(6)
    @Field(() => String)
    password: string
}