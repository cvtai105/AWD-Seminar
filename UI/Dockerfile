# Sử dụng hình ảnh node chính thức
FROM node:latest

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng Vite (nếu bạn chạy ở chế độ production)
RUN npm run build

# Cấu hình port để expose
EXPOSE 5173

# Lệnh mặc định để chạy ứng dụng (chạy ở chế độ dev)
CMD ["npm", "run", "dev", "--", "--host"]
