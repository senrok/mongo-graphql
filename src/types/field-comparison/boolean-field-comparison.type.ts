import { IsBoolean, IsOptional } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { FilterFieldComparison } from "../../interfaces";
import { Class } from "../../common";

/** @internal */
let booleanFieldComparison: Class<FilterFieldComparison<boolean>>;

/** @internal */
export function getOrCreateBooleanFieldComparison(): Class<
  FilterFieldComparison<boolean>
> {
  if (booleanFieldComparison) {
    return booleanFieldComparison;
  }

  @InputType()
  class BooleanFieldComparison implements FilterFieldComparison<boolean> {
    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    _eq?: boolean | null;

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    _exists?: boolean;
  }

  booleanFieldComparison = BooleanFieldComparison;
  return BooleanFieldComparison;
}
