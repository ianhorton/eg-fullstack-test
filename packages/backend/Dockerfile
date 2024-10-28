# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the NestJS app
RUN npm run build

# Step 7: Use a minimal Node.js image for production
FROM node:18-alpine

# Step 8: Set the working directory
WORKDIR /app

# Step 9: Copy only the built files and the node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Step 10: Expose the port the app runs on
EXPOSE 3000

# Step 11: Start the NestJS application
CMD ["node", "dist/main"]
