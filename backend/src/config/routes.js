const express = require('express');
const billingCycleService = require('../api/billingCycle/billingCycleService');

module.exports = function(server) {
  // API Routes
  const router = express.Router();
  server.use('/api', router);

  // BillingCycle Routes
  router.get('/billingCycles', billingCycleService.get);
  router.post('/billingCycles', billingCycleService.post);
  router.put('/billingCycles', billingCycleService.put);
  router.delete('/billingCycles/:id', billingCycleService.delete);
};
