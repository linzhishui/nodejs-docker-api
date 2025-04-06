import express, { Request, Response } from 'express';
import { Name, CreateNameDto } from '../types/name';

// 模拟数据库
let names = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// 获取所有name
export const getAllNames = (req: Request, res: Response<Name[]>) => {
  res.json(names);
};

// 获取单个name
export const getNameById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const name = names.find((n) => n.id === id);
    if (!name) {
      res.status(404).json({ error: 'Name not found' });
    } else {
      res.json(name);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 创建name
// 导出一个名为createName的函数，该函数接收两个参数：req和res
export const createName = (req: Request<{}, {}, CreateNameDto>, res: Response<Name>) => {
  // 创建一个新名字对象，id为names数组的长度加1，name为req.body.name
  const newName = {
    id: names.length + 1,
    name: req.body.name,
  };
  // 将新名字对象添加到names数组中
  names.push(newName);
  // 返回201状态码和新的名字对象
  res.status(201).json(newName);
};

// 更新name
export const updateName = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const name = names.find((n) => n.id === id);
    if (!name) {
      res.status(404).json({ error: 'Name not found' });
    } else {
      name.name = req.body.name;
      res.json(name);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// 删除name
export const deleteName = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  names = names.filter((n) => n.id !== id);
  res.status(204).end();
};
