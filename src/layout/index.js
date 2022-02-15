import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { useResizeDetector } from 'react-resize-detector'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { showSideMenu, hideSideMenu } from '../redux/actions/sidemenu'
import { setContentWidth } from '../redux/actions/contentScreen'

import './style.css'

import SideMenu from '../components/SideMenu';
import Dashboard from '../pages/Dashboard';
import Farms from '../pages/Farms';

const MainLayout = ({ showSideMenu, hideSideMenu, setContentWidth, screen }) => {
  const { width, height, ref } = useResizeDetector();

  const [pagesPadding, setPagesPadding] = useState("1.5rem");

  useEffect(() => {
    if (screen.width <= 700) {
      hideSideMenu();
      setPagesPadding("1.5rem 1.5rem 1.5rem 50px");
    } else {
      showSideMenu();
      setPagesPadding("1.5rem");
    }
  }, [screen])

  useEffect(() => {
    setContentWidth(width);
  }, [width])

  return (
    <React.Fragment>
      <div className="d-flex">
        <div className="w-fit-content">
          <SideMenu />
        </div>
        <div className='pages' style={{ padding: `${pagesPadding}` }} ref={ref}>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/farms" component={Farms} />
            <Redirect from='/' to='/dashboard' />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

MainLayout.propTypes = {
  showSideMenu: PropTypes.func.isRequired,
  hideSideMenu: PropTypes.func.isRequired,
  setContentWidth: PropTypes.func.isRequired,
  screen: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    screen: state.screen
  }
}

export default connect(mapStateToProps, { showSideMenu, hideSideMenu, setContentWidth })(withRouter(MainLayout));