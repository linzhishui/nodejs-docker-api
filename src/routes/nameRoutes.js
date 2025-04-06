const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const { getAllNames, getNameById, createName, updateName, deleteName } = require('../controllers/nameController');

// 错误处理中间件（必须放在路由处理函数前）
const validateRequest = (req, res, next) => {
  console.log('验证结果:', validationResult(req).array()); // 调试日志
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// CRUD 路由
router.get('/', getAllNames);
router.get('/:id', getNameById);
router.post('/', [body('name').notEmpty().withMessage('Name is required'), validateRequest], createName);
router.put('/:id', [param('id').isInt().withMessage('ID must be integer'), validateRequest], body('name').notEmpty(), updateName);
router.delete('/:id', deleteName);

module.exports = router;
