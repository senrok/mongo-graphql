import { Field, GraphQLTimestamp, InputType } from "@nestjs/graphql";
import { IsBoolean, IsDate, IsOptional } from "class-validator";
import { FilterFieldComparison } from "../../interfaces";
import { Class } from "../../common";
import { IsUndefined } from "../validators";

/** @internal */
let timestampFieldComparison: Class<FilterFieldComparison<Date>>;

/** @internal */
export function getOrCreateTimestampFieldComparison(): Class<
  FilterFieldComparison<Date>
> {
  if (timestampFieldComparison) {
    return timestampFieldComparison;
  }

  @InputType()
  class TimestampFieldComparison implements FilterFieldComparison<Date> {
    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    _exists?: boolean;

    @Field(() => GraphQLTimestamp, { nullable: true })
    @IsUndefined()
    @IsDate()
    _eq?: Date;

    @Field(() => GraphQLTimestamp, { nullable: true })
    @IsUndefined()
    @IsDate()
    _ne?: Date;

    @Field(() => GraphQLTimestamp, { nullable: true })
    @IsUndefined()
    @IsDate()
    _gt?: Date;

    @Field(() => GraphQLTimestamp, { nullable: true })
    @IsUndefined()
    @IsDate()
    _gte?: Date;

    @Field(() => GraphQLTimestamp, { nullable: true })
    @IsUndefined()
    @IsDate()
    _lt?: Date;

    @Field(() => GraphQLTimestamp, { nullable: true })
    @IsUndefined()
    @IsDate()
    _lte?: Date;

    @Field(() => [GraphQLTimestamp], { nullable: true })
    @IsUndefined()
    @IsDate({ each: true })
    _in?: Date[];

    @Field(() => [GraphQLTimestamp], { nullable: true })
    @IsUndefined()
    @IsDate({ each: true })
    _nin?: Date[];

    @Field(() => [GraphQLTimestamp], { nullable: true })
    @IsUndefined()
    @IsDate({ each: true })
    _all?: Date[];

    @Field(() => GraphQLTimestamp, { nullable: true })
    @IsUndefined()
    @IsDate({ each: true })
    _elemMatch?: Date;
  }

  timestampFieldComparison = TimestampFieldComparison;
  return timestampFieldComparison;
}
