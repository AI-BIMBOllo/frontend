# Use an official Node.js image as the base
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Install only production dependencies
RUN npm prune --production

# Use a lightweight Node.js image for the runtime
FROM node:22-alpine AS runner

# Set environment variables for Next.js
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy the built app and production dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the Next.js app
CMD ["npm", "start"]
