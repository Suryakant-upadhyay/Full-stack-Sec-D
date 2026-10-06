import React, { useState } from "react";

/* =========================================================
   LAB SHEET 05
   TASK 5.1 + TASK 5.2 + TASK 5.3
   ========================================================= */

/* ========================= TASK 5.1 =========================
   Password Strength Component
   Five rules:
   1. At least 8 characters
   2. Uppercase letter
   3. Lowercase letter
   4. Number
   5. Special character
   ========================================================= */

function PasswordStrength({ password }) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let strength = "Very Weak";
  if (score === 2) strength = "Weak";
  if (score === 3) strength = "Medium";
  if (score === 4) strength = "Strong";
  if (score === 5) strength = "Very Strong";

  return (
    <div className="strength-container">
      <div className="strength-top">
        <span>Password Strength</span>
        <strong>{strength}</strong>
      </div>

      <div className="strength-bar">
        <div
          className="strength-progress"
          style={{ width: `${score * 20}%` }}
        />
      </div>

      <div className="rules">
        <p className={password.length >= 8 ? "valid" : "invalid"}>
          {password.length >= 8 ? "✓" : "✗"} At least 8 characters
        </p>
        <p className={/[A-Z]/.test(password) ? "valid" : "invalid"}>
          {/[A-Z]/.test(password) ? "✓" : "✗"} Uppercase letter
        </p>
        <p className={/[a-z]/.test(password) ? "valid" : "invalid"}>
          {/[a-z]/.test(password) ? "✓" : "✗"} Lowercase letter
        </p>
        <p className={/[0-9]/.test(password) ? "valid" : "invalid"}>
          {/[0-9]/.test(password) ? "✓" : "✗"} Number
        </p>
        <p className={/[^A-Za-z0-9]/.test(password) ? "valid" : "invalid"}>
          {/[^A-Za-z0-9]/.test(password) ? "✓" : "✗"} Special character
        </p>
      </div>
    </div>
  );
}

/* ========================= TASK 5.2 =========================
   Login Form Validation
   ========================================================= */

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  const validPassword = Object.values(rules).every(Boolean);

  function handleSubmit(event) {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!validPassword) {
      setMessage("Password does not meet security requirements.");
      return;
    }

    setMessage("Login Successfully!");
  }

  return (
    <div className="form-container">
      <div className="card-heading">
        <span className="task-badge">TASK 5.2</span>
        <h2>Login Form</h2>
        <p>Validate email and password before submission.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {email && !emailRegex.test(email) && (
          <span className="error">Invalid email format</span>
        )}

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <PasswordStrength password={password} />

        <button className="primary-btn full" type="submit">
          Login
        </button>

        {message && (
          <p className={message.includes("Successfully") ? "success" : "message"}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

/* ========================= TASK 5.3 =========================
   Step 1 — Personal Information
   ========================================================= */

function PersonalInfo({ data, updateData, nextStep }) {
  function handleNext() {
    if (!data.name.trim() || !data.age.trim()) return;
    nextStep();
  }

  return (
    <div>
      <h3>Step 1: Personal Information</h3>

      <label>Full Name</label>
      <input
        type="text"
        placeholder="Enter your full name"
        value={data.name}
        onChange={(event) => updateData({ name: event.target.value })}
      />

      <label>Age</label>
      <input
        type="number"
        placeholder="Enter your age"
        value={data.age}
        onChange={(event) => updateData({ age: event.target.value })}
      />

      <div className="wizard-actions end">
        <button className="primary-btn" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
}

/* ========================= TASK 5.3 =========================
   Step 2 — Account Information
   ========================================================= */

function AccountInfo({
  data,
  updateData,
  previousStep,
  nextStep
}) {
  function handleNext() {
    if (!data.email.trim() || !data.password.trim()) return;
    nextStep();
  }

  return (
    <div>
      <h3>Step 2: Account Information</h3>

      <label>Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        value={data.email}
        onChange={(event) => updateData({ email: event.target.value })}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter Password"
        value={data.password}
        onChange={(event) => updateData({ password: event.target.value })}
      />

      <div className="wizard-actions">
        <button className="secondary-btn" onClick={previousStep}>
          ← Back
        </button>
        <button className="primary-btn" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
}

/* ========================= TASK 5.3 =========================
   Step 3 — Confirmation
   ========================================================= */

function Confirmation({ data, previousStep, handleSubmit }) {
  return (
    <div>
      <h3>Step 3: Confirm Details</h3>

      <div className="confirmation">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Age:</strong> {data.age}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Password:</strong> ••••••••</p>
      </div>

      <div className="wizard-actions">
        <button className="secondary-btn" onClick={previousStep}>
          ← Back
        </button>
        <button className="primary-btn" onClick={handleSubmit}>
          Submit ✓
        </button>
      </div>
    </div>
  );
}

/* ========================= MAIN APP ========================= */

function App() {
  const [page, setPage] = useState("login");
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: ""
  });

  function updateData(newData) {
    setFormData((previousData) => ({
      ...previousData,
      ...newData
    }));
  }

  function handleSubmit() {
    alert("Registration completed successfully!");
    console.log("Submitted Data:", formData);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">FULL STACK LAB</p>
          <h1>React Form Validation</h1>
        </div>
        <div className="lab-number">LAB 05</div>
      </header>

      <nav className="task-nav">
        <button
          className={page === "login" ? "nav-btn active" : "nav-btn"}
          onClick={() => setPage("login")}
        >
          Task 5.1 + 5.2 · Login
        </button>

        <button
          className={page === "onboarding" ? "nav-btn active" : "nav-btn"}
          onClick={() => {
            setPage("onboarding");
            setStep(1);
          }}
        >
          Task 5.3 · Onboarding
        </button>
      </nav>

      {page === "login" && (
        <section className="workspace">
          <LoginForm />
        </section>
      )}

      {page === "onboarding" && (
        <section className="workspace">
          <div className="form-container">
            <div className="card-heading">
              <span className="task-badge">TASK 5.3</span>
              <h2>User Onboarding</h2>
              <p>Complete all three steps to finish registration.</p>
            </div>

            <div className="stepper">
              {[1, 2, 3].map((number) => (
                <div
                  className={step >= number ? "step active" : "step"}
                  key={number}
                >
                  <span>{number}</span>
                  <small>
                    {number === 1
                      ? "Personal"
                      : number === 2
                      ? "Account"
                      : "Confirm"}
                  </small>
                </div>
              ))}
            </div>

            {step === 1 && (
              <PersonalInfo
                data={formData}
                updateData={updateData}
                nextStep={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <AccountInfo
                data={formData}
                updateData={updateData}
                previousStep={() => setStep(1)}
                nextStep={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <Confirmation
                data={formData}
                previousStep={() => setStep(2)}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        </section>
      )}

      <footer>
        Suryakant Upadhyay · Full Stack Lab · Lab Sheet 05
      </footer>
    </main>
  );
}

export default App;
