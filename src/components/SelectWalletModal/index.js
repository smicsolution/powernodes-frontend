import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { hideWalletModal } from '../../redux/actions/modal'

import './style.css'

const SelectWalletModal = ({ modal, hideWalletModal, connectMetaMask, disconnectMetaMask }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(modal.isVisibleWallet)
  }, [modal])

  const handleClose = () => {
    hideWalletModal();
  }

  return <React.Fragment>
    <Modal
      show={show}
      onHide={handleClose}
      keyboard={true}
    >
      <div className='select-wallet'>
        <p className="text-center cl-orange fw-bold">Selec your wallet</p>
        <div className="row gx-0 mx-0">
          <div className="col-6 d-flex justify-content-center right-border">
            <div className='text-center w-fit-content wallet-item' onClick={connectMetaMask}>
              <img src="assets/img/wallet/metamask.png" alt="metamask" className='wallet-img' />
              <p className='cl-bright mt-2'>MetaMask</p>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <div className="text-center w-fit-content wallet-item">
              <img src="assets/img/wallet/WalletConnect.png" alt="metamask" className='wallet-img' />
              <p className='cl-bright mt-2'>WalletConnect</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </React.Fragment >;
}


SelectWalletModal.propTypes = {
  hideWalletModal: PropTypes.func.isRequired,
  connectMetaMask: PropTypes.func.isRequired,
  disconnectMetaMask: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

export default connect(mapStateToProps, { hideWalletModal })(SelectWalletModal);