import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ user }) => {
  const { pathname } = useLocation();
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

          {!user ? (
            pathname !== '/auth' && (
              <Link className='option' to='/auth'>
                  LOGIN
              </Link>
            )
          ) : (
            <div className="option" onClick={() => auth.signOut()}>
              LOGOUT
            </div>
            )}
        </div>
      </div>
  )
};

export default Header;
