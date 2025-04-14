import bcrypt from 'bcrypt';

const generateHashedPassword = async (plainPassword: string) => {
  try {
    const saltRounds = 12; // Adjust the number of salt rounds if needed
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log('Hashed Password:', hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
};

generateHashedPassword('testpassword'); // Replace 'testpassword' with your password