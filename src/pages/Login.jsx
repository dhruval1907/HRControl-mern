const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 space-y-4">
        
        <h1 className="text-2xl font-bold text-center bg-red-200 py-2">
          HR Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-10 py-20 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;
