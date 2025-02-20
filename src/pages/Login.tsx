
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple test authentication
    if (email === "a" && password === "a") {
      toast.success("Successfully logged in!");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" alt="Logo" className="w-12 h-12 rounded-full object-cover" />
          <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="text-zinc-500">
            Log in to unlock tailored content and stay connected with your community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Email
            </label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Password
            </label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="keepSignedIn"
                checked={keepSignedIn}
                onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
              />
              <label
                htmlFor="keepSignedIn"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me signed in
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-zinc-500 hover:text-zinc-600">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-black/90">
            Sign in
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-zinc-500">Don't have an account? </span>
          <Link to="/register" className="text-black hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
