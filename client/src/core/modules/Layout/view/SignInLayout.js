import React from 'react';

import './styles.css';

function SignInLayout({ children }) {
  return (
    <div id="login-container" className="w-100 h-100">
      <div className="d-flex align-items-center justify-content-center w-100 h-100">{children}</div>
    </div>
  );
}

export default SignInLayout;
