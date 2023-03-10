import express from 'express';
import formPersist from './formPersist';
import formProvider from './formProvider';

const router = express.Router();

router.post('/forms/:slug/:version/', formProvider);
router.post('/forms/persist/:slug/:version/', formPersist);

export default router;
