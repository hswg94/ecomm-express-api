# Use the official Node.js image as the base image
FROM node:23-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the application and bind it to 0.0.0.0
# CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
CMD ["npm", "run", "start"]