import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import './App.less';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './pages/Dashboard';
import Farms from './pages/Farms';
import Header from './components/Header';
import SideMenu from './components/SideMenu';

const App = ({ sidebar, header }) => {
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
      <div className="app" style={{ minHeight: `${sidebar.sidebarHeight + header.headerHeight + 50}px` }}>
        <Header />
        <SideMenu />
        <div className="content">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/farms" component={Farms} />
            <Redirect from='/' to='/dashboard' />
          </Switch>
        </div>
        {showButton && (
          <div onClick={scrollToTop} className="back-to-top">
            <BsFillArrowUpCircleFill className='cl-orange' />
          </div>
        )}
        <ToastContainer
          closeButton={null}
          style={{ top: '100px' }}
        />
      </div>
    </React.Fragment>
  );
}

App.propTypes = {
  sidebar: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    sidebar: state.sidebar,
    header: state.header,
  }
}


export default connect(mapStateToProps)(withRouter(App));