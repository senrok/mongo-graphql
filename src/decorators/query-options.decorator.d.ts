import { Class, MetaValue } from "../common";
export declare type QueryOptionsDecoratorOpts<DTO> = DTO;
export declare function QueryOptions(
<<<<<<< ours
  opts: QueryOptionsDecoratorOpts<any>
): (target: Class<unknown>) => void;
export declare const getQueryOptions: <DTO>(
  DTOClass: Class<DTO>
=======
  opts: QueryOptionsDecoratorOpts<any>,
): (target: Class<unknown>) => void;
export declare const getQueryOptions: <DTO>(
  DTOClass: Class<DTO>,
>>>>>>> theirs
) => MetaValue<DTO>;
