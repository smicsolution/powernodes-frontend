import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import { connect } from 'react-redux'

import tierABI from '../../constants/ABI/tier.json';
import tierNodeABI from '../../constants/ABI/node.json';
import tokenABI from '../../constants/ABI/token.json';
import { tierAddr, tierNode, tokenAddr, ftmAddr, usdtAddr, ftm_usdt_lp, ftm_power_lp } from '../../constants/Addresses';

import './style.css'

import isEmpty from '../../utils/is-empty';

const ETHUnit = 1e18;

const Farms = ({ account }) => {
  const { library } = useWeb3React();

  const [token, setToken] = useState(undefined);
  const [tier, setTier] = useState(undefined);

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (isEmpty(library) || isEmpty(account)) {
      setToken(undefined);
      setTier(undefined);
      return;
    }

    const _token = new library.eth.Contract(tokenABI, tokenAddr);
    const _tier = new library.eth.Contract(tierABI, tierAddr);

    setToken(_token);
    setTier(_tier);
  }, [library, account])

  useEffect(() => {
    if (isEmpty(account) || isEmpty(tier)) {
      setBalance(0);

      return;
    }

    const itv = setInterval(() => {
      token.methods.balanceOf(account).call().then((_balance) => {
        setBalance(parseFloat(_balance) / ETHUnit);
      })
    }, 3000);

    return () => clearInterval(itv);
  }, [account, tier]);

  return <React.Fragment>
    <div className="d-flex justify-content-between align-items-end">
      <span className="cl-orange fs-4 fw-bold">Farms</span>
      <div className="d-flex align-items-center">
        <span className='cl-gray me-2'>Your wallet:</span>
        <img src="assets/img/icons/power.png" alt="power" style={{ height: '1.1rem' }} />
        <span className="cl-orange fs-5 ms-1">{balance.toFixed(2)}</span>
      </div>
    </div>

    <div className="row mx-0 d-flex justify-content-center">
      <div className="col-xl-4 col-lg-6 col-md-6">
        <div className="farms-item-field text-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <img src="assets/img/icons/fantom.png" alt="fantom" className='farms-icon-size me-2' />
              <span className='cl-fantom-gd fw-bold fs-5'>wFTM Pool</span>
            </div>
            <span className="cl-white-80">2x Multiplier</span>
          </div>

          <div>
            <p className="mb-0 cl-fantom-gd fw-bold fs-1">$36874 TVL</p>
            <p className="mb-0 cl-white-80">Deposit wFTM, earn Energy</p>
          </div>
          <div className="text-center mt-2">
            <button type='button' className='dark-btn-farms cl-orange-gd fw-bold'>Select wFTM Pool</button>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-6 col-md-6">
        <div className="farms-item-field text-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <img src="assets/img/icons/eth.png" alt="eth" className='farms-icon-size me-2' />
              <span className='cl-fantom-gd fw-bold fs-5'>ETH Pool</span>
            </div>
            <span className="cl-white-80">2x Multiplier</span>
          </div>

          <div>
            <p className="mb-0 cl-fantom-gd fw-bold fs-1">$36874 TVL</p>
            <p className="mb-0 cl-white-80">Deposit wFTM, earn Energy</p>
          </div>
          <div className="text-center mt-2">
            <button type='button' className='dark-btn-farms cl-orange-gd fw-bold'>Select Ethereum Pool</button>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-6 col-md-6">
        <div className="farms-item-field text-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <img src="assets/img/icons/yfi.png" alt="yfi" className='farms-icon-size me-2' />
              <span className='cl-fantom-gd fw-bold fs-5'>ETH Pool</span>
            </div>
            <span className="cl-white-80">2x Multiplier</span>
          </div>

          <div>
            <p className="mb-0 cl-fantom-gd fw-bold fs-1">$36874 TVL</p>
            <p className="mb-0 cl-white-80">Deposit wFTM, earn Energy</p>
          </div>
          <div className="text-center mt-2">
            <button type='button' className='dark-btn-farms cl-orange-gd fw-bold'>Select YFI Pool</button>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-6 col-md-6">
        <div className="farms-item-field text-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <img src="assets/img/icons/usdc.png" alt="usdc" className='farms-icon-size me-2' />
              <span className='cl-fantom-gd fw-bold fs-5'>ETH Pool</span>
            </div>
            <span className="cl-white-80">2x Multiplier</span>
          </div>

          <div>
            <p className="mb-0 cl-fantom-gd fw-bold fs-1">$36874 TVL</p>
            <p className="mb-0 cl-white-80">Deposit wFTM, earn Energy</p>
          </div>
          <div className="text-center mt-2">
            <button type='button' className='dark-btn-farms cl-orange-gd fw-bold'>Select USDC Pool</button>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-6 col-md-6">
        <div className="farms-item-field text-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <img src="assets/img/icons/mim.png" alt="mim" className='farms-icon-size me-2' />
              <span className='cl-purple-gd fw-bold fs-5'>MIM Pool</span>
            </div>
            <span className="cl-white-80">2x Multiplier</span>
          </div>

          <div>
            <p className="mb-0 cl-purple-gd fw-bold fs-1">$36874 TVL</p>
            <p className="mb-0 cl-white-80">Deposit wFTM, earn Energy</p>
          </div>
          <div className="text-center mt-2">
            <button type='button' className='dark-btn-farms cl-orange-gd fw-bold'>Select MIM Pool</button>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-6 col-md-6">
        <div className="farms-item-field text-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <img src="assets/img/icons/power.png" alt="mim" className='farms-icon-size me-2' />
              <span className='cl-orange-gd fw-bold fs-5'>Power Pool</span>
            </div>
            <span className="cl-white-80">2x Multiplier</span>
          </div>

          <div>
            <p className="mb-0 cl-orange-gd fw-bold fs-1">$36874 TVL</p>
            <p className="mb-0 cl-white-80">Deposit wFTM, earn Energy</p>
          </div>
          <div className="text-center mt-2">
            <button type='button' className='dark-btn-farms cl-orange-gd fw-bold'>Select Power Pool</button>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-6 col-md-6">
        <div className="farms-item-field text-center">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <img src="assets/img/icons/fantom.png" alt="mim" className='farms-icon-size me-2' />
              <span className='cl-orange-gd fw-bold fs-5'>wFTM-Energy LP</span>
            </div>
            <span className="cl-orange-gd">5x Multiplier</span>
          </div>

          <div>
            <p className="mb-0 cl-orange-gd fw-bold fs-1">$36874 TVL</p>
            <p className="mb-0 cl-white-80">Deposit wFTM, earn Energy</p>
          </div>
          <div className="text-center mt-2">
            <button type='button' className='dark-btn-farms cl-orange-gd fw-bold'>Select wFTM-Energy LP</button>
          </div>
        </div>
      </div>

    </div>
  </React.Fragment>;
}

const mapStateToProps = (state) => {
  return {
    account: state.account.myAccount
  }
}

export default connect(mapStateToProps)(Farms);