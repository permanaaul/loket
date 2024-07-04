const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Hapus semua data dari tabel User
  await prisma.user.deleteMany({});

  // Create a user
  const user = await prisma.user.create({
    data: {
      username: 'auliapermana',
      email: 'aulia.permana@example.com',
      password: 'securepassword', 
    },
  });

  console.log('User created: ', user);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
