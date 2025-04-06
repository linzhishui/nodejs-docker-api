import { Router, Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { CreateNameDto } from '../types/name';
import { getAllNames, getNameById, createName, updateName, deleteName } from '../controllers/nameController';

const router = Router();

// 错误处理中间件（必须放在路由处理函数前）
const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  console.log('验证结果:', validationResult(req).array()); // 调试日志
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

// CRUD 路由
router.get('/', getAllNames);
router.get('/:id', getNameById);
router.post('/', [body('name').notEmpty().withMessage('Name is required'), validateRequest], createName);
router.put(
  '/:id',
  [body('name').notEmpty().withMessage('Name is required'), param('id').isInt().withMessage('ID must be integer'), validateRequest],
  updateName
);
router.delete('/:id', deleteName);

export default router;
