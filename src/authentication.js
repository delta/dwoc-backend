/**
 * @flow
 */

import { prisma } from "./generated/prisma-client";

type Response = {
  message: string,
  isAuth: boolean,
  role?: string
};

export async function authenticate(
  session: string,
  id: string
): Promise<Response> {
  const user = await prisma.users({
    where: { id: id }
  });
  if (user.length == 0) {
    return { message: "No user found", isAuth: false };
  } else if (user[0].session === session) {
    return { message: "Auth success", isAuth: true, role: user[0].role };
  } else {
    return { message: "Session expired", isAuth: false };
  }
}
