import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign', (req, res) => {
  const credentials = {
    email: 'igor@igor.com',
    password: '123456',
  };
  1;

  const { email, password } = req.body;

  if (credentials.email === email && credentials.password === password) {
    const data = {
      name: 'Igor de Souza Bezerra',
      email,
      roles: ['admin'],
    };

    const token = jwt.sign(data, 'secret', {
      expiresIn: 100000, // 100 s
    });
    return res.json({ access_token: token });
  }
  return res.status(401).json({ message: 'Usuário ou senha incorreta.' });
});

export { app };
