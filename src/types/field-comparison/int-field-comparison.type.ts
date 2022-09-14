import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsOptional } from "class-validator";
import { FilterFieldComparison } from "../../interfaces";
import { Class } from "../../common";
import { IsUndefined } from "../validators";

/** @internal */
let intFieldComparison: Class<FilterFieldComparison<number>>;

/** @internal */
export function getOrCreateIntFieldComparison(): Class<
  FilterFieldComparison<number>
> {
  if (intFieldComparison) {
    return intFieldComparison;
  }

  @InputType()
  class IntFieldComparison implements FilterFieldComparison<number> {
    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    _exists?: boolean;

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsUndefined()
    _eq?: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsUndefined()
    _ne?: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsUndefined()
    _gt?: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsUndefined()
    _gte?: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsUndefined()
    _lt?: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsUndefined()
    _lte?: number;

    @Field(() => [Int], { nullable: true })
    @IsInt({ each: true })
    @IsUndefined()
    _in?: number[];

    @Field(() => [Int], { nullable: true })
    @IsInt({ each: true })
    @IsUndefined()
    _nin?: number[];

    @Field(() => [Int], { nullable: true })
    @IsInt({ each: true })
    @IsUndefined()
    _all?: number[];

    @Field(() => Int, { nullable: true })
    @IsInt({ each: true })
    @IsUndefined()
    _elemMatch?: number;
  }

  intFieldComparison = IntFieldComparison;
  return intFieldComparison;
}
