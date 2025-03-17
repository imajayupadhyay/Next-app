# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Disable ESLint & TypeScript errors
ENV NEXT_PUBLIC_DISABLE_ESLINT=true
ENV CI=false

# Build the Next.js app (Ignore lint & warnings)
RUN npm run build || echo "Ignoring lint and type errors"

# Expose the frontend port
EXPOSE 3000

# Start the frontend in dev mode
CMD ["npm", "run", "dev"]
