const express = require('express');
const { z } = require('zod'); // Zod direto aqui
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

// 1. Schema de Validação (Inline)
const taskSchema = z.object({
  title: z.string({ required_error: "Título é obrigatório" })
    .min(3, "Título deve ter no mínimo 3 caracteres")
    .max(100),
  description: z.string().optional(),
  completed: z.boolean().optional()
});

// 2. Middleware de Validação (Blindado)
const validateTask = (req, res, next) => {
  // .partial() permite validar apenas campos enviados (útil para PATCH)
  // Mas aqui vamos simplificar validando o body inteiro no POST
  const schemaToUse = req.method === 'PATCH' ? taskSchema.partial() : taskSchema;
  
  const result = schemaToUse.safeParse(req.body);

  if (!result.success) {
    const errors = result.error?.errors 
      ? result.error.errors.map(e => ({ field: e.path[0], message: e.message }))
      : [{ message: 'Erro de validação' }];

    return res.status(400).json({ status: 'fail', errors });
  }
  next();
};

// 3. Rotas Protegidas
router.use(protect); // Trava tudo daqui pra baixo

router
  .route('/')
  .get(taskController.getAll)
  .post(validateTask, taskController.create);

router
  .route('/:id')
  .get(taskController.getOne)
  .patch(validateTask, taskController.update)
  .delete(taskController.delete);

module.exports = router;