import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '../generated/client/client';

const adminUser = {
  uid: 'dev-admin',
  email: 'admin@mockp.dev',
  name: 'Mockp Admin',
  password: 'admin123',
};

export async function seedUsers(prisma: PrismaClient) {
  const passwordHash = bcrypt.hashSync(
    adminUser.password,
    bcrypt.genSaltSync(),
  );

  await prisma.user.upsert({
    where: { uid: adminUser.uid },
    update: {
      name: adminUser.name,
      Credentials: {
        upsert: {
          create: {
            email: adminUser.email,
            passwordHash,
          },
          update: {
            email: adminUser.email,
            passwordHash,
          },
        },
      },
      AuthProvider: {
        upsert: {
          create: {
            type: 'CREDENTIALS',
          },
          update: {
            type: 'CREDENTIALS',
          },
        },
      },
      Admin: {
        upsert: {
          create: {},
          update: {},
        },
      },
    },
    create: {
      uid: adminUser.uid,
      name: adminUser.name,
      Credentials: {
        create: {
          email: adminUser.email,
          passwordHash,
        },
      },
      AuthProvider: {
        create: {
          type: 'CREDENTIALS',
        },
      },
      Admin: {
        create: {},
      },
    },
  });

  console.log(`Seeded admin user: ${adminUser.email} / ${adminUser.password}`);
}
