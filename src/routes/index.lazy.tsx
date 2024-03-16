import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Login,
});

function Login() {
  const navigate = useNavigate({ from: "/" });
  return (
    <div className="p-2">
      <h3>Login</h3>
      <div>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <button onClick={() => navigate({ to: "/dashboard" })}>Login</button>
      </div>
    </div>
  );
}
