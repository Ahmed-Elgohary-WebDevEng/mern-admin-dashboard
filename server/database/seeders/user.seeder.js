import User from "../../models/User.model.js";
import { faker } from "@faker-js/faker";

export const userSeeder = async (req, res) => {
  try {
    const fakeUsers = [];

    for (let i = 0; i < 5; i++) {
      const randomRole = faker.helpers.arrayElement(["user", "admin", "superadmin"]);

      fakeUsers.push({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        city: faker.address.city(),
        state: faker.address.state(),
        // country: faker.address.countryCode('alpha-2'),

        country: "CH",
        occupation: faker.name.jobTitle(),
        phoneNumber: faker.phone.number(),
        role: randomRole,
      });
    }

    const insertedUsers = await User.insertMany(fakeUsers);
    console.log("User seeded successfully");
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
