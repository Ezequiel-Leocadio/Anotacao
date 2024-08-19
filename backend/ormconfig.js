const dotevnt = require("dotenv");

dotevnt.config({
  path: String(process.env.NODE_ENV) === "dev" ? ".env.dev" : ".env.production",
  //   path: ".env.dev",
});

console.log(process.env.NODE_ENV);

module.exports = [
  {
    // name: "dbmysql",
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "notas",
    migrations: [process.env.TYPEORM_MIGRATION],
    entities: [process.env.TYPEORM_ENTITIES],
    cli: {
      migrationsDir: process.env.TYPEORM_MIGRATION_DIR,
      entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    },
  },
];
