import { ReturnTypeFuncValue } from "@nestjs/graphql";
import { Class } from "./class.type";
export interface DTONamesOpts {
  dtoName?: string;
}
export interface DTONames {
  baseName: string;
  baseNameLower: string;
  pluralBaseName: string;
  pluralBaseNameLower: string;
}
export declare const getDTONames: <DTO>(
  DTOClass: Class<DTO>,
<<<<<<< ours
  opts?: DTONamesOpts
) => DTONames;
export declare const getDTOIdTypeOrDefault: (
  DTOS: Class<unknown>[],
  defaultType?: ReturnTypeFuncValue
=======
  opts?: DTONamesOpts,
) => DTONames;
export declare const getDTOIdTypeOrDefault: (
  DTOS: Class<unknown>[],
  defaultType?: ReturnTypeFuncValue,
>>>>>>> theirs
) => ReturnTypeFuncValue;
