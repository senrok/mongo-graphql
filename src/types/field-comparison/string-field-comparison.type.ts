import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { Class } from "../../common";
import { FilterFieldComparison } from "../../interfaces";
import { IsUndefined } from "../validators";

/** @internal */
let stringFieldComparison: Class<FilterFieldComparison<string>>;

/** @internal */
export function getOrCreateStringFieldComparison(): Class<
  FilterFieldComparison<string>
> {
  if (stringFieldComparison) {
    return stringFieldComparison;
  }

  @InputType()
  class StringFieldComparison implements FilterFieldComparison<string> {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    _regex?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    _eq?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    _ne?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    _gt?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    _gte?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    _lt?: string;

    @Field({ nullable: true })
    @IsString()
    @IsUndefined()
    _lte?: string;

    @Field(() => [String], { nullable: true })
    @IsUndefined()
    @IsString({ each: true })
    _in?: string[];

    @Field(() => [String], { nullable: true })
    @IsUndefined()
    @IsString({ each: true })
    _nin?: string[];

    @Field(() => [String], { nullable: true })
    @IsUndefined()
    @IsString({ each: true })
    _all?: string[];

    @Field(() => String, { nullable: true })
    @IsUndefined()
    @IsString({ each: true })
    _elemMatch?: string;
  }

  stringFieldComparison = StringFieldComparison;
  return stringFieldComparison;
}
