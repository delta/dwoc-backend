/**
 * @flow
 */

function info(): string {
  return 'Welcome to DWOC';
}

async function organizations(root, args, context) {

  return context.prisma.organizations({
    where: args.where,
  });
}
module.exports = {
  info,
  organizations
};
