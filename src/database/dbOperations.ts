process.loadEnvFile();
const dbUser: string = process.env.DB_USER;
const dbPassword: string = process.env.DB_PASSWORD;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.shlro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&socketTimeoutMS=20000&maxIdleTimeMS=50000`;

export const client = new MongoClient (uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  },
});