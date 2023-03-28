import React, { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policyChecked, setPolicyChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    if (!policyChecked) {
      setErrorMessage("You must accept the policy to continue.");
      return;
    }

    const requestBody = {
      name: name,
      phone: phone,
      email: email,
      password: password
    };

    fetch("https://api.example.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from API
        console.log(data);
      })
      .catch((error) => {
        setErrorMessage("Error signing up. Please try again.");
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSignup}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="phone">Phone Number:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <input
          type="checkbox"
          id="policyChecked"
          name="policyChecked"
          checked={policyChecked}
          onChange={(e) => setPolicyChecked(e.target.checked)}
        />
        <label htmlFor="policyChecked">
          I agree to the <a href="#">Privacy Policy</a>. 
        </label>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
