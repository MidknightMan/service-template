import { getAllTags } from "../../core/src/sql/queries/tags";
import { getAllUsers } from "../../core/src/sql/queries/getUser";
import { insertTag } from "../../core/src/sql/inserts/insertTags";
import { insertUser } from "../../core/src/sql/inserts/insertUser";
import { g, InferResolvers, buildSchema } from "garph";
import { YogaInitialContext } from "graphql-yoga";
import { GraphQLHandler } from "sst/node/graphql";

const userType = g.type("User", {
  id: g.int().optional(),
  name: g.string().optional(),
});

const tagType = g.type("Tag", {
  id: g.int().optional(),
  name: g.string().optional(),
});

const queryType = g.type("Query", {
  greet: g
    .string()
    .args({
      name: g.string().optional().default("Max"),
    })
    .description("Greets a person"),
  getAllUsers: g
    .ref(() => userType)
    .list()
    .description("Gets all Users"),
  getAllTags: g
    .ref(() => tagType)
    .list()
    .description("Gets all Tags"),
});

const addUserInputType = g.inputType("AddUserInputType", {
  name: g.string(),
});

const addUserOutput = g.type("AddUserOutput", {
  id: g.int(),
});

const addTagInputType = g.inputType("AddTagInputType", {
  name: g.string(),
});

const addTagOutput = g.type("AddTagOutput", {
  id: g.int(),
});

const mutationType = g.type("Mutation", {
  addUser: g
    .ref(() => addUserOutput)
    .args({
      newUserData: g.ref(() => addUserInputType),
    }),
  addTag: g
    .ref(() => addTagOutput)
    .args({
      newTagData: g.ref(() => addTagInputType),
    }),
});

const resolvers: InferResolvers<
  { Query: typeof queryType; Mutation: typeof mutationType },
  { context: YogaInitialContext }
> = {
  Query: {
    greet: (parent, args, context, info) => `Hello, ${args.name}`,
    getAllUsers: async (parent, args, context, info) => await getAllUsers(),
    getAllTags: async (parent, args, context, info) => await getAllTags(),
  },
  Mutation: {
    addUser: async (parent, args, context, info) =>
      await insertUser({
        name: args.newUserData.name,
      }),
    addTag: async (parent, args, context, info) =>
      await insertTag({
        name: args.newTagData.name,
      }),
  },
};

export const schema = buildSchema({ g, resolvers });
export const handler = GraphQLHandler({ schema });
