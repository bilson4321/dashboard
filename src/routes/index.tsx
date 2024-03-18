import { useState } from "react";
import { flushSync } from "react-dom";
import { Button, TextInput } from "flowbite-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useAuth } from "../hooks/useAuth";

export const Route = createFileRoute("/")({
  component: Login,
});

function Login() {
  const auth = useAuth();
  const navigate = useNavigate({ from: "/" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (username && password) {
      flushSync(() => {
        auth.setUser(username);
      });

      navigate({ to: "/home" });
    } else {
      setError("Please enter a username and password");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-lg shadow-lg bg-white p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome to the app</h1>
            <p className="text-lg">
              Please enter your credentials to access the dashboard
            </p>
            <p className="text-sm text-gray-500">
              (Hint: You can use any username and password)
            </p>
            <p className="text-red-500">{error}</p>
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="mt-6 mb-2">
                <TextInput
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <TextInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <Button type="button" onClick={handleSubmit}>
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
