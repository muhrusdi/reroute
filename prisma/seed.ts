import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");
  // generateUsers().map(async (obj) => {
  //   await prisma.user.create({
  //     data: obj as any,
  //   });
  // });
  console.log("Seeding user completed");

  const currentId = "05661f10-9d67-4dd4-a444-cf29d3db0b23";

  await prisma.quotes.create({
    data: {
      userId: currentId,
      quote:
        "Prisma Accelerate and Remix together make a powerhouse combo, boosting performance and simplifying full-stack development with ease and efficiency.",
    },
  });
  console.log("Seeding quote completed");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
