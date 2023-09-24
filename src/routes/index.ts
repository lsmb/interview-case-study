import express from 'express';
import { company } from './company';

export const routes = express.Router();

routes.use('/company', company);
