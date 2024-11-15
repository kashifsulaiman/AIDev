# AiDev-Server

## Node Version
- **Version:** v20.13.1

## Installation
To install the necessary dependencies, run the following command:

```bash
npm install

## Running the app

```bash
# Development Mode:
$ npm run start

# Watch Mode (auto-restart on file changes):
$ npm run start:dev
````



## PROJECT INFO
- **Backend Framework:** Nest.js
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Additional Features:**
   - Migrations
   - Seeders
   - Swagger API Documentation

## MIGRATIONS
Manage database migrations with the following commands:
  1. Create a Migration File:  
   ````npm run migration:create -n ./src/migrations/migrationfilename````  
   *This command creates a file for manually generating a migration.*  
  
  2. Generate Migration Automatically:  
   ````npm run migration:generate -n ./src/migrations/migrationfilename -e path/to/YourEntity.ts````  
   *This command automatically generates a migration file for a specified entity/table.*
  3. Run Migrations:  
   ````npm run migration:run````  
   *This command executes all pending migrations.*

## Important Instructions
   1. Stop Tracking any committed file from git
      ````
      git rm env.staging --cached
      git commit -m "Stopped tracking env.staging"
      ````


