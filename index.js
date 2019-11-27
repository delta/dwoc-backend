/**
 * @flow
 */

import { GraphQLServer } from "graphql-yoga";
import passport from "passport";
import { prisma } from "./src/generated/prisma-client";
import resolvers from "./src/resolvers";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

require("./src/auth.js");

type Request = {
  request: {
    headers: {
      session: string,
      id: string,
      [key: string]: any
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,

  context: (req: Request) => {
    const session: string = req.request.headers.session;
    const id: string = req.request.headers.id;
    return {
      session,
      id,
      prisma
    };
  }
});

server.express.use(cookieParser());
server.express.use(bodyParser.urlencoded({ extended: true }));
server.express.use(passport.initialize());
server.express.use(passport.session());

server.express.get("/login", passport.authenticate("github"));
server.express.get(
  "/",
  passport.authenticate("github", {
    failureRedirect: "https://dwoc.io/dwocb/login"
  }),
  function (req, res) {
    let session = req.session.passport.user;
    //send cookie to user browser
    res.cookie(
      "dwoc_user_session",
      JSON.stringify({ session: session.session, id: session.id }),
      { encode: String }
    );
    console.log("cookie sent");
    res.redirect("https://dwoc.io");
    //res.send("Welcome to DWOC");
  }
);

server.express.get("/logout", (req, res, next) => {
  res.clearCookie("dwoc_user_session");
  res.redirect("https://dwoc.io");

});
const options = {
port: 6969
}
server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
)
//server.start((options) => console.log("Server is running on http://localhost:6969"));
