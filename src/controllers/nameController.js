// 模拟数据库
let names = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// 获取所有name
exports.getAllNames = (req, res) => {
  res.json(names);
};

// 获取单个name
exports.getNameById = (req, res) => {
  const id = parseInt(req.params.id);
  const name = names.find((n) => n.id === id);
  if (!name) return res.status(404).json({ error: 'Name not found' });
  res.json(name);
};

// 创建name
exports.createName = (req, res) => {
  const newName = {
    id: names.length + 1,
    name: req.body.name,
  };
  names.push(newName);
  res.status(201).json(newName);
};

// 更新name
exports.updateName = (req, res) => {
  const id = parseInt(req.params.id);
  const name = names.find((n) => n.id === id);
  if (!name) return res.status(404).json({ error: 'Name not found' });

  name.name = req.body.name;
  res.json(name);
};

// 删除name
exports.deleteName = (req, res) => {
  const id = parseInt(req.params.id);
  names = names.filter((n) => n.id !== id);
  res.status(204).end();
};
