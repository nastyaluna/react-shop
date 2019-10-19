import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  payload: user
});

export const login = (email, password) => async dispatch => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    if (user) dispatch(setCurrentUser(user));
  } catch (e) {
    console.error(e);
  }
};

export const register = (email, password, confirmedPassword) => async dispatch => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await createUserProfileDocument(user, { email });
  } catch (error) {
    console.error(error);
  }
};