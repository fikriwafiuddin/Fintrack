import React, { useState } from "react"

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    balance: 5000000,
  })

  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState(profile)

  const handleSave = () => {
    setProfile(form)
    setEditMode(false)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={form.name}
            disabled={!editMode}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full border rounded-lg px-3 py-2 ${
              editMode ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            disabled
            className="w-full border bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Balance
          </label>
          <input
            type="number"
            value={form.balance}
            disabled={!editMode}
            className="w-full border bg-gray-100 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex justify-between items-center pt-4">
          {editMode ? (
            <>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="text-gray-600 hover:underline"
                onClick={() => {
                  setForm(profile)
                  setEditMode(false)
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
