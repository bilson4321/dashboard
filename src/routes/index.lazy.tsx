import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Login,
});

function Login() {
  const navigate = useNavigate({ from: "/" });

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-lg shadow-lg bg-white p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome to the app</h1>
            <p className="text-lg">
              Please enter your credentials to access the dashboard
            </p>
            <div className="my-4">
              <input
                type="text"
                className="border-2 border-gray-300 p-2 mt-4 w-full rounded-lg"
                placeholder="Username"
              />
              <input
                type="password"
                className="border-2 border-gray-300 p-2 mt-4 w-full rounded-lg"
                placeholder="Password"
              />
            </div>
            <button
              onClick={() => navigate({ to: "/dashboard" })}
              className="bg-blue-500 text-white p-2 rounded-lg w-full"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
