/**
 * @flow
 */
import { authenticate } from '../authentication';

function info(): string {
  return 'Welcome to DWOC';
}

async function projects(root, args, context) {
  return context.prisma.projects({
    where: args.where,
  });
}

async function organizations(root, args, context) {
  return context.prisma.organizations({
    where: args.where,
  });
}

async function proposals(root, args, context) {
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  if (authRes.role !== "Mentor" && authRes.role !== "Admin") {
    throw new Error('Cannot change!');
  }
  return context.prisma.proposals({
    where: args.where,
  });
}

async function mentors(root, args, context) {
  const authRes = await authenticate(context.session, context.id);
  if (!authRes.isAuth) {
    throw new Error('login again!');
  }
  if (authRes.role !== "Mentor" && authRes.role !== "Admin") {
    throw new Error('Cannot change!');
  }
  return context.prisma.mentors({
    where: args.where,
  });
}

module.exports = {
  info,
  projects,
  proposals,
  organizations,
  mentors,
};
