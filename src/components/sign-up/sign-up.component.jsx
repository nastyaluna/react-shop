import React, { useState } from 'react';
import  { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { register } from '../../redux/user/user.actions';
import './sign-up.styles.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const resetState = () => {
    setEmail('');
    setPassword('');
    setConfirmedPassword('');
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmedPassword) {
      alert("Passwords don't match");
      return;
    }

    const authorized = await register(email, password, confirmedPassword);
    if (authorized) resetState();
  };

  return (
      <div className='sign-up'>
        <h2 className='title'>Register</h2>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
              type='email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              label='Email'
              required
          />
          <FormInput
              type='password'
              name='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              label='Password'
              required
          />
          <FormInput
              type='password'
              name='confirmPassword'
              value={confirmedPassword}
              onChange={e => setConfirmedPassword(e.target.value)}
              label='Confirm Password'
              required
          />
          <CustomButton type='submit'>DONE</CustomButton>
        </form>
      </div>
  );
};

export default connect(null, { register })(SignUp);