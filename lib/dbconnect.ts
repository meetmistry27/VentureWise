import mongoose from 'mongoose';

console.log("1");

const MONGODB_URI = process.env.MONGODB_URI as string;
console.log("2");

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}
console.log("3");

// 👇 Define a type for the cached connection object
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// 👇 Extend the global type properly
declare global {
  // Allow global `mongoose` cache to exist
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache;

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}
cached = global.mongooseCache;

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
