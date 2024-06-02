import { schema } from "../../src/graphql";
import { ApolloServer } from "@apollo/server";

export const server = new ApolloServer({
  schema,
});
