import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "@/context/AuthContext";

const Login1 = ({
  heading = "Login",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "/logo.png",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "/register",
}) => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form.email, form.password);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("Please Register Your Account")
      navigate('/register')
    }
  };
  return (
    <section className="flex h-full items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="m-4 w-full max-w-sm rounded-lg border p-6 shadow-lg sm:p-8"
      >
        <div className="space-y-6">
          {/* Logo and Heading */}
          <div className="flex flex-col items-center gap-4">
            <a href={logo.url}>
              <img src={logo.src} alt={logo.alt} className="h-10 w-10" />
            </a>
            {heading && <h1 className="text-2xl font-bold">{heading}</h1>}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="text-sm"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="text-sm"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
          </div>

          {/* Signup Link */}
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <Link
              to={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
export default Login1;
