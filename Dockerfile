# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src ./src
COPY tsconfig.json ./

# Build the TypeScript code
RUN npm run build

# Stage 2: Run
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Copy built files and node_modules from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Environment variable for API key
ENV SERP_API_KEY=your-api-key

# Expose port (if applicable)
EXPOSE 3000

# Run the application
CMD ["node", "dist/index.js"]
