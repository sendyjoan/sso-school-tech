import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // === Seed Permissions ===
  const permissions = [
    'create_user',
    'read_user',
    'update_user',
    'delete_user',
    'create_role',
    'read_role',
    'update_role',
    'delete_role',
    'create_permission',
    'read_permission',
    'update_permission',
    'delete_permission',
    'assign_role',
    'assign_permission',
    'revoke_role',
    'revoke_permission',
    'view_audit_logs',
  ];

  const permissionRecords = await Promise.all(
    permissions.map(async (name) =>
      prisma.permission.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  // === Seed Roles ===
  const roles = [
    { name: 'Admin' },
    { name: 'User' }
  ];

  const roleRecords = await Promise.all(
    roles.map(async (role) =>
      prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: { name: role.name },
      })
    )
  );

  // === Assign All Permissions to Admin ===
  const adminRole = roleRecords.find(r => r.name === 'Admin');
  await Promise.all(
    permissionRecords.map(permission =>
      prisma.role_has_permission.upsert({
        where: {
          roleId_permissionId: {
            roleId: adminRole.id,
            permissionId: permission.id
          }
        },
        update: {},
        create: {
          roleId: adminRole.id,
          permissionId: permission.id,
        }
      })
    )
  );

  console.log('✅ Seeding complete.');
}

main()
  .catch(e => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
