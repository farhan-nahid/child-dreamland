import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import initializeAuthentication from '../components/AuthComponents/Firebase/firebase.init';
import { postUsersAsync } from '../feathers/usersSlice';

const useFirebase = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [disableLoading, setIsDisableLoading] = useState(false);
  const dispatch = useDispatch();

  initializeAuthentication();
  const auth = getAuth();

  // email password signUp function

  const emailSignup = (user, navigate) => {
    setIsDisableLoading(true);
    const loading = toast.loading('Creating User... Please wait!!!');
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          photoURL: user.userImage,
          displayName: user.fullName,
        });
        sendEmailVerification(auth.currentUser);
        dispatch(postUsersAsync(user)).then((res) => {
          if (res.payload.insertedId) {
            toast.dismiss(loading);
            toast.success('Creating a new user successfully...');
            setLoggedInUser(userCredential.user);
            navigate('/');
            setIsDisableLoading(false);
          }
        });
      })
      .catch((error) => {
        toast.dismiss(loading);
        toast.error(error.message);
        setIsDisableLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  // email password signIn function

  const emailSignIn = (email, password, navigate, location) => {
    setIsDisableLoading(true);
    const loading = toast.loading('Finding Account... Please wait!!!');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.dismiss(loading);
        toast.success('logged in successfully...');
        setLoggedInUser(userCredential.user);
        const redirect_URI = location.state?.from || '/';
        navigate(redirect_URI);
        setIsDisableLoading(false);
      })
      .catch((error) => {
        toast.dismiss(loading);
        toast.error(error.message);
        setIsDisableLoading(false);
      })
      .finally(() => setIsLoading(false));
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
        getIdToken(user).then((idToken) => {
          localStorage.setItem('ePATHSHALA_token', idToken);
        });
      }
      setIsLoading(false);
    });
    return () => unSubscrived;
  }, [auth]);

  // Check Admin or not

  useEffect(() => {
    axios
      .get(`https://e--pathshala.herokuapp.com/user?email=${loggedInUser?.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ePATHSHALA_token')}`,
        },
      })
      .then((res) => setIsAdmin(res.data.admin))
      .catch((err) => toast.error(err.message))
      .finally(() => setIsLoading(false));
  }, [loggedInUser?.email]);

  return {
    isLoading,
    loggedInUser,
    isAdmin,
    disableLoading,
    emailSignup,
    emailSignIn,
    logOut,
  };
};

export default useFirebase;
