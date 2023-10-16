# Use Node.js image
FROM node:14

# Create and set a working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app source code
COPY . .

# Expose the port the app will run on
EXPOSE 6000

# Command to run the application
CMD ["node", "app.js"]


