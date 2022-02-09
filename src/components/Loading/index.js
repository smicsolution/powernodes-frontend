import React from 'react';

import './style.css'

const Loading = () => {
  return (
    <React.Fragment>
      <div className="loading">
        <img src="assets/img/preloader.gif" alt="loading..." style={{ width: '15%' }} />
      </div>
    </React.Fragment>
  );
}

export default Loading;