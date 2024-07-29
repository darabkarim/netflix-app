import React, { useState, useEffect } from "react";
import { LOGO } from "../utils/constant";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="flex justify-between items-center absolute w-screen px-4 py-2 bg-gradient-to-b from-black z-20">
      <div>
        <img className="w-32 md:w-44" src={LOGO} alt="logo" />
      </div>
      {user && (
        <div className="relative">
          <div className="flex justify-between items-center px-4 mx-4 gap-4">
          <img
            src={user?.photoURL}
            alt="avatar"
            className="cursor-pointer w-12"
            onClick={toggleDropdown}
          />
          <h6 className="font-bold text-lg text-white">{user.displayName}</h6>
          </div>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
