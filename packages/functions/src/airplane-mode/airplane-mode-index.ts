import { server as graphqlServer } from "./gqlServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bp from "body-parser";
import app from "./expressServer";

const port = process.env.PORT || "5002";

const { json } = bp;

const start = async () => {
  await graphqlServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(graphqlServer),
  );

  app.listen(port, () => {
    return console.log(
      `Server is listening on ${port}, graphQL path = ${app.path()}/graphql`,
    );
  });
};

process.on("uncaughtException", function (err) {
  console.error(err);
});

start();
