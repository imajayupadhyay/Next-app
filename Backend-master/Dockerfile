# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy environment variables (Handled in GitHub Actions)
ARG DATABASE_URL
ARG TOKEN_SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV TOKEN_SECRET=$TOKEN_SECRET

# Run Prisma migrations and generate client
RUN npx prisma generate
RUN npx prisma migrate deploy

# Build TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]
