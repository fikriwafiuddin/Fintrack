import { MongoMemoryReplSet } from "mongodb-memory-server"
import mongoose from "mongoose"
import { afterAll, afterEach, beforeAll, vi } from "vitest"

let mongo = null

beforeAll(async () => {
  // Clear any existing vi mocks
  vi.clearAllMocks()

  mongo = await MongoMemoryReplSet.create({ replSet: { count: 1 } })
  const uri = mongo.getUri()
  await mongoose.connect(uri)
})

afterEach(async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
})

afterAll(async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongo.stop()
  }
})

// Mock clerk if needed
vi.mock("@clerk/express", () => ({
  requireAuth: () => (req, res, next) => {
    req.auth = () => ({ userId: "test-user-id" })
    next()
  },
  clerkMiddleware: () => (req, res, next) => {
    req.auth = () => ({ userId: "test-user-id" })
    next()
  },
}))
