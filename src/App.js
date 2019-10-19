import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribe = null;

    unsubscribe = auth.onAuthStateChanged(async googleUser => {
      if (googleUser) {
        const userRef = await createUserProfileDocument(googleUser);

        userRef.onSnapshot(snapShot => {
          if (snapShot) {
            const data = {
              id: snapShot.id,
              ...snapShot.data()
            };
            setUser(data);
          }
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
      <section className="app">
        <Header user={user}/>
        <Switch>
          <Route
              exact path='/'
              component={user ? HomePage : SignInAndSignUpPage}
          />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </section>
  );
}

export default App;
