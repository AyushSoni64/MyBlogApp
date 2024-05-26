import * as bcrypt from "bcrypt";
import { userRepository } from "../repositories/user/UserRepository";
import { configurations } from "../config/configurations";

export default async () => {
  const userSeedDataCount = await userRepository.countUsers();

  if (!userSeedDataCount) {
    console.log("||  User Data is Seeding  ||");
    await userRepository.registerUser({
      firstname: "Ayush",
      lastname: "Soni",
      email: "ayusoni86@gmail.com",
      password: await bcrypt.hash("1234567890", configurations.saltRounds),
      role: "admin",
    });
    console.log("||  User Data seeded successfully  ||");
  } else {
    console.log("||  User Data already seeded  ||");
  }
};
