import db from '../database';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export const userRepository = {
  findByEmail(email: string): User | undefined {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
  },

  findById(id: number): User | undefined {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
  },

  create(data: CreateUserData): User {
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    const result = stmt.run(data.name, data.email, data.password);
    return { id: result.lastInsertRowid as number, ...data, created_at: new Date().toISOString() };
  }
};