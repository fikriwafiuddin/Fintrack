import { Link } from "react-router-dom"

function Register() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Enter your email"
            required
          />
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Enter your username"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Enter your password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPasswor"
            name="confirmPassword"
            type="password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Enter your confirmPassword"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
