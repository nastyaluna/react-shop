import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  resetState = () => {
    this.setState({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
      );

      await createUserProfileDocument(user, { email });

      this.resetState();
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password, confirmPassword } = this.state;
    return (
        <div className='sign-up'>
          <h2 className='title'>Register</h2>
          <form className='sign-up-form' onSubmit={this.handleSubmit}>
            <FormInput
                type='email'
                name='email'
                value={email}
                onChange={this.handleChange}
                label='Email'
                required
            />
            <FormInput
                type='password'
                name='password'
                value={password}
                onChange={this.handleChange}
                label='Password'
                required
            />
            <FormInput
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={this.handleChange}
                label='Confirm Password'
                required
            />
            <CustomButton type='submit'>DONE</CustomButton>
          </form>
        </div>
    );
  }
}

export default SignUp;