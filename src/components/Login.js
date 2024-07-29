import React, { useRef, useState } from "react";
import Header from "./Header";
import { BG_IMG_URL } from "../utils/constant";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = () => {
    const nameValue = name.current ? name.current.value : "";
    const message = checkValidData(
      nameValue,
      email.current.value,
      password.current.value
    );
    setErrorMsg(message);

    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue,
            photoURL: "https://avatars.githubusercontent.com/u/67411415?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
             
            })
            .catch((error) => {
              setErrorMsg(error.message)
            });
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BG_IMG_URL})` }}
    >
      <Header />
      <div className="inset-0 flex items-center justify-center py-16">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md p-8 bg-black bg-opacity-80 text-white rounded-lg z-10"
        >
          <h1 className="font-bold text-3xl py-4 text-left">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              className="p-4 my-2 w-full bg-gray-700 rounded"
              ref={name}
              type="text"
              placeholder="Full Name"
            />
          )}
          <input
            className="p-4 my-2 w-full bg-gray-700 rounded"
            ref={email}
            type="email"
            placeholder="Email Address"
          />
          <input
            className="p-4 my-2 w-full bg-gray-700 rounded"
            ref={password}
            type="password"
            placeholder="Password"
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMsg}</p>
          <button
            className="p-4 my-4 bg-red-700 w-full rounded-lg"
            type="submit"
            onClick={handleSubmit}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to MoviesFlix? Sign Up Now"
              : "Already registered? Sign In now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
