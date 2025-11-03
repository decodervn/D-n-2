export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
  Admin Login
</h1>

        <input
          type="email"
          placeholder="Email"
          className="border w-full mb-4 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-4 p-2 rounded"
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Login now
        </button>
      </div>
    </div>
  );
}
