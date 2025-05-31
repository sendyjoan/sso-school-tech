import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
    const users = await Promise.all(
        Array.from({ length: 500 }).map(async () => ({
            name: faker.person.fullName(),
            username: faker.internet.userName(),
            password: await bcrypt.hash('password', 10),
        }))
    );

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Seeding selesai.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
