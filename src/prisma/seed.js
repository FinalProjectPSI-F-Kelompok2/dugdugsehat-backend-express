const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Seed Measure Type for Constant
const seedMeasureType = async () => {
  await prisma.measureType.create({
    data: {
      id: 1,
      name: "ECG"
    }
  });
  await prisma.measureType.create({
    data: {
      id: 2,
      name: "HR"
    }
  });
}

async function main() {
  await seedMeasureType();
}

main()
.then(() => console.log('ok'))
.catch(err => console.log(err));