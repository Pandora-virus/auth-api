import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-dev';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  async register(data: RegisterData) {
    const userExists = userRepository.findByEmail(data.email);
    if (userExists) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = userRepository.create({
      ...data,
      password: hashedPassword
    });

    return { id: user.id, name: user.name, email: user.email };
  },

  async login(data: LoginData) {
    const user = userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
};