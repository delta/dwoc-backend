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

async function userProfile(root: any, args: Args, context: Context) {
  const authRes = await authenticate(context.session, context.id);
  if(!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  return await context.prisma.user({
    id: context.id
  });
}

async function users(root: any, args: Args, context: Context) {
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  if(authRes.role !== "Admin") {
    throw new Error("Access Denied!!");
  }
  return await context.prisma.users({
    where: args.where
  });
}

async function projects(root: any, args: Args, context: Context) {
  return await context.prisma.projects({
    where: args.where
  });
}

async function organizations(root: any, args: Args, context: Context) {
  return await context.prisma.organizations({
    where: args.where
  });
}

async function userProposals(root: any, args: Args, context: Context) {
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error("Login Again!!");
  }
  return await context.prisma.proposals({
    where: {user: {id: context.id}}
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
  return await context.prisma.proposals({
    where: args.where
  });
}

async function mentors(root: any, args: Args, context: Context) {
  const authRes = await authenticate(context.session, context.id);
  return await context.prisma.mentors({
    where: args.where
  });
}

module.exports = {
  info,
  userProfile,
  users,
  projects,
  organizations,
  userProposals,
  proposals,
  mentors
};
