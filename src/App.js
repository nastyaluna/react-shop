import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(googleUser => {
      setUser(googleUser);
    });

    return () => unsubscribeFromAuth();
  });

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
