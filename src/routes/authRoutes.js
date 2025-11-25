const express = require('express');
const { z } = require('zod'); // Importamos Zod direto aqui
const router = express.Router();
const authController = require('../controllers/authController');

// 1. Definimos o Schema aqui mesmo (sem arquivos externos para dar erro)
const userSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
});

// 2. Criamos a função de validação inline
const validateAuth = (req, res, next) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    // Debug de segurança: Se por milagre result.error for nulo, evitamos o crash
    const errors = result.error?.errors 
      ? result.error.errors.map(e => ({ field: e.path[0], message: e.message }))
      : [{ message: 'Erro de validação desconhecido' }];

    return res.status(400).json({
      status: 'fail',
      errors: errors
    });
  }

  next();
};

// 3. Aplicamos nas rotas
router.post('/register', validateAuth, authController.register);
router.post('/login', validateAuth, authController.login);

module.exports = router;