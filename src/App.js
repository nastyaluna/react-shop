import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import './App.css';


function App({ currentUser }) {
  useEffect(() => {
    let unsubscribe = null;

    unsubscribe = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const userRef = await createUserProfileDocument(authUser);

        userRef.onSnapshot(snapShot => {
          if (snapShot) {
            const data = {
              id: snapShot.id,
              ...snapShot.data()
            };
            setCurrentUser(data);
          }
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
      <section className="app">
        <Header user={currentUser}/>
        <Switch>
          <Route exact path='/'>
            <HomePage user={currentUser}/>
          </Route>
          <Route path='/shop' component={ShopPage} />
          <Route path='/auth'>
            <SignInAndSignUpPage user={currentUser}/>
          </Route>
        </Switch>
      </section>
  );
}

const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser });

export default connect(mapStateToProps, { setCurrentUser })(App);
