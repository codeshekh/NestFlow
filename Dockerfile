# Use the official Node.js image
FROM node:lts-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json, package-lock.json, and npm-shrinkwrap.json to the container
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install all dependencies (including dev dependencies for prisma generation)
RUN npm install --silent

# Copy all the remaining files (including prisma schema) into the container
COPY . .

# Generate the Prisma client (with the correct schema path)
RUN npx prisma generate --schema=prisma/schema.prisma

# Move installed packages to optimize the image
RUN mv node_modules ../

# Ensure proper ownership for node user
RUN chown -R node /usr/src/app

# Expose the application port
EXPOSE 4000

# Set the user to run the application
USER node

# Start the NestJS app
CMD ["npm", "run", "start:prod"]
