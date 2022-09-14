import { QUERY_OPTIONS_KEY } from "./constants";
import { Class, MetaValue, ValueReflector } from "../common";

const valueReflector = new ValueReflector(QUERY_OPTIONS_KEY);

export type QueryOptionsDecoratorOpts<DTO> = DTO;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function QueryOptions(opts: QueryOptionsDecoratorOpts<any>) {
  return (target: Class<unknown>): void => {
    valueReflector.set(target, opts);
  };
}

export const getQueryOptions = <DTO>(DTOClass: Class<DTO>): MetaValue<DTO> =>
  valueReflector.get(DTOClass);
