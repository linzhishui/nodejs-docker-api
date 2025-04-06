# 使用官方Node.js镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制依赖定义
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 2700

# 启动命令
CMD ["node", "app.js"]
