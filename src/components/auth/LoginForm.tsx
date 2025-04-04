import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {loginStart, loginSuccess, loginFailure} from "@/store/slices/authSlice";
import {users} from "@/services/mockData";
import {RootState} from "@/store";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Loader2} from "lucide-react";
import {authAPI} from "@/services/api";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isLoading, error} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginStart());

    // Mock authentication - in a real app, this would be an API call
    authAPI
      .login(email, password)
      .then((response) => {
        const {user, token} = response;
        dispatch(loginSuccess({user, token}));
        navigate(user.role === "admin" ? "/admin" : "/");
      })
      .catch((err) => {
        dispatch(loginFailure(err.response.data.message || "Login failed"));
      });
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-serif font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">Sign in to your account</p>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-8 pt-6 border-t text-center text-sm">
        <p className="text-muted-foreground">For demo purposes, use:</p>
        <p className="text-muted-foreground">
          Customer: customer@example.com / customer123
        </p>
        <p className="text-muted-foreground">
          Admin: admin@example.com / admin123
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
