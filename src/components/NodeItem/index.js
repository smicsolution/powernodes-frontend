import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import './style.css'

const ETHUnit = 1e18;

const NodeItem = ({ type, name, rewards, generatorScreen }) => {
  let nameColor;

  const [btnTitle, setBtnTitle] = useState("Claim Rewards");
  const [rpcGrid, setRPCGrid] = useState("col-1");
  const [typeGrid, setTypeGrid] = useState("col-3");
  const [nameGrid, setNameGrid] = useState("col-4");
  const [rewardGrid, setRewardGrid] = useState("col-4");

  useEffect(() => {
    if (generatorScreen.width > 700) {
      setBtnTitle("Claim Rewards");
      setRPCGrid("col-1");
      setTypeGrid("col-3");
      setNameGrid("col-4");
      setRewardGrid("col-4");
    } else if (generatorScreen.width > 600 && generatorScreen.width <= 700) {
      setBtnTitle("Claim Rewards");
      setRPCGrid("col-1");
      setTypeGrid("col-3");
      setNameGrid("col-3");
      setRewardGrid("col-5");
    } else if (generatorScreen.width > 510 && generatorScreen.width <= 600) {
      setBtnTitle("Claim Rewards");
      setRPCGrid("col-1");
      setTypeGrid("col-2");
      setNameGrid("col-3");
      setRewardGrid("col-6");
    } else if (generatorScreen.width > 450 && generatorScreen.width <= 510) {
      setBtnTitle("Claim Rewards");
      setRPCGrid("col-1");
      setTypeGrid("col-2");
      setNameGrid("col-2");
      setRewardGrid("col-7");
    } else if (generatorScreen.width > 400 && generatorScreen.width <= 450) {
      setBtnTitle("Claim");
      setRPCGrid("col-1");
      setTypeGrid("col-2");
      setNameGrid("col-3");
      setRewardGrid("col-6");
    } else if (generatorScreen.width > 350 && generatorScreen.width <= 400) {
      setBtnTitle("Claim");
      setRPCGrid("col-1");
      setTypeGrid("col-2");
      setNameGrid("col-4");
      setRewardGrid("col-5");
    } else {
      setBtnTitle("Claim");
      setRPCGrid("col-2");
      setTypeGrid("col-2");
      setNameGrid("col-4");
      setRewardGrid("col-4");
    }
    console.log(generatorScreen.width)
  }, [generatorScreen])

  if (type === "Nuclear") {
    nameColor = "cl-nuclear";
  } else if (type === "Solar") {
    nameColor = "cl-solar";
  } else if (type === "Hydro") {
    nameColor = "cl-hydro";
  } else if (type === "Wind") {
    nameColor = "cl-wind";
  }

  return <React.Fragment>
    <div className="row border-top mx-0 mt-1 py-1">
      <div className={`${rpcGrid} d-flex align-items-center`}>
        <img src="assets/img/icons/fantom.png" alt="fantom" className='icon-size' />
      </div>
      <div className={`${typeGrid} d-flex align-items-center`}>
        <span className="cl-white-80">{type}</span>
      </div>
      <div className={`${nameGrid} d-flex align-items-center`}>
        <span className={`${nameColor} text-truncate`}>{name}</span>
      </div>
      <div className={`${rewardGrid} d-flex align-items-center flex-wrap`}>
        <span className="cl-white-80 me-2">{(parseFloat(rewards) / ETHUnit).toFixed(3)}</span>
        {rewards === 0 ? (
          <button type='button' className='dark-btn-sm cl-orange-gd fw-bold' disabled={true}>{btnTitle}</button>
        ) : (
          <button type='button' className='dark-btn-sm cl-orange-gd fw-bold'>{btnTitle}</button>
        )}
      </div>
    </div>
  </React.Fragment>;
}

NodeItem.propTypes = {
  generatorScreen: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    generatorScreen: state.generatorScreen
  }
}

export default connect(mapStateToProps)(NodeItem);