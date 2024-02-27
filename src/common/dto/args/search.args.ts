import { ArgsType, Field } from "@nestjs/graphql"
import { IsOptional, IsString } from "class-validator"
import { PaginationArgs } from "./pagination.args"

@ArgsType()
export class SearchArgs {

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    search?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    startDate?: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    endDate?: string
}