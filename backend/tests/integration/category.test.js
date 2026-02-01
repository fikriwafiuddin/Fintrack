import { describe, expect, it } from "vitest"
import request from "supertest"
import app from "../../src/app.js"
import Category from "../../src/models/categoryModel.js"

describe("Category Routes Integration", () => {
  let userId = "test-user-id"

  describe("POST /categories", () => {
    it("should create a new category successfully", async () => {
      const payload = {
        name: "Food & Drinks",
        type: "expense",
        color: "#FF5733",
      }

      const response = await request(app).post("/categories").send(payload)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.name).toBe(payload.name)
    })

    describe("Validation Failures", () => {
      it("should return 400 if name is too short", async () => {
        const payload = { name: "Fo", type: "expense", color: "#FF5733" }
        const response = await request(app).post("/categories").send(payload)
        expect(response.status).toBe(400)
        expect(response.body.message).toContain("Validation error")
      })

      it("should return 400 if name is too long", async () => {
        const payload = {
          name: "a".repeat(51),
          type: "expense",
          color: "#FF5733",
        }
        const response = await request(app).post("/categories").send(payload)
        expect(response.status).toBe(400)
      })

      it("should return 400 if type is invalid", async () => {
        const payload = {
          name: "Valid Name",
          type: "invalid",
          color: "#FF5733",
        }
        const response = await request(app).post("/categories").send(payload)
        expect(response.status).toBe(400)
      })

      it("should return 400 if color is not a valid hex", async () => {
        const payload = { name: "Valid Name", type: "expense", color: "red" }
        const response = await request(app).post("/categories").send(payload)
        expect(response.status).toBe(400)
      })

      it("should return 400 if required fields are missing", async () => {
        const payload = { name: "Only Name" }
        const response = await request(app).post("/categories").send(payload)
        expect(response.status).toBe(400)
      })
    })
  })

  describe("GET /categories", () => {
    it("should return default and custom categories", async () => {
      await Category.create({
        name: "Default Food",
        type: "expense",
        color: "#000000",
        isDefault: true,
      })

      await Category.create({
        name: "User Hobby",
        type: "expense",
        color: "#FFFFFF",
        user: userId,
        isDefault: false,
      })

      const response = await request(app).get("/categories")

      expect(response.status).toBe(200)
      expect(
        response.body.data.defaultCategories.length,
      ).toBeGreaterThanOrEqual(1)
      expect(response.body.data.customCategories.length).toBe(1)
    })
  })

  describe("PUT /categories/:id", () => {
    it("should update an existing category", async () => {
      const category = await Category.create({
        name: "Old Name",
        type: "both",
        color: "#111111",
        user: userId,
      })

      const payload = {
        name: "New Name",
        type: "income",
        color: "#222222",
      }

      const response = await request(app)
        .put(`/categories/${category._id}`)
        .send(payload)

      expect(response.status).toBe(200)
      expect(response.body.data.name).toBe(payload.name)
    })

    describe("Validation Failures", () => {
      it("should return 400 if ID format is invalid", async () => {
        const payload = { name: "Valid Name", type: "income", color: "#222222" }
        const response = await request(app)
          .put("/categories/invalid-id")
          .send(payload)
        expect(response.status).toBe(400)
      })

      it("should return 400 if updated name is too short", async () => {
        const category = await Category.create({
          name: "Original",
          type: "both",
          color: "#111111",
          user: userId,
        })
        const payload = { name: "No", type: "income", color: "#222222" }
        const response = await request(app)
          .put(`/categories/${category._id}`)
          .send(payload)
        expect(response.status).toBe(400)
      })
    })
  })

  describe("DELETE /categories/:id", () => {
    it("should soft delete a category successfully", async () => {
      const category = await Category.create({
        name: "To Delete",
        type: "expense",
        color: "#333333",
        user: userId,
      })

      const response = await request(app).delete(`/categories/${category._id}`)

      expect(response.status).toBe(200)

      // Verify in DB with includeDeleted option
      const inDb = await Category.findOne({ _id: category._id }).setOptions({
        includeDeleted: true,
      })
      expect(inDb.deleted).toBe(true)
      expect(inDb.deletedAt).toBeDefined()
    })

    it("should return 400 if ID format is invalid", async () => {
      const response = await request(app).delete("/categories/invalid-id")
      expect(response.status).toBe(400)
    })

    it("should return 404 if category not found", async () => {
      const fakeId = "60f7c2f0f0f0f0f0f0f0f0f0"
      const response = await request(app).delete(`/categories/${fakeId}`)
      expect(response.status).toBe(404)
    })
  })
})
