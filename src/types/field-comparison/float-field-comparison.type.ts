import { Field, Float, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { FilterFieldComparison } from "../../interfaces";
import { Class } from "../../common";
import { IsUndefined } from "../validators";

/** @internal */
let floatFieldComparison: Class<FilterFieldComparison<number>>;

/** @internal */
export function getOrCreateFloatFieldComparison(): Class<
  FilterFieldComparison<number>
> {
  if (floatFieldComparison) {
    return floatFieldComparison;
  }

  @InputType()
  class FloatFieldComparison implements FilterFieldComparison<number> {
    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    _exists?: boolean;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsUndefined()
    _eq?: number;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsUndefined()
    _ne?: number;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsUndefined()
    _gt?: number;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsUndefined()
    _gte?: number;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsUndefined()
    _lt?: number;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsUndefined()
    _lte?: number;

    @Field(() => [Float], { nullable: true })
    @IsNumber({}, { each: true })
    @IsUndefined()
    _in?: number[];

    @Field(() => [Float], { nullable: true })
    @IsNumber({}, { each: true })
    @IsUndefined()
    _nin?: number[];

    @Field(() => [Float], { nullable: true })
    @IsNumber({}, { each: true })
    @IsUndefined()
    _all?: number[];

    @Field(() => Float, { nullable: true })
    @IsNumber({}, { each: true })
    @IsUndefined()
    _elemMatch?: number;
  }

  floatFieldComparison = FloatFieldComparison;
  return floatFieldComparison;
}
