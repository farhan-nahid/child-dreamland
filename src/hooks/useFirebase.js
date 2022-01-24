import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import initializeAuthentication from '../components/AuthComponents/Firebase/firebase.init';

const useFirebase = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //   const [isAdmin, setIsAdmin] = useState(false);

  initializeAuthentication();
  const auth = getAuth();

  // email password signUp function

  const emailSignup = (user, navigate) => {
    const loading = toast.loading('Creating User... Please wait!!!');
    createUserWithEmailAndPassword(auth, user.email, user.pass1)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          photoURL: user.image,
          displayName: user.fullName,
        });
        saveUserForEmail(user);
        toast.dismiss(loading);
        toast.success('Creating a new user successfully...');
        setLoggedInUser(userCredential.user);
        navigate('/');
      })
      .catch((error) => {
        toast.dismiss(loading);
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // email password signIn function

  const emailSignIn = (email, password, navigate, location) => {
    const loading = toast.loading('Finding Account... Please wait!!!');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.dismiss(loading);
        toast.success('logged in successfully...');
        setLoggedInUser(userCredential.user);
        const redirect_URI = location.state?.from || '/';
        navigate(redirect_URI);
      })
      .catch((error) => {
        toast.dismiss(loading);
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // save user to mongoDB (Email)

  const saveUserForEmail = (user) => {
    axios
      .post('https://e--pathshala.herokuapp.com/user', user)
      .then((res) => {
        if (res.data.upsertedId) {
          toast.success('User Added in our Database Successfully!');
        }
      })
      .catch((err) => toast.error(err.message));
  };

  // signOut function

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setLoggedInUser(null);
        toast.error('Logged Out!!!');
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setIsLoading(false));
  };

  // observe user state change

  useEffect(() => {
    const unSubscrived = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
      }
      setIsLoading(false);
    });
    return () => unSubscrived;
  }, [auth]);

  // Check Admin or not

  /*   useEffect(() => {
    axios
      .get(`https://kacha-bazar.herokuapp.com/user/${loggedInUser?.email}`)
      .then((res) => setIsAdmin(res.data.admin))
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  }, [loggedInUser?.email]); */

  return {
    isLoading,
    loggedInUser,
    // isAdmin,
    emailSignup,
    emailSignIn,
    logOut,
  };
};

export default useFirebase;
