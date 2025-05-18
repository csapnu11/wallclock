# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Expose the default Next.js port (3000)
EXPOSE 3000

# Step 7: Build the Next.js app (optional, but good for production)
RUN npm run build

# Step 8: Start the Next.js app
CMD ["npm", "start"]

