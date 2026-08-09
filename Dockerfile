FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy project files
COPY . .

# Build the project
RUN pnpm build

# Expose port
EXPOSE 3000

# Start the server
CMD ["pnpm", "start"]
