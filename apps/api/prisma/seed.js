const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Hapus semua data dari tabel
  await prisma.user.deleteMany({});
  await prisma.concert.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.category.deleteMany({});

  // Seed Locations
  const locations = await prisma.location.createMany({
    data: [
      { name: 'Jakarta' },
      { name: 'Bandung' },
      { name: 'Surabaya' },
      { name: 'Yogyakarta' },
      { name: 'Bali' },
      { name: 'Padang' },
      { name: 'Medan' },
      { name: 'Lampung' },
      { name: 'Malang' },
      { name: 'Makassar' },
      { name: 'Manado' },
    ],
  });

  // Seed Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Metal' },
      { name: 'Electric Dance Music' },
      { name: 'Pop' },
    ],
  });

  // Ambil ID lokasi dan kategori yang baru saja di-seed
  const allLocations = await prisma.location.findMany();
  const allCategories = await prisma.category.findMany();

  // Mapping nama lokasi dan kategori ke ID
  const locationMap = allLocations.reduce((map, location) => {
    map[location.name] = location.id;
    return map;
  }, {});

  const categoryMap = allCategories.reduce((map, category) => {
    map[category.name] = category.id;
    return map;
  }, {});

  // Seed Concerts dengan ID lokasi dan kategori yang benar
  const concerts = await prisma.concert.createMany({
    data: [
      { name: 'Avenged Sevenfold', imageUrl: '/images/a7x.jpg', date: new Date('2024-07-15T19:00:00.000Z'), locationId: locationMap['Jakarta'], categoryId: categoryMap['Metal'] },
      { name: 'The Amity Affliction', imageUrl: '/images/amity.jpg', date: new Date('2024-08-01T19:00:00.000Z'), locationId: locationMap['Bandung'], categoryId: categoryMap['Metal'] },
      { name: 'Babymetal', imageUrl: '/images/babymetal.jpg', date: new Date('2024-09-12T19:00:00.000Z'), locationId: locationMap['Surabaya'], categoryId: categoryMap['Metal'] },
      { name: 'Bad Omens', imageUrl: '/images/badomens.jpg', date: new Date('2024-10-20T19:00:00.000Z'), locationId: locationMap['Yogyakarta'], categoryId: categoryMap['Metal'] },
      { name: 'Bring Me The Horizon', imageUrl: '/images/bmth.jpg', date: new Date('2024-11-15T19:00:00.000Z'), locationId: locationMap['Bali'], categoryId: categoryMap['Metal'] },
      { name: 'Linkin Park', imageUrl: '/images/linkinpark.jpg', date: new Date('2024-12-05T19:00:00.000Z'), locationId: locationMap['Padang'], categoryId: categoryMap['Metal'] },
      { name: 'My Chemical Romance', imageUrl: '/images/mcr.jpg', date: new Date('2025-01-10T19:00:00.000Z'), locationId: locationMap['Medan'], categoryId: categoryMap['Metal'] },
      { name: 'Skillet', imageUrl: '/images/skillet.jpg', date: new Date('2025-02-15T19:00:00.000Z'), locationId: locationMap['Lampung'], categoryId: categoryMap['Metal'] },
      { name: 'Sleep Token', imageUrl: '/images/sleepToken.jpg', date: new Date('2025-03-20T19:00:00.000Z'), locationId: locationMap['Malang'], categoryId: categoryMap['Metal'] },
      { name: 'Slipknot', imageUrl: '/images/slipknot.jpg', date: new Date('2025-04-10T19:00:00.000Z'), locationId: locationMap['Makassar'], categoryId: categoryMap['Metal'] },
      { name: 'Avicii', imageUrl: '/images/avicii.jpg', date: new Date('2024-07-15T19:00:00.000Z'), locationId: locationMap['Jakarta'], categoryId: categoryMap['Electric Dance Music'] },
      { name: 'Skrillex', imageUrl: '/images/skrillex.jpg', date: new Date('2024-08-01T19:00:00.000Z'), locationId: locationMap['Bandung'], categoryId: categoryMap['Electric Dance Music'] },
      { name: 'Kygo', imageUrl: '/images/kygo.jpg', date: new Date('2024-09-12T19:00:00.000Z'), locationId: locationMap['Surabaya'], categoryId: categoryMap['Electric Dance Music'] },
      { name: 'David Guetta', imageUrl: '/images/davidguetta.jpg', date: new Date('2024-10-20T19:00:00.000Z'), locationId: locationMap['Yogyakarta'], categoryId: categoryMap['Electric Dance Music'] },
      { name: 'Martin Garrix', imageUrl: '/images/martingarrix.jpg', date: new Date('2024-11-15T19:00:00.000Z'), locationId: locationMap['Bali'], categoryId: categoryMap['Electric Dance Music'] },
      { name: 'R3HAB', imageUrl: '/images/rehab.jpg', date: new Date('2024-12-05T19:00:00.000Z'), locationId: locationMap['Padang'], categoryId: categoryMap['Electric Dance Music'] },
      { name: 'Marshmello', imageUrl: '/images/marshmello.jpg', date: new Date('2025-01-10T19:00:00.000Z'), locationId: locationMap['Medan'], categoryId: categoryMap['Electric Dance Music'] },
      { name: 'Alan Walker', imageUrl: '/images/alanwalker.jpg', date: new Date('2025-02-15T19:00:00.000Z'), locationId: locationMap['Lampung'], categoryId: categoryMap['Electric Dance Music'] },
      { name: 'Yellow Claw', imageUrl: '/images/yellowclaw.jpg', date: new Date('2025-03-20T19:00:00.000Z'), locationId: locationMap['Malang'], categoryId: categoryMap['Electric Dance Music'] },
      { name: 'Dj Snake', imageUrl: '/images/djsnake.jpg', date: new Date('2025-04-10T19:00:00.000Z'), locationId: locationMap['Makassar'], categoryId: categoryMap['Electric Dance Music'] },
      { name: 'Maroon 5', imageUrl: '/images/maroon5.jpg', date: new Date('2024-07-15T19:00:00.000Z'), locationId: locationMap['Jakarta'], categoryId: categoryMap['Pop'] },
      { name: 'Khalid', imageUrl: '/images/khalid.jpg', date: new Date('2024-08-01T19:00:00.000Z'), locationId: locationMap['Bandung'], categoryId: categoryMap['Pop'] },
      { name: 'Shawn Mendes', imageUrl: '/images/shawnmendes.jpg', date: new Date('2024-09-12T19:00:00.000Z'), locationId: locationMap['Surabaya'], categoryId: categoryMap['Pop'] },
      { name: 'Charlie Puth', imageUrl: '/images/charlieputh.jpg', date: new Date('2024-10-20T19:00:00.000Z'), locationId: locationMap['Yogyakarta'], categoryId: categoryMap['Pop'] },
      { name: 'Dean Lewis', imageUrl: '/images/deanlewis.jpg', date: new Date('2024-11-15T19:00:00.000Z'), locationId: locationMap['Bali'], categoryId: categoryMap['Pop'] },
      { name: 'Bruno Mars', imageUrl: '/images/brunomars.jpg', date: new Date('2024-12-05T19:00:00.000Z'), locationId: locationMap['Padang'], categoryId: categoryMap['Pop'] },
      { name: 'LSD', imageUrl: '/images/lsd.jpg', date: new Date('2025-01-10T19:00:00.000Z'), locationId: locationMap['Medan'], categoryId: categoryMap['Pop'] },
      { name: 'James Arthur', imageUrl: '/images/jamesarthur.jpg', date: new Date('2025-02-15T19:00:00.000Z'), locationId: locationMap['Lampung'], categoryId: categoryMap['Pop'] },
      { name: 'Jason Derulo', imageUrl: '/images/jasonderulo.jpg', date: new Date('2025-03-20T19:00:00.000Z'), locationId: locationMap['Malang'], categoryId: categoryMap['Pop'] },
      { name: 'Imagine Dragons', imageUrl: '/images/imaginedragons.jpg', date: new Date('2025-04-10T19:00:00.000Z'), locationId: locationMap['Makassar'], categoryId: categoryMap['Pop'] }
    ],
  });
  console.log('Categories seeded:', categories);
  console.log('Locations seeded:', locations);
  console.log('Concerts seeded:', concerts);
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
