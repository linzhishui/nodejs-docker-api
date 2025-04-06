# ========= 第一阶段：构建环境 =========
FROM node:18-alpine AS builder

# 1. 安装依赖
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install

# 2. 复制源码并编译
COPY tsconfig.json ./
COPY src ./src
 # 执行编译(依赖package.json中的build命令)
RUN npm run build 

# ========= 第二阶段：生产环境 =========
FROM node:18-alpine

# 1. 设置工作目录和环境变量
WORKDIR /app
ENV NODE_ENV=production

# 2. 从builder阶段复制必要文件
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
# 关键！只复制编译后的JS文件
COPY --from=builder /usr/src/app/dist ./dist

# 3. 暴露端口和启动
EXPOSE 2700
# 运行编译后的入口文件
CMD ["node", "dist/app.js"]