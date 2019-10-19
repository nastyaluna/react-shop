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

    unsubscribe = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const userRef = await createUserProfileDocument(authUser);

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
          <Route exact path='/'>
            <HomePage user={user}/>
          </Route>
          <Route path='/shop' component={ShopPage} />
          <Route path='/auth'>
            <SignInAndSignUpPage user={user}/>
          </Route>
        </Switch>
      </section>
  );
}

export default App;
