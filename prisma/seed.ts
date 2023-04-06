import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ============= CEATE PERMISSONS ======================= //
  const permissions = [
    {
      name: "all",
      description: "All permissions",
    },
    {
      name: "create:users",
      description: "Create users",
    },
    {
      name: "read:users",
      description: "Read users",
    },
    {
      name: "update:users",
      description: "Update users",
    },
    {
      name: "delete:users",
      description: "Delete users",
    },
    {
      name: "create:roles",
      description: "Create roles",
    },
    {
      name: "read:roles",
      description: "Read roles",
    },
    {
      name: "update:roles",
      description: "Update roles",
    },
    {
      name: "delete:roles",
      description: "Delete roles",
    },
    {
      name: "create:permissions",
      description: "Create permissions",
    },
    {
      name: "read:permissions",
      description: "Read permissions",
    },
    {
      name: "update:permissions",
      description: "Update permissions",
    },

    {
      name: "delete:permissions",
      description: "Delete permissions",
    },
  ];

  for (const p of permissions) {
    await prisma.permission.createMany({
      data: p,
    });
  }

  // ============= CREATE ROLES ======================= //

  const roleAdmin = await prisma.role.create({
    data: {
      name: "ADMIN",
      description: "Administrador del sistema",
      Permissions: {
        connect: [{ id: 1 }],
      },
    },
  });

  const developerRole = await prisma.role.create({
    data: {
      name: "DEVELOPER",
      description: "Desarrollador del sistema",
      Permissions: {
        connect: [{ id: 1 }],
      },
    },
  });

  const roleUser = await prisma.role.create({
    data: {
      name: "USER",
      description: "Usuario del sistema",
      Permissions: {
        connect: [{ id: 3 }],
      },
    },
  });

  // ============= CREATE USERS ======================= //
  await prisma.user.create({
    data: {
      names: "admin",
      firstname: "admin",
      lastname: "admin",
      email: "admin@localhost",
      password: "$2b$10$wNUByTCfVbYS4oWx0eiE.Ol4cEBEX0c6kuKFU9zPsIocvuhQdvi8G",
      roleId: roleAdmin.id,
      is_active: true,
    },
  });

  await prisma.user.create({
    data: {
      names: "Emmanuel",
      firstname: "Esquivel",
      lastname: "Pardo",
      email: "flotuz10@gmail.com",
      password: "$2b$10$wNUByTCfVbYS4oWx0eiE.Ol4cEBEX0c6kuKFU9zPsIocvuhQdvi8G",
      roleId: developerRole.id,
      is_active: true,
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
