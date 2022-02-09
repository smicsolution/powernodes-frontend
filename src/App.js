import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.less';

import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import SelectWalletModal from './components/SelectWalletModal';
import SideMenu from './components/SideMenu';

const App = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <React.Fragment>
      <div className="app">
        <Header />
        <SideMenu />
        <div className="content">
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            {/* <Route path="/whitepaper" component={WhitePaper} /> */}
            <Redirect from='/' to='/dashboard' />
          </Switch>
        </div>
        <SelectWalletModal />
        {showButton && (
          <div onClick={scrollToTop} className="back-to-top">
            <BsFillArrowUpCircleFill className='cl-orange' />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}


export default (withRouter(App));