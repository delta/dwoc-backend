/**
 * @flow
 */

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

async function organization(parent: any, args: Args, context: Context) {
  return await context.prisma
    .project({
      id: parent.id
    })
    .organization();
}

module.exports = {
  organization
};
