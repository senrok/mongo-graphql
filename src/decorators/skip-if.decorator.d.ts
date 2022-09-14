<<<<<<< ours
import { ComposableDecorator, ComposedDecorator } from "./decorator.utils";
=======
import { ComposableDecorator, ComposedDecorator } from './decorator.utils';
>>>>>>> theirs
export declare function SkipIf(
  check: () => boolean,
  ...decorators: ComposableDecorator[]
): ComposedDecorator;
