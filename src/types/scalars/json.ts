import { createFromGraphQLScalar } from "nest-graphql-scalar-adapter";
import { GraphQLJSON } from "graphql-scalars";

export const JSONScalar = createFromGraphQLScalar({
  scalar: GraphQLJSON,
  name: "JSON",
  type: () => JSON,
});

export const GraphQLJSONScalar = createFromGraphQLScalar({
  scalar: GraphQLJSON,
  name: "JSONScalar",
  type: () => GraphQLJSONScalar,
});
