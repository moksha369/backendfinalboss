const { z } = require('zod');

const taskSchema = z.object({
  title: z.string({ required_error: "Título é obrigatório" })
    .min(3, "Título deve ter no mínimo 3 caracteres")
    .max(100),
  description: z.string().optional(),
  completed: z.boolean().optional()
});

const userSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
});

const validate = (schema) => (req, res, next) => {
  console.log('--> ZodValidator Iniciado'); // DEBUG
  console.log('--> Body recebido:', req.body); // DEBUG

  const result = schema.safeParse(req.body);
  
  console.log('--> Sucesso Zod:', result.success); // DEBUG

  if (!result.success) {
    console.log('--> Erro Zod detectado. Formatando...'); // DEBUG
    
    // Se result.error for undefined aqui, o log abaixo vai mostrar
    if (!result.error) console.log('ALERTA: result.error é undefined!');

    const errorMessages = result.error.errors.map(e => ({
      field: e.path[0],
      message: e.message
    }));

    return res.status(400).json({
      status: 'fail',
      errors: errorMessages
    });
  }

  next();
};

module.exports = { taskSchema, userSchema, validate };