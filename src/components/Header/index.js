import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { FaAlignJustify } from 'react-icons/fa'
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Affix } from 'antd'
import { useResizeDetector } from 'react-resize-detector'
import { useWeb3React } from "@web3-react/core";

import { injected } from "../../constants/WalletConnectors";

import { showWalletModal, hideWalletModal } from '../../redux/actions/modal'
import { setAccount } from '../../redux/actions/account'
import { setHeaderHeight } from '../../redux/actions/headerHeight'

import SelectWalletModal from '../SelectWalletModal'

import notify from '../../utils/notify';

import './style.css'


const Header = ({ showWalletModal, hideWalletModal, setAccount, setHeaderHeight }) => {
  const { activate, deactivate, account } = useWeb3React();

  const [isConnecting, setConnecting] = useState(false)
  const [myAccount, setMyAccount] = useState(undefined);

  const { width, height, ref } = useResizeDetector();

  // useEffect(() => {
  //   setAccount(account)
  // }, [account])

  useEffect(() => {
    setHeaderHeight(height);
  }, [height])

  const showSelectWalletModal = () => {
    showWalletModal()
  }

  const connectMetaMask = async () => {
    if (!isConnecting) {
      setConnecting(true);

      if (window.ethereum === undefined) {
        notify("Warning!", "Please install Metamask on your browser.", "warning");
        setConnecting(false);
        return;
      }

      // const web3 = new Web3(window.ethereum);
      // const chainId = await web3.eth.getChainId();
      const chainId = window.ethereum.networkVersion;
      console.log({ chainId: chainId })

      if (chainId !== '250') {
        notify("Warning!", "Please switch to Fantom network.", "warning");
        setConnecting(false);
        return;
      }

      try {
        await activate(injected);
        setAccount(account);
        setMyAccount(account);
        hideWalletModal();
        setConnecting(false);
      } catch (ex) {
        setConnecting(false);
        console.log(ex)
      }
    }
  }

  const disconnectMetaMask = async () => {
    try {
      await deactivate();
      setMyAccount(undefined);
      setAccount(undefined);
    } catch (ex) {
      console.log(ex)
    }
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
                <Nav className='d-flex align-items-center'>
                  {myAccount ? (
                    <span className='cl-gray ms-4'>{myAccount.substr(0, 7)}...{myAccount.slice(-4)}</span>
                  ) : null}
                  <button type='button' className='dark-btn ms-4 my-2'>
                    <img src="assets/img/icons/power.png" alt="power" className='btn-preimg' />
                    <span className='cl-orange-gd mx-4 fw-bold text-center w-full'>Buy Power</span>
                  </button>
                  {myAccount ? (
                    <button type='button' className='orange-btn ms-4 my-2' onClick={disconnectMetaMask}>
                      <img src="assets/img/icons/connect2.png" alt="connect2" className='btn-preimg' />
                      <span className='cl-black mx-4 fw-bold text-center w-full'>Disconnect Wallet</span>
                    </button>
                  ) : (
                    <button type='button' className='orange-btn ms-4 my-2' onClick={showSelectWalletModal}>
                      <img src="assets/img/icons/connect2.png" alt="connect2" className='btn-preimg' />
                      <span className='cl-black mx-4 fw-bold text-center w-full'>Connect Wallet</span>
                    </button>
                  )}
                </Nav >
              </Navbar.Collapse >
            </div >

          </div>
        </Navbar>
      </Affix>
      <SelectWalletModal connectMetaMask={connectMetaMask} disconnectMetaMask={disconnectMetaMask} />
    </React.Fragment>
  );
}

Header.propTypes = {
  showWalletModal: PropTypes.func.isRequired,
  hideWalletModal: PropTypes.func.isRequired,
  setHeaderHeight: PropTypes.func.isRequired,
  setAccount: PropTypes.func.isRequired,
};

export default connect(null, { showWalletModal, hideWalletModal, setHeaderHeight, setAccount })(Header);