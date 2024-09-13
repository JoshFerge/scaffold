import { Context, Hono } from "hono";
import { renderer } from "./renderer";
import { AuthConfig, authHandler, initAuthConfig } from "@hono/auth-js";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import Credentials from "@auth/core/providers/credentials";

type Env = {
  Bindings: {
    MY_VAR: string;
  };
};

const app = new Hono<Env>();
app.use("*", initAuthConfig(getAuthConfig));
app.use("/api/auth/*", authHandler());

app.get("/api/clock", (c) => {
  return c.json({
    var: c.env.MY_VAR, // Cloudflare Bindings
    time: new Date().toLocaleTimeString(),
  });
});

app.get("*", (c) => {
  return renderer(c);
});

function getAuthConfig(c: Context): AuthConfig {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });
  return {
    adapter: PrismaAdapter(prisma),
    secret: c.env.AUTH_SECRET,
    providers: [
      Credentials({
        credentials: {
          username: { label: "Username" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }
          // Here you would typically validate the credentials against your database
          // For example:
          // const user = await prisma.user.findUnique({ where: { username: credentials.username } });
          // if (user && await comparePasswords(credentials.password, user.password)) {
          //   return { id: user.id, name: user.name, email: user.email };
          // }
          // For now, we'll just return a mock user if the credentials match a hardcoded value
          if (
            credentials.username === "user" &&
            credentials.password === "pass"
          ) {
            return { id: "1", name: "Test User", email: "test@example.com" };
          }
          return null;
        },
      }),
      // Google({
      //   authorization: {
      //     params: {
      //       prompt: "consent",
      //       access_type: "offline",
      //       response_type: "code",
      //     },
      //   },
      // }),
      // Resend({}),
    ],
  };
}

export default app;
