import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      alert("Verification email sent. Please verify before logging in.");
    } catch (error: any) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="bg-gray-700">
      <div className="flex min-h-screen items-center justify-center">
        <div className="min-h-1/2 bg-gray-900 border border-gray-900 rounded-2xl">
          <div className="sm:mx-24 md:mx-34 lg:mx-56 mx-auto flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
            <h1 className="text-white text-2xl mb-6">Register</h1>
            <input
              className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 focus:border-blue-700"
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full p-2 bg-gray-900 rounded-md border border-gray-700"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border border-gray-700"
              type="button"
              onClick={handleRegister}
            >
              Register
            </button>
            <p>
              Already have an account?
              <a className="font-semibold text-sky-700" href="/login">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
