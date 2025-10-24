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
    const seedMode = process.env.SEED_MODE || "skip";

    if (seedMode === "reset") {
      console.log(
        "Development environment (RESET mode): Clearing existing data and seeding fresh..."
      );
      await Contact.destroy({ where: {} });
      await Contact.bulkCreate(sampleContacts);
      console.log(
        `Reset seeded ${sampleContacts.length} contacts successfully!`
      );
    } else if (seedMode === "skip") {
      if (existingContacts === 0) {
        console.log(
          "Development environment (SKIP mode): Database is empty, seeding with sample data..."
        );
        await Contact.bulkCreate(sampleContacts);
        console.log(`Seeded ${sampleContacts.length} contacts successfully!`);
      } else {
        console.log(
          `Database already contains ${existingContacts} contacts, skipping seed.`
        );
      }
    } else {
      console.log(
        `Unknown SEED_MODE: ${seedMode}. Valid options: 'reset' or 'skip'`
      );
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
