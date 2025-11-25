const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, { timestamps: true });

/**
 * HOOK DE CRIPTOGRAFIA (FIX: Sem o parâmetro next)
 * O Mongoose entende que quando a função async termina, ele pode prosseguir.
 */
userSchema.pre('save', async function() {
  // Se a senha não foi modificada, sai da função
  if (!this.isModified('password')) return;
  
  // Gera o hash da senha
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar senhas
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);