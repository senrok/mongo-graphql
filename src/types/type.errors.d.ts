import { Class } from "../common";
export declare class UnregisteredObjectType<T> extends Error {
  constructor(Cls: Class<T>, description: string);
}
