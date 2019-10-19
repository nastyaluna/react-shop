import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import { login } from '../../redux/user/user.actions';
import './sign-in.styles.scss';


const SignIn = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const authorized = login(email, password);

    if (authorized) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='sign-in'>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={e => setEmail(e.target.value)}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={e => setPassword(e.target.value)}
          label='password'
          required
        />
        <CustomButton type='submit' block>DONE</CustomButton>
        <CustomButton onClick={signInWithGoogle} color='blue' block>
          Google
        </CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password))
});

export default connect(null, mapDispatchToProps)(SignIn);
