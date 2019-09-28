/**
 * @flow
 */
import { authenticate } from "../authentication";

type Args = {
  data?: {},
  where?: {},
  [key: any]: any
};

type Context = {
  session: string,
  id: string,
  prisma: {
    [key: string]: any
  }
};

function info(): string {
  return "Welcome to DWOC";
}

async function users(root: any, args: Args, context: Context) {
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  return await context.prisma.users({
    where: args.where
  });
}

async function projects(root: any, args: Args, context: Context) {
  return context.prisma.projects({
    where: args.where
  });
}

async function organizations(root: any, args: Args, context: Context) {
  return context.prisma.organizations({
    where: args.where
  });
}

async function proposals(root: any, args: Args, context: Context) {
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if (authRes.role !== "Mentor" && authRes.role !== "Admin") {
    throw new Error("Access Denied!");
  }
  return context.prisma.proposals({
    where: args.where
  });
}

async function mentors(root: any, args: Args, context: Context) {
  const authRes = await authenticate(context.session, context.id);
  return context.prisma.mentors({
    where: args.where
  });
}

module.exports = {
  info,
  projects,
  proposals,
  organizations,
  mentors
};
