const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers/index");
const { MONGODB } = require("./config.js");
const typeDefs = require("./graphql/typeDefs.graphql");

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 5000 }).then((res) => {
      console.log(`Server running at ${res.url}`);
    });
  })
  .catch((e) => console.log(e));
