import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

const MONGO_URI = 'mongodb://localhost:27017';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin123", 10);

    await User.create({
      fullName: 'superadmin',
      email: 'teshome.mosneh@gmail.com',
      password: hashedPassword,
      isAdmin: true
    });

    console.log("Admin user created");
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
