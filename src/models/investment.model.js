const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true }, // ex: cripto, renda-fixa
  name: { type: String, required: true }, // nome do ativo (ex: Bitcoin)
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  isCrypto: { type: Boolean, default: false },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Investment", investmentSchema);
