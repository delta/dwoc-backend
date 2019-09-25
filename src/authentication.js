import { prisma } from './generated/prisma-client';

export async function authenticate(session, id) {
  const user = await prisma.users({
    where: { id: id },
  });
  if (user.length == 0) {
    return { message: 'No user found', isAuth: false };
  } else if (user[0].session === session) {
    return { message: 'Auth success', isAuth: true, role: user[0].role };
  } else {
    return { message: 'Session expired', isAuth: false };
  }
}
