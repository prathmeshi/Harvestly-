'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const isProduction = process.env.NODE_ENV === 'production';

app.disable('x-powered-by');
app.set('trust proxy', isProduction ? 1 : false);
app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true, methods: ['GET', 'POST', 'DELETE'], allowedHeaders: ['Content-Type'] }));
app.use(express.json({ limit: '10kb', strict: true }));
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Too many requests. Please try again later.' } }));

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Too many authentication attempts. Please wait 15 minutes and try again.' }, skipSuccessfulRequests: true });
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254, index: true },
  // Store only a bcrypt hash, never the submitted password.
  passwordHash: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now, immutable: true }
}, { versionKey: false, strict: 'throw' });
const User = mongoose.models.User || mongoose.model('User', userSchema);
const products = [
  { id: 1, name: 'Onion', quantity: '500 kg', farmer: 'Farmer 1' },
  { id: 2, name: 'Tomato', quantity: '300 kg', farmer: 'Farmer 2' },
  { id: 3, name: 'Potato', quantity: '750 kg', farmer: 'Farmer 3' }
];
const authReady = () => mongoose.connection.readyState === 1;
const createToken = (user) => jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h', issuer: 'harvestly-api', audience: 'harvestly-client' });
const cookieOptions = { httpOnly: true, secure: isProduction, sameSite: 'strict', path: '/', maxAge: 2 * 60 * 60 * 1000 };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cleanText = value => typeof value === 'string' ? value.trim() : '';

app.get('/', (_req, res) => res.json({ name: 'Harvestly API', status: 'running' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: authReady() ? 'connected' : 'disconnected' }));
app.get('/api/products', (_req, res) => res.json(products));

app.post('/api/auth/register', authLimiter, async (req, res, next) => {
  try {
    if (!authReady()) return res.status(503).json({ error: 'Account service is unavailable until the database is configured.' });
    const name = cleanText(req.body?.name);
    const email = cleanText(req.body?.email).toLowerCase();
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (name.length < 2 || name.length > 80) return res.status(400).json({ error: 'Name must be between 2 and 80 characters.' });
    if (email.length > 254 || !emailPattern.test(email)) return res.status(400).json({ error: 'Enter a valid email address.' });
    if (password.length < 12 || password.length > 72) return res.status(400).json({ error: 'Password must be 12–72 characters long.' });
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return res.status(400).json({ error: 'Password must include lowercase, uppercase, and a number.' });
    const existing = await User.findOne({ email }).lean();
    if (existing) return res.status(409).json({ error: 'An account with this email already exists.' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });
    res.cookie('harvestly_session', createToken(user), cookieOptions).status(201).json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: 'An account with this email already exists.' });
    next(error);
  }
});

app.post('/api/auth/login', authLimiter, async (req, res, next) => {
  try {
    if (!authReady()) return res.status(503).json({ error: 'Account service is unavailable until the database is configured.' });
    const email = cleanText(req.body?.email).toLowerCase();
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (email.length > 254 || !emailPattern.test(email) || !password || password.length > 72) return res.status(400).json({ error: 'Enter a valid email and password.' });
    const user = await User.findOne({ email }).select('+passwordHash');
    const matches = user ? await bcrypt.compare(password, user.passwordHash) : false;
    if (!matches) return res.status(401).json({ error: 'Invalid email or password.' });
    res.cookie('harvestly_session', createToken(user), cookieOptions).json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) { next(error); }
});

app.get('/api/auth/me', async (req, res) => {
  const token = req.cookies?.harvestly_session;
  if (!token) return res.status(401).json({ error: 'Not signed in.' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { issuer: 'harvestly-api', audience: 'harvestly-client' });
    if (!authReady()) return res.status(503).json({ error: 'Account service is unavailable.' });
    const user = await User.findById(payload.sub).lean();
    if (!user) return res.status(401).json({ error: 'Session is no longer valid.' });
    return res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (_error) { return res.status(401).json({ error: 'Session is invalid or expired.' }); }
});
app.post('/api/auth/logout', (_req, res) => res.clearCookie('harvestly_session', { httpOnly: true, secure: isProduction, sameSite: 'strict', path: '/' }).status(204).end());

app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));
app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) return res.status(400).json({ error: 'Malformed JSON request.' });
  if (error.name === 'ValidationError') return res.status(400).json({ error: 'Submitted data did not pass validation.' });
  console.error('Unhandled API error:', error.message);
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
});

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('FATAL: Set JWT_SECRET to a random secret of at least 32 characters in server/.env');
  process.exit(1);
}
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection failed; auth endpoints will be unavailable:', err.message));
} else {
  console.warn('MONGODB_URI is not configured; auth endpoints will return 503. Products demo endpoint remains available.');
}
const server = app.listen(PORT, () => console.log(`Harvestly API listening on http://localhost:${PORT}`));
function shutdown() { server.close(() => mongoose.disconnect().finally(() => process.exit(0))); }
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
