const restfull = require('node-restful')
const mongoose = restfull.mongoose

const creditSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true }
})

const debtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito'] },
    status: { type: String, required: false, uppercase: true, enum: ['PAYED', 'PENDING', 'SCHEDULED'] }
})

const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, min: 1970, max: 2100, required: true },
    credits: [creditSchema],
    debts: [debtSchema]
})

module.exports = restfull.model('BillingCycle', billingCycleSchema)