import crypto from 'crypto';

// Generate a 32-byte random secret
const jwtSecret = crypto.randomBytes(20).toString('hex');

console.log('Generated JWT Secret:', jwtSecret);
