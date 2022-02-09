import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { FaAlignJustify } from 'react-icons/fa'
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Affix } from 'antd'
import { useResizeDetector } from 'react-resize-detector'

import { showWalletModal } from '../../redux/actions/modal'
import { setHeaderHeight } from '../../redux/actions/headerHeight'

import './style.css'

const Header = ({ showWalletModal, setHeaderHeight }) => {
  const { width, height, ref } = useResizeDetector();

  useEffect(() => {
    setHeaderHeight(height);
  }, [height])

  const showSelectWalletModal = () => {
    showWalletModal()
  }

  return (
    <React.Fragment>
      <Affix offsetTop={0}>
        <Navbar expand="md" className='header-bar py-3' ref={ref}>
          <div className="header-field">
            <NavbarBrand as={NavLink} to="/dashboard">
              <img src="assets/img/brand.png" alt="brand" className='brand-logo' />
            </NavbarBrand>

            <div className='text-end'>
              <Navbar.Toggle aria-controls="basic-navbar-nav">
                <FaAlignJustify className='cl-orange' />
              </Navbar.Toggle>
              <Navbar.Collapse id="basic-navbar-nav" className='text-center'>
                <Nav>
                  <button type='button' className='dark-btn ms-4 my-2'>
                    <img src="assets/img/icons/power.png" alt="power" className='btn-preimg' />
                    <span className='cl-orange-gd mx-4 fw-bold text-center w-full'>Add Token</span>
                  </button>
                  <button type='button' className='orange-btn ms-4 my-2' onClick={showSelectWalletModal}>
                    <img src="assets/img/icons/connect2.png" alt="connect2" className='btn-preimg' />
                    <span className='cl-black mx-4 fw-bold text-center w-full'>Connect Wallet</span>
                  </button>
                </Nav >
              </Navbar.Collapse >
            </div >

          </div>
        </Navbar>
      </Affix>
    </React.Fragment>
  );
}

Header.propTypes = {
  showWalletModal: PropTypes.func.isRequired,
  setHeaderHeight: PropTypes.func.isRequired
};

export default connect(null, { showWalletModal, setHeaderHeight })(Header);