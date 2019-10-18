import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { useLocation } from 'react-router-dom';

import './header.styles.scss';

const Header = ({ user }) => {
  const location = useLocation();

  return (
      <div className='header'>
        <Link className='logo-container' to='/'>
          <Logo className='logo' />
        </Link>
        <div className='options'>
          <Link className='option' to='/shop'>
            SHOP
          </Link>
          <Link className='option' to='/shop'>
            CONTACT
          </Link>
          {!user && location.pathname !== '/' && (
            <Link className='option' to='/signin'>
              SIGN IN
            </Link>
          )}
          {user && (
            <div className="option" onClick={() => auth.signOut()}>
              SIGN OUT
            </div>
          )}
        </div>
      </div>
  )
};

export default Header;
