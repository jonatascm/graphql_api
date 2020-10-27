import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { AuthResolver } from "./resolvers/AuthResolver";
import { PictureResolver } from "./resolvers/PictureResolver";


(async () => {
  const app = express();

  const options = await getConnectionOptions();
  await createConnection(options);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, PictureResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
