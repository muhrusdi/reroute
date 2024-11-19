import { faker } from "@faker-js/faker";
import prisma from "~/lib/utils/prisma.server";

export const generateUsers = () => {
  return Array.from(Array(10)).map((item) => {
    const name = faker.person.fullName();
    const email = name.toLowerCase().replace(/[^a-z0-9-]/g, "") + "@gmail.com";
    const obj = {
      name,
      email,
    };

    return obj;
  });
};

export const createQuote = async (q: string) => {
  const currentId = "05661f10-9d67-4dd4-a444-cf29d3db0b23";

  return prisma.quotes.create({
    data: {
      userId: currentId,
      quote: q,
    },
  });
};
