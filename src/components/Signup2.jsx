import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "@/context/AuthContext";

const Signup2 = ({
  heading = "Signup",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "/logo.png",
    alt: "logo",
    title: "Mern Notes",
  },
  buttonText = "Create Account",
  signupText = "Already a user?",
  signupUrl = "/login",
}) => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res= await register(form); // form has username, email, password
      navigate("/");
      localStorage.setItem("user",form.username);
      localStorage.setItem("token",res.token);
      localStorage.setItem("email",form.email);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          {/* Logo */}
          <a href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-20 dark:invert"
            />
          </a>
          <form
            onSubmit={handleSubmit}
            className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md"
          >
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <div className="flex w-full flex-col gap-2">
              <Label>User Name</Label>
              <Input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="user name"
                className="text-sm"
                required
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>Email</Label>
              <Input
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="text-sm"
                name="email"
                required
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>Password</Label>
              <Input
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="text-sm"
                name="password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
          </form>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <Link
              to={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup2;

Signup2.propTypes = {
  heading: PropTypes.string,
  logo: PropTypes.shape({
    url: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  googleText: PropTypes.string,
  signupText: PropTypes.string,
  signupUrl: PropTypes.string,
};
