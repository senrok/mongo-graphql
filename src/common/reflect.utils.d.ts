import "reflect-metadata";
import { Class } from "./class.type";
export declare type MetaValue<MetaType> = MetaType | undefined;
declare type ClassDecoratorDataFunc<Data> = (data: Data) => ClassDecorator;
export declare const classMetadataDecorator: <Data>(
<<<<<<< ours
  key: string
=======
  key: string,
>>>>>>> theirs
) => ClassDecoratorDataFunc<Data>;
export declare function getClassMetadata<DTO, Data>(
  DTOClass: Class<DTO>,
  key: string,
<<<<<<< ours
  includeParents: boolean
=======
  includeParents: boolean,
>>>>>>> theirs
): MetaValue<Data>;
declare abstract class Reflector {
  readonly metaKey: string;
  constructor(metaKey: string);
  protected getMetadata<Data>(
    target: Function,
<<<<<<< ours
    includeParents: boolean
=======
    includeParents: boolean,
>>>>>>> theirs
  ): MetaValue<Data>;
  protected defineMetadata<Data>(data: Data, target: Function): void;
}
export declare class ValueReflector extends Reflector {
  set<DTO, Data>(DTOClass: Class<DTO>, data: Data): void;
  get<DTO, Data>(
    DTOClass: Class<DTO>,
<<<<<<< ours
    includeParents?: boolean
=======
    includeParents?: boolean,
>>>>>>> theirs
  ): MetaValue<Data>;
  isDefined<DTO>(DTOClass: Class<DTO>): boolean;
  memoize<DTO, Data>(DTOClass: Class<DTO>, fn: () => Data): Data;
}
export declare class ArrayReflector extends Reflector {
  append<DTO, Data>(DTOClass: Class<DTO>, data: Data): void;
  get<DTO, Data>(
    DTOClass: Class<DTO>,
<<<<<<< ours
    includeParents?: boolean
=======
    includeParents?: boolean,
>>>>>>> theirs
  ): MetaValue<Data[]>;
}
export declare class MapReflector<K = string> extends Reflector {
  set<DTO, Data>(DTOClass: Class<DTO>, key: K, value: Data): void;
  get<DTO, Data>(
    DTOClass: Class<DTO>,
<<<<<<< ours
    includeParents?: boolean
=======
    includeParents?: boolean,
>>>>>>> theirs
  ): MetaValue<Map<K, Data>>;
  get<DTO, Data>(
    DTOClass: Class<DTO>,
    key: K,
<<<<<<< ours
    includeParents?: boolean
  ): MetaValue<Data>;
  getValues<DTO, Data>(
    DTOClass: Class<DTO>,
    includeParents?: boolean
=======
    includeParents?: boolean,
  ): MetaValue<Data>;
  getValues<DTO, Data>(
    DTOClass: Class<DTO>,
    includeParents?: boolean,
>>>>>>> theirs
  ): MetaValue<Data[]>;
  has<DTO>(DTOClass: Class<DTO>, key: K): boolean;
  memoize<DTO, Data>(DTOClass: Class<DTO>, key: K, fn: () => Data): Data;
}
export {};
