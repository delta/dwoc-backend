/**
 * @flow
 */

type Args = {
  data?: {},
  where?: {},
  [key: any]: any,
};

type Context = {
  session: string,
  id: string,
  prisma: {
    [key: string]: any,
  },
};

async function project(parent: any, args: Args, context: Context) {
  return await context.prisma
    .proposal({
      id: parent.id,
    })
    .project();
}

async function user(parent: any, args: Args, context: Context) {
  return await context.prisma
    .proposal({
      id: parent.id,
    })
    .user();
}

module.exports = {
  project,
  user,
};
