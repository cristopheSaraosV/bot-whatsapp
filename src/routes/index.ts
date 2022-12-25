import express from 'express';
import healthRoutes from './health.routes';
import whatsAppRoutes from './whatsapp.routes';

const appRoutes = express();

const base = '/api/v1';

appRoutes.use(base, healthRoutes);
appRoutes.use(base, whatsAppRoutes);

export default appRoutes;
