import React, { useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector'

import './style.css'

const ETHUnit = 1e18;

const NodeItem = ({ type, name, rewards }) => {
  const [btnTitle, setBtnTitle] = useState("Claim Rewards");
  const { width, height, ref } = useResizeDetector();

  let nameColor;

  if (type === "Nuclear") {
    nameColor = "cl-nuclear";
  } else if (type === "Solar") {
    nameColor = "cl-solar";
  } else if (type === "Hydro") {
    nameColor = "cl-hydro";
  } else if (type === "Wind") {
    nameColor = "cl-wind";
  }

  useEffect(() => {
    if (width > 358) {
      setBtnTitle("Claim Rewards");
    } else {
      setBtnTitle("Claim");
    }
  }, [width])

  return <React.Fragment>
    <div ref={ref}>
      {width > 358 ? (
        <div className="row border-top mx-0 mt-1 py-1">
          <div className="col-1 d-flex align-items-center">
            <img src="assets/img/icons/fantom.png" alt="fantom" className='icon-size' />
          </div>
          <div className="col-2 d-flex align-items-center">
            <span className="cl-white-80">{type}</span>
          </div>
          <div className="col-3 d-flex align-items-center">
            <span className={`${nameColor} text-truncate`}>{name}</span>
          </div>
          <div className="col-6 d-flex align-items-center flex-wrap">
            <span className="cl-white-80 me-2">{(parseFloat(rewards) / ETHUnit).toFixed(3)}</span>
            {rewards === 0 ? (
              <button type='button' className='dark-btn-sm cl-orange-gd fw-bold' disabled={true}>{btnTitle}</button>
            ) : (
              <button type='button' className='dark-btn-sm cl-orange-gd fw-bold'>{btnTitle}</button>
            )}
          </div>
        </div>
      ) : (
        <div className="row border-top mx-0 mt-1 py-1">
          <div className="col-5 d-flex align-items-center">
            <img src="assets/img/icons/fantom.png" alt="fantom" className='icon-size' />
          </div>
          <div className="col-7 d-flex align-items-center">
            <span className="cl-white-80 text-truncate">{type}</span>
          </div>
          <div className="col-5 d-flex align-items-center">
            <span className={`${nameColor} text-truncate`}>{name}</span>
          </div>
          <div className="col-7 d-flex align-items-center flex-wrap">
            <span className="cl-white-80 me-2">{rewards}</span>
            <button type='button' className='dark-btn-sm cl-orange-gd fw-bold'>{btnTitle}</button>
          </div>
        </div>
      )}
    </div>
  </React.Fragment>;
}

export default NodeItem;