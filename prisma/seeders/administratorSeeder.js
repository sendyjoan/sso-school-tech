import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main(){
    const role = await prisma.role.findFirst({
        where: {
            name: 'Admin',
        },
    });

    if (!role) {
        console.error('Role "Admin" not found. Please ensure the role exists before running this seeder.');
        return;
    }

    const user = await prisma.user.create({
        data: {
            name: 'Administrator',
            username: 'admin',
            password: await bcrypt.hash('password', 10),
            roleId: role.id,
        },
    });

    console.log('Administrator user created:', user);
}

main()
    .catch((e) => {
        console.error('Error seeding administrator:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });