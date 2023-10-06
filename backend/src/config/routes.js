const express = require('express');
const auth = require('./auth');
const billingCycleService = require('../api/billingCycle/billingCycleService');
const authService = require('../api/user/authService');

module.exports = function(server) {
  
  // API Secure Routes
  const protectedApi = express.Router();
  server.use('/api', protectedApi);

  protectedApi.use(auth);
  protectedApi.get('/billingCycles', billingCycleService.get);
  protectedApi.post('/billingCycles', billingCycleService.post);
  protectedApi.put('/billingCycles/:id', billingCycleService.put);
  protectedApi.delete('/billingCycles/:id', billingCycleService.delete);
  protectedApi.get('/billingCycles/count', billingCycleService.count);
  protectedApi.get('/billingCycles/summary', billingCycleService.summary);

  // API Open Routes
  const openApi = express.Router();
  server.use('/oapi', openApi);

  openApi.post('/login', authService.login);
  openApi.post('/signup', authService.signUp);
  openApi.post('/validateToken', authService.validateToken);

};
