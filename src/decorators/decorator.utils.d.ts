export declare type ComposableDecorator =
  | MethodDecorator
  | PropertyDecorator
  | ClassDecorator
  | ParameterDecorator;
export declare type ComposedDecorator = MethodDecorator &
  PropertyDecorator &
  ClassDecorator &
  ParameterDecorator;
export declare function composeDecorators(
  ...decorators: ComposableDecorator[]
): ComposedDecorator;
