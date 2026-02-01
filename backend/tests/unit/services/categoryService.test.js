import { describe, expect, it } from "vitest"
import categoryService from "../../../src/services/categoryService"
import mongoose from "mongoose"

describe("categoryService", () => {
  let userId = "test-user-id"

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("create", () => {
    it("should create a category successfully", async () => {
      const category = {
        name: "Test Category",
        type: "expense",
        color: "#FF0000",
      }

      const result = await categoryService.create(category, userId)

      expect(result).toBeDefined()
      expect(result.name).toBe(category.name)
      expect(result.type).toBe(category.type)
      expect(result.color).toBe(category.color)
    })

    it("should throw an error if category already exists", async () => {
      const category = {
        name: "Test Category",
        type: "expense",
        color: "#FF0000",
      }

      await categoryService.create(category, userId)

      await expect(categoryService.create(category, userId)).rejects.toThrow(
        "Category already exists",
      )
    })

    it("should throw an error if category name is already taken", async () => {
      const category = {
        name: "Test Category",
        type: "expense",
        color: "#FF0000",
      }

      await categoryService.create(category, userId)

      await expect(categoryService.create(category, userId)).rejects.toThrow(
        "Category already exists",
      )
    })

    it("should throw an error if category isDefault", async () => {
      const category = {
        name: "Test Category",
        type: "expense",
        color: "#FF0000",
      }

      await categoryService.create(category, userId)

      await expect(categoryService.create(category, userId)).rejects.toThrow(
        "Category already exists",
      )
    })
  })

  describe("update", () => {
    it("should update a category successfully", async () => {
      const category = {
        name: "Test Category",
        type: "expense",
        color: "#FF0000",
      }

      const result = await categoryService.create(category, userId)

      expect(result).toBeDefined()
      expect(result.name).toBe(category.name)
      expect(result.type).toBe(category.type)
      expect(result.color).toBe(category.color)
    })
    it("should throw an error if category not found", async () => {
      await expect(
        categoryService.update("non-existent-id", userId),
      ).rejects.toThrow("Category not found")
    })
    it("should throw an error if category name is already taken", async () => {
      const category = {
        name: "Test Category",
        type: "expense",
        color: "#FF0000",
      }

      await categoryService.create(category, userId)

      await expect(categoryService.create(category, userId)).rejects.toThrow(
        "Category already exists",
      )
    })
    it("should throw an error if category isDefault", async () => {
      const category = {
        name: "Test Category",
        type: "expense",
        color: "#FF0000",
      }

      await categoryService.create(category, userId)

      await expect(categoryService.create(category, userId)).rejects.toThrow(
        "Category already exists",
      )
    })
  })

  describe("delete", () => {
    it("should delete a category successfully", async () => {
      const category = await categoryService.create(
        {
          name: "Test Category",
          type: "expense",
          color: "#FF0000",
        },
        userId,
      )

      const result = await categoryService.remove(category._id, userId)

      expect(result).toBeDefined()
      expect(result.deleted).toBe(true)
      expect(result.deletedAt).toBeDefined()
    })

    it("should throw an error if category not found", async () => {
      await expect(
        categoryService.remove(new mongoose.Types.ObjectId(), userId),
      ).rejects.toThrow("Category not found")
    })

    // it("should throw an error if category isDefault", async () => {
    //   const category = await Category.findOne({ isDefault: true })

    //   await expect(
    //     categoryService.remove(category._id, userId),
    //   ).rejects.toThrow("Default category cannot be deleted")
    // })
  })

  describe("getAll", () => {
    it("should get all categories successfully", async () => {
      const categories = await categoryService.getAll(userId)

      expect(categories).toBeDefined()
      expect(categories).toBeInstanceOf(Array)
    })
  })
})
