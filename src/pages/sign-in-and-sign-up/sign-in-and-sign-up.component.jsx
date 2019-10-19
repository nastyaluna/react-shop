import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-and-sign-up.styles.scss';


const SignInAndSignUpPage = ({ user, history }) => {

  useEffect(() => {
    if (user) history.push('/');
  });

  return (
    <div className='sign-in-and-sign-up'>
      <SignIn />
      <SignUp />
    </div>
  )
};

export default withRouter(SignInAndSignUpPage);
