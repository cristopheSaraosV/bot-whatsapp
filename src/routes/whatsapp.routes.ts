import { Router } from 'express';
import { WhatsAppController } from '../app/controllers/whatsApp.controller';

const whatsAppRoutes = Router();
const baseRoute = '/whatsapp'

whatsAppRoutes.get(`${baseRoute}/health`, (req, res) => new WhatsAppController(req, res).health());
whatsAppRoutes.post(`${baseRoute}/webhook`, (req, res) => new WhatsAppController(req, res).sendMensaje());
whatsAppRoutes.get(`${baseRoute}/webhook`, (req, res) => new WhatsAppController(req, res).verifyToken());

export default whatsAppRoutes;

