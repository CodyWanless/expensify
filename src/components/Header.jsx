import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export default function Header() {
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <h1>Expensify</h1>
          </Link>
          <button
            onClick={() => dispatch(startLogout())}
            className="button button--link"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
