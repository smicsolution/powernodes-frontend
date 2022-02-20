import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { hideRPCModal } from '../../redux/actions/modal'

import isEmpty from '../../utils/is-empty'

import './style.css'

import Copyable from '../Copyable'

const RPCModal = ({ rpc, hideRPCModal, modal }) => {
  const [show, setShow] = useState(true);
  const [copiedText, setCopiedText] = useState("");
  const [nodeId, setNodeId] = useState();

  useEffect(() => {
    const res = rpc.RPCs.filter(item => {
      return item.checksum == modal.checksum;
    })

    if (!isEmpty(res))
      setNodeId(res[0].node_id);
  }, [rpc, modal])

  useEffect(() => {
    setShow(modal.isVisibleRPC);
  }, [modal])

  const handleClose = () => {
    hideRPCModal();
  }

  let nodeImg;

  if (modal.tier === "Wind") {
    nodeImg = "assets/img/node/wind.png";
  } else if (modal.tier === "Hydro") {
    nodeImg = "assets/img/node/hydro.png";
  } else if (modal.tier === "Solar") {
    nodeImg = "assets/img/node/solar.png";
  } else if (modal.tier === "Nuclear") {
    nodeImg = "assets/img/node/nuclear.png";
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      keyboard={true}
      centered
      className="rpc-modal"
    >
      <div className="rpc-field">
        <div className='text-center'>
          <img src={`${nodeImg}`} alt="node_img" className='node-img' />
          <p className="mb-0 mt-1 cl-white-80 fw-bold fs-5">{modal.tier}</p>
        </div>
        <Copyable
          copiedText={copiedText}
          setCopiedText={setCopiedText}
          text={`https://rpc.powernode.io/node/${nodeId}`}
        />
        <Copyable
          copiedText={copiedText}
          setCopiedText={setCopiedText}
          text={`wss://rpc.powernode.io/node/${nodeId}`}
        />

        <div className="d-flex justify-content-center mt-4">
          <a href="https://powernodes.medium.com/how-to-add-power-node-rpc-to-metamask-be764651f4f2" target="_blank" className='text-center cl-orange'>How to use endpoints</a>
        </div>
      </div>
    </Modal>
  )
}

RPCModal.propTypes = {
  hideRPCModal: PropTypes.func.isRequired,
  rpc: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    rpc: state.rpc,
    modal: state.modal,
  }
}

export default connect(mapStateToProps, { hideRPCModal })(RPCModal);