import { Field, GraphQLISODateTime, InputType } from "@nestjs/graphql";
import { IsBoolean, IsDate, IsOptional } from "class-validator";
import { FilterFieldComparison } from "../../interfaces";
import { Class } from "../../common";
import { IsUndefined } from "../validators";

/** @internal */
let dateFieldComparison: Class<FilterFieldComparison<Date>>;

/** @internal */
export function getOrCreateDateFieldComparison(): Class<
  FilterFieldComparison<Date>
> {
  if (dateFieldComparison) {
    return dateFieldComparison;
  }

  @InputType("DateFieldComparison")
  class DateFieldComparison implements FilterFieldComparison<Date> {
    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    _exists?: boolean;

    @Field(() => GraphQLISODateTime, { nullable: true })
    @IsUndefined()
    @IsDate()
    _eq?: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    @IsUndefined()
    @IsDate()
    _ne?: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    @IsUndefined()
    @IsDate()
    _gt?: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    @IsUndefined()
    @IsDate()
    _gte?: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    @IsUndefined()
    @IsDate()
    _lt?: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    @IsUndefined()
    @IsDate()
    _lte?: Date;

    @Field(() => [GraphQLISODateTime], { nullable: true })
    @IsUndefined()
    @IsDate({ each: true })
    _in?: Date[];

    @Field(() => [GraphQLISODateTime], { nullable: true })
    @IsUndefined()
    @IsDate({ each: true })
    _nin?: Date[];

    @Field(() => [GraphQLISODateTime], { nullable: true })
    @IsUndefined()
    @IsDate({ each: true })
    _all?: Date[];

    @Field(() => GraphQLISODateTime, { nullable: true })
    @IsUndefined()
    @IsDate({ each: true })
    _elemMatch?: Date;
  }

  dateFieldComparison = DateFieldComparison;
  return dateFieldComparison;
}
