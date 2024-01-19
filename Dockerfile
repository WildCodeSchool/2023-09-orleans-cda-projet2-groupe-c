# Dockerfile

# This is the base image from which all other stages will inherit
FROM oven/bun:1 as base

# Set the working directory to /app
WORKDIR /app

# Create a new stage for installing dependencies
FROM base AS install
# Create a new directory for storing the project files
RUN mkdir -p /temp/prod
# Copy package.json and bun.lockb to the directory
COPY package.json bun.lockb /temp/prod/
# Copy the source code directory to the directory
COPY packages /temp/prod/packages 
# Change the working directory to the temporary directory and install dependencies
# Use frozen-lockfile to ensure that the lockfile is not updated
# Use ignore-scripts to ignore husky
RUN cd /temp/prod && bun install --frozen-lockfile --ignore-scripts

# Create a new stage for building the project
FROM install AS build
# Set the NODE_ENV environment variable to 'production'
ENV NODE_ENV=production
# Change the working directory to the directory and build the backend API
RUN cd /temp/prod && bun run build:backend:api

# Create a new stage for the final release
FROM base AS release
# Copy the node_modules directory from the install stage to the current stage
COPY --from=install /temp/prod/node_modules node_modules
# Copy the dist directory from the build stage to the current stage
COPY --from=build /temp/prod/packages/backend/api/dist .
# Change the user to 'bun'
USER bun
# Expose port 3333
EXPOSE 3333/tcp
# Set the command that will be run when the container starts
ENTRYPOINT [ "bun", "run", "index.js" ]