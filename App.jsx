import React, { useState } from "react";
import { registerUser, loginUser, getProfile } from "./api.js";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");

    try {
      const result =
        mode === "login"
          ? await loginUser({
              email: form.email,
              password: form.password
            })
          : await registerUser(form);

      setMessage(result.message || "Done.");

      if (result.token) {
        localStorage.setItem("token", result.token);
        setUser(result.user);
      }
    } catch {
      setMessage("Backend connection failed.");
    }
  };

  const profile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    try {
      const result = await getProfile(token);

      if (result.user) {
        setUser(result.user);
        setMessage(`Welcome, ${result.user.name}!`);
      } else {
        setMessage(result.message || "Unable to load profile.");
      }
    } catch {
      setMessage("Backend connection failed.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMessage("Logged out successfully.");
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          Nova<span>Stack</span>
        </div>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => scrollTo("home")}>Home</button>
          <button onClick={() => scrollTo("features")}>Features</button>
          <button onClick={() => scrollTo("account")}>Account</button>
          <button
            className="nav-cta"
            onClick={() => scrollTo("account")}
          >
            Get Started
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="orb orb-one"></div>
          <div className="orb orb-two"></div>

          <div className="hero-content">
            <div className="badge">⚡ FULL-STACK READY</div>

            <h1>
              Build.
              <br />
              Connect.
              <br />
              <span>Launch.</span>
            </h1>

            <p>
              A modern React frontend connected to a Node.js,
              Express and MongoDB-ready backend.
            </p>

            <div className="hero-buttons">
              <button
                className="primary"
                onClick={() => scrollTo("account")}
              >
                Start Now →
              </button>

              <button
                className="secondary"
                onClick={() => scrollTo("features")}
              >
                Explore Features
              </button>
            </div>
          </div>

          <div className="code-card">
            <div className="code-header">
              <div>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <span>api.js</span>
            </div>

            <pre>{`POST /api/users/login

{
  "email": "user@email.com",
  "password": "••••••••"
}

✓ JWT authenticated
✓ API connected
✓ MongoDB ready`}</pre>
          </div>
        </section>

        <section id="features" className="section">
          <div className="section-title">
            <span>FEATURES</span>
            <h2>Everything you need</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div>⚛️</div>
              <h3>React Frontend</h3>
              <p>
                Modern, responsive and component-based interface.
              </p>
            </article>

            <article className="feature-card">
              <div>⚙️</div>
              <h3>Express API</h3>
              <p>
                Backend API ready to communicate with your frontend.
              </p>
            </article>

            <article className="feature-card">
              <div>🔐</div>
              <h3>JWT Auth</h3>
              <p>
                Login, registration and protected user profile.
              </p>
            </article>

            <article className="feature-card">
              <div>🗄️</div>
              <h3>MongoDB Ready</h3>
              <p>
                Connect local MongoDB or MongoDB Atlas.
              </p>
            </article>
          </div>
        </section>

        <section id="account" className="section account">
          <div className="account-info">
            <span>ACCOUNT</span>
            <h2>Test your API</h2>
            <p>
              Register or login below. This form communicates
              directly with your Node.js backend.
            </p>
          </div>

          <div className="auth-card">
            <div className="tabs">
              <button
                className={mode === "login" ? "active" : ""}
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
              >
                Login
              </button>

              <button
                className={mode === "register" ? "active" : ""}
                onClick={() => {
                  setMode("register");
                  setMessage("");
                }}
              >
                Register
              </button>
            </div>

            <form onSubmit={submit}>
              {mode === "register" && (
                <input
                  name="name"
                  placeholder="Full name"
                  value={form.name}
                  onChange={update}
                  required
                />
              )}

              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={update}
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={update}
                required
                minLength="6"
              />

              <button className="primary full" type="submit">
                {mode === "login"
                  ? "Login"
                  : "Create Account"}
              </button>
            </form>

            <div className="status">{message}</div>

            {user && (
              <div className="user-actions">
                <button onClick={profile}>
                  Protected Profile
                </button>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer>
        © 2026 NovaStack — Full-Stack Website
      </footer>
    </div>
  );
}