import { Router } from 'express';
import { getModelsByYear, getDiscontinuedModels } from '../controllers/honda.controller';

const router = Router();

router.get('/model/:year',getModelsByYear)
router.get('/discontinued/',getDiscontinuedModels)




export default router;