import { Router } from 'express';
import { HealthController } from '../app/controllers/health.controller';

const healthRoutes = Router();

healthRoutes.get('/health', (req, res) => new HealthController(req, res).sendMensaje());

export default healthRoutes;
