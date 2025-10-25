import Contact from "../models/Contact";
import { sampleContacts as contactsData } from "./contacts";

const loadSeedData = () => {
  if (process.env.NODE_ENV === "production") {
    return [];
  }

  return contactsData;
};

export const sampleContacts = loadSeedData();

export const seedDatabase = async () => {
  if (process.env.NODE_ENV === "production") {
    console.log("Production environment detected, skipping database seeding.");
    return;
  }

  try {
    const existingContacts = await Contact.count();
    const seedMode = process.env.SEED_MODE || "none";

    if (seedMode === "reset") {
      console.log(
        "Development environment (RESET mode): Clearing existing data and seeding fresh..."
      );
      await Contact.destroy({ where: {} });
      await Contact.bulkCreate(sampleContacts);
      console.log(
        `Reset seeded ${sampleContacts.length} contacts successfully!`
      );
    } else if (seedMode === "seed") {
      if (existingContacts === 0) {
        console.log(
          "Development environment (SEED mode): Seeding database with sample data..."
        );
        await Contact.bulkCreate(sampleContacts);
        console.log(`Seeded ${sampleContacts.length} contacts successfully!`);
      } else {
        console.log(
          `Database already contains ${existingContacts} contacts, skipping seed.`
        );
      }
    } else if (seedMode === "none") {
      console.log(
        "Development environment (NONE mode): No seed data injection."
      );
    } else {
      console.log(
        `Unknown SEED_MODE: ${seedMode}. Valid options: 'reset', 'seed', or 'none'`
      );
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
