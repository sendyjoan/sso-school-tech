import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createUser = (data) => prisma.user.create({ data });
const findUserByUsername = (username) =>
  prisma.user.findUnique({
    where: { username },
    include: {
      role: {
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });
const findUserById = (id) => prisma.user.findUnique({ where: { id } });

export default {
    createUser,
    findUserByUsername,
    findUserById,
};