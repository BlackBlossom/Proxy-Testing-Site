# Use Node.js 18.9.1 as the base image
ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine
# Set the working directory
WORKDIR /app
# Copy the package.json and install dependencies
COPY package*.json .

RUN npm install
# Expose port 5173 for frontend
EXPOSE 5173
# Copy all other files
COPY . .
# Start the frontend server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]