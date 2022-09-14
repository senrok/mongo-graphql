import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { FilterFieldComparison } from "../../interfaces";
import { Class } from "../../common";
import { IsUndefined } from "../validators";

/** @internal */
let numberFieldComparison: Class<FilterFieldComparison<number>>;

/** @internal */
export function getOrCreateNumberFieldComparison(): Class<
  FilterFieldComparison<number>
> {
  if (numberFieldComparison) {
    return numberFieldComparison;
  }

  @InputType()
  class NumberFieldComparison implements FilterFieldComparison<number> {
    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    _exists?: boolean;

    @Field({ nullable: true })
    @IsNumber()
    @IsUndefined()
    _eq?: number;

    @Field({ nullable: true })
    @IsNumber()
    @IsUndefined()
    _ne?: number;

    @Field({ nullable: true })
    @IsNumber()
    @IsUndefined()
    _gt?: number;

    @Field({ nullable: true })
    @IsNumber()
    @IsUndefined()
    _gte?: number;

    @Field({ nullable: true })
    @IsNumber()
    @IsUndefined()
    _lt?: number;

    @Field({ nullable: true })
    @IsNumber()
    @IsUndefined()
    _lte?: number;

    @Field(() => [Number], { nullable: true })
    @IsNumber({}, { each: true })
    @IsUndefined()
    _in?: number[];

    @Field(() => [Number], { nullable: true })
    @IsNumber({}, { each: true })
    @IsUndefined()
    _nin?: number[];

    @Field(() => [Number], { nullable: true })
    @IsNumber({}, { each: true })
    @IsUndefined()
    _all?: number[];

    @Field(() => Number, { nullable: true })
    @IsNumber({}, { each: true })
    @IsUndefined()
    _elemMatch?: number;
  }

  numberFieldComparison = NumberFieldComparison;
  return numberFieldComparison;
}
