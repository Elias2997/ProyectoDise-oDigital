import { z } from 'zod';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as UserModel from '../models/user.model.js';
dotenv.config();

const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existing = await UserModel.findUserByEmail(email);
    if (existing) return res.status(409).json({ message: 'Email registrado' });

    const hash = await argon2.hash(password);
    const user = await UserModel.createUser({ username, email, passwordHash: hash });
    res.status(201).json({ message: 'Usuario creado', user });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = await argon2.verify(user.password, password);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.json({ token });
  } catch (err) { next(err); }
};