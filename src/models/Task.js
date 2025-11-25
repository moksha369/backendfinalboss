const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'O título é obrigatório'],
      trim: true,
      maxlength: [100, 'O título não pode ter mais de 100 caracteres'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'A descrição não pode ter mais de 500 caracteres'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    }
  },
  {
    timestamps: true, 
    versionKey: false 
  }
);

module.exports = mongoose.model('Task', taskSchema);