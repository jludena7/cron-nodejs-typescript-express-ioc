
## Skeleton CAC + Inversify + Typescript, MongoDb, Logger
Skeleton has everything you need to quickly start developing a cron jobs

### 1. What technologies has the application?

- CAC: Command And Conquer is a JavaScript library for building CLI apps
- Inversify: Inversion of control (IoC) container library for TypeScript
- Typescript: JavaScript typed programming language
- MongoDb: Database
- Logger: Library for logging

### 2. Steps to start and execution project
Up MongoDb container docker
```
docker compose up -d
```

### 3. Execution migration
The project has a migration directory with scripts and is required to be executed to test the application
```
npm run migrate-mongo up
```
### 4. Test application by command line

- Build the application from .ts to .js
```
npm run build
```

- Run cron via command line
```
npm run local -- check-product-stock --sku PR1000001 --min_stock 150
```
```
npm run local -- check-user-inactivity --email demo100@gmail.com
```

---

## Steps to create and execution migration MongoDb 
#### Create directory migration and file config:
 ```
npm run migrate-mongo migrate-mongo init
 ```
- Config mongodb connection in migrate-mongo-config.js

#### Create empty file migration:
```
npm run migrate-mongo create create-demo-collection
```

#### Up migration:
```
npm run migrate-mongo up
```

#### Down migration:
```
npm run migrate-mongo down
```

#### Check status migration:
```
npm run migrate-mongo status
```
