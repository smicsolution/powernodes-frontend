import React, { useState, useEffect } from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri'
import { IoTrashBinSharp } from 'react-icons/io5'
import { useResizeDetector } from 'react-resize-detector'

import './style.css'

import NodeItem from '../../components/NodeItem';

const nodeArray = [
  {
    type: "Nuclear",
    name: "Nuclear Node",
    rewards: 3.87
  },
  {
    type: "Wind",
    name: "Wind Node",
    rewards: 3.87
  },
  {
    type: "Wind",
    name: "Wind Node",
    rewards: 3.87
  },
  {
    type: "Solar",
    name: "Solar Node",
    rewards: 3.87
  },
  {
    type: "Hydro",
    name: "Hydro Node",
    rewards: 3.87
  },
  {
    type: "Hydro",
    name: "Hydro Node",
    rewards: 3.87
  },
  {
    type: "Nuclear",
    name: "Nuclear Node",
    rewards: 3.87
  },
  {
    type: "Nuclear",
    name: "Nuclear Node",
    rewards: 3.87
  },
  {
    type: "Wind",
    name: "Wind Node",
    rewards: 3.87
  },
  {
    type: "Wind",
    name: "Wind Node",
    rewards: 3.87
  },
  {
    type: "Solar",
    name: "Solar Node",
    rewards: 3.87
  },
  {
    type: "Hydro",
    name: "Hydro Node",
    rewards: 3.87
  },
  {
    type: "Hydro",
    name: "Hydro Node",
    rewards: 3.87
  },
  {
    type: "Nuclear",
    name: "Nuclear Node",
    rewards: 3.87
  },
  {
    type: "Nuclear",
    name: "Nuclear Node",
    rewards: 3.87
  },
  {
    type: "Wind",
    name: "Wind Node",
    rewards: 3.87
  },
  {
    type: "Wind",
    name: "Wind Node",
    rewards: 3.87
  },
  {
    type: "Solar",
    name: "Solar Node",
    rewards: 3.87
  },
  {
    type: "Hydro",
    name: "Hydro Node",
    rewards: 3.87
  },
  {
    type: "Hydro",
    name: "Hydro Node",
    rewards: 3.87
  },
  {
    type: "Nuclear",
    name: "Nuclear Node",
    rewards: 3.87
  }
]

const Dashboard = () => {
  const { width, height, ref } = useResizeDetector();

  const [selectedNode, setSelectedNode] = useState("Nuclear");
  const [nodeTypeColor, setNodeTypeColor] = useState("cl-nuclear");
  const [nodeStyle, setNodeStyle] = useState({
    background: "linear-gradient(165.39deg, #212226 9.14%, #0b4428 94.36%)",
    border: "1px solid #25E384",
    boxShadow: '-9px -9px 16px rgba(184, 184, 184, 0.08), 9px 9px 16px rgba(0, 0, 0, 0.4)'
  });
  const [nodeLeftField, setLeftField] = useState("ps-0 pe-2");
  const [nodeRightField, setRightField] = useState("pe-0 ps-2");

  useEffect(() => {
    if (width > 430) {
      setLeftField("ps-0 pe-2");
      setRightField("pe-0 ps-2");
    } else {
      setLeftField("p-0");
      setRightField("p-0");
    }
  }, [width])

  const onSelectNode = e => {
    setSelectedNode(e.target.id);

    if (e.target.id === "Nuclear") {
      setNodeTypeColor("cl-nuclear");
      setNodeStyle({
        background: "linear-gradient(165.39deg, #212226 9.14%, #0b4428 94.36%)",
        border: "1px solid #25E384",
        boxShadow: '-9px -9px 16px rgba(184, 184, 184, 0.08), 9px 9px 16px rgba(0, 0, 0, 0.4)'
      });
    } else if (e.target.id === "Solar") {
      setNodeTypeColor("cl-solar");
      setNodeStyle({
        background: "linear-gradient(165.39deg, #212226 9.14%, #473e0e 94.36%)",
        border: "1px solid #E8CA2F",
        boxShadow: '-9px -9px 16px rgba(184, 184, 184, 0.08), 9px 9px 16px rgba(0, 0, 0, 0.4)'
      });
    } else if (e.target.id === "Hydro") {
      setNodeTypeColor("cl-hydro");
      setNodeStyle({
        background: "linear-gradient(165.39deg, #212226 9.14%, #131a3a 94.36%)",
        border: "1px solid #5873FF",
        boxShadow: '-9px -9px 16px rgba(184, 184, 184, 0.08), 9px 9px 16px rgba(0, 0, 0, 0.4)'
      });
    } else if (e.target.id === "Wind") {
      setNodeTypeColor("cl-wind");
      setNodeStyle({
        background: "linear-gradient(165.39deg, #212226 9.14%, #183640 94.36%)",
        border: "1px solid #6DDAFC",
        boxShadow: '-9px -9px 16px rgba(184, 184, 184, 0.08), 9px 9px 16px rgba(0, 0, 0, 0.4)'
      });
    }
  }

  const num = 36874;

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-end">
        <span className="cl-orange fs-4 fw-bold">Dashboard</span>
        <div className="d-flex align-items-center">
          <span className='cl-gray me-2'>Your wallet:</span>
          <img src="assets/img/icons/power.png" alt="power" style={{ height: '1.1rem' }} />
          <span className="cl-orange fs-5 ms-1">0</span>
        </div>
      </div>

      <div className="row mx-0 mt-3">
        <div className="col-lg-4 col-md-6 total-field my-2 ps-0 pe-3">
          <div className="dasboard-card">
            <p className="mb-0 cl-orange-gd fw-bold fs-5">Total Generators</p>
            <div>
              <p className="mb-0">
                <span className='cl-orange-gd fw-bold fs-1'>{num.toLocaleString()}</span>
                <span className="cl-gray ms-2">Generators</span>
              </p>
              <div className="row mx-0 border-top py-1">
                <div className="col-5 px-0 d-flex justify-content-between">
                  <span className='cl-wind'>Wind</span>
                  <span className="cl-orange-gd fw-bold">9648</span>
                </div>
                <div className="col-2 d-flex justify-content-center">
                  <span className='vertical-border'></span>
                </div>
                <div className="col-5 px-0 d-flex justify-content-between">
                  <span className='cl-hydro'>Hydro</span>
                  <span className="cl-orange-gd fw-bold">9648</span>
                </div>
              </div>
              <div className="row mx-0 border-top py-1">
                <div className="col-5 px-0 d-flex justify-content-between">
                  <span className='cl-solar'>Solar</span>
                  <span className="cl-orange-gd fw-bold">9648</span>
                </div>
                <div className="col-2 d-flex justify-content-center">
                  <span className='vertical-border'></span>
                </div>
                <div className="col-5 px-0 d-flex justify-content-between">
                  <span className='cl-nuclear'>Nuclear</span>
                  <span className="cl-orange-gd fw-bold">9648</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 power-price-field my-2 px-1">
          <div className="dasboard-card">
            <div className="d-flex justify-content-between align-items-end">
              <div className='d-flex align-items-center'>
                <img src="assets/img/icons/power.png" alt="power" className='icon-size' />
                <span className='cl-orange-gd fw-bold ms-1 fs-5'>Power Price</span>
              </div>
              <small className="cl-gray">Price Chart</small>
            </div>

            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex align-items-end">
                <span className="cl-orange-gd fw-bold fs-5">$</span>
                <span className="cl-orange-gd fw-bold fs-1" style={{ lineHeight: '2.5rem' }}>19.20</span>
                <small className="cl-gray">/USD</small>
              </div>
              <div className='text-end'>
                <div className="d-flex align-items-center">
                  <span className='cl-green-gd fw-bold fs-5'>19.25%</span>
                  <RiArrowRightUpLine className='cl-green fs-3' />
                </div>
                <p className="mb-0 cl-gray"><small>24 Hours</small></p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 fantom-price-field my-2 pe-0 ps-3">
          <div className="dasboard-card">
            <div className="d-flex justify-content-between align-items-end">
              <div className='d-flex align-items-center'>
                <img src="assets/img/icons/fantom.png" alt="power" className='icon-size' />
                <span className='cl-fantom-gd fw-bold ms-1 fs-5'>Fantom Price</span>
              </div>
              <small className="cl-gray">Price Chart</small>
            </div>

            <div className="d-flex justify-content-between align-items-end">
              <div className="d-flex align-items-end">
                <span className="cl-fantom-gd fw-bold fs-5">$</span>
                <span className="cl-fantom-gd fw-bold fs-1" style={{ lineHeight: '2.5rem' }}>2.37</span>
                <small className="cl-gray">/USD</small>
              </div>
              <div className='text-end'>
                <div className="d-flex align-items-center">
                  <span className='cl-green-gd fw-bold fs-5'>5.75%</span>
                  <RiArrowRightUpLine className='cl-green fs-3' />
                </div>
                <p className="mb-0 cl-gray"><small>24 Hours</small></p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="row mx-0 mt-3">
        <div className="col-md-6 ps-0 pe-2 node-field my-2" ref={ref}>
          <div className="node-card">
            <div className="d-flex justify-content-between align-items-end">
              <span className='cl-orange-gd fw-bold fs-5'>Create a Generator</span>
              <span className="cl-gray">Selected: <span className={`${nodeTypeColor}`}>{selectedNode}</span></span>
            </div>

            {width > 430 ? (
              <div>
                <div className="row mx-0 mt-2">
                  <div className={`col-6 my-2 text-center ${nodeLeftField}`}>
                    <div
                      className="nuclear-card"
                      style={selectedNode === "Nuclear" ? nodeStyle : null}
                      id='Nuclear'
                      onClick={onSelectNode}
                    >
                      <div className="d-flex justify-content-between align-items-center" id='Nuclear'>
                        <span className="cl-nuclear fs-5" id='Nuclear'>Nuclear</span>
                        <div className='d-flex align-items-center' id='Nuclear'>
                          <span className="cl-nuclear fs-5 me-1" id='Nuclear'>50</span>
                          <img src="assets/img/icons/nuclear_power.png" alt="nuclear_power" className='icon-size' id='Nuclear' />
                        </div>
                      </div>
                      <img src="assets/img/node/nuclear.png" alt="nuclear" className='node-img-size' id='Nuclear' />
                      <div className="d-flex justify-content-between align-items-center border-top" id='Nuclear'>
                        <span className="cl-gray fw-bold" id='Nuclear'>Tokens / Day</span>
                        <span className="cl-nuclear fs-5" id='Nuclear'>0.7</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center border-top" id='Nuclear'>
                        <span className="cl-gray fw-bold" id='Nuclear'>ROI</span>
                        <span className="cl-nuclear fs-5" id='Nuclear'>114 Days</span>
                      </div>
                    </div>
                  </div>

                  <div className={`col-6 my-2 text-center ${nodeRightField}`}>
                    <div
                      className="solar-card"
                      style={selectedNode === "Solar" ? nodeStyle : null}
                      id='Solar'
                      onClick={onSelectNode}
                    >
                      <div className="d-flex justify-content-between align-items-center" id='Solar'>
                        <span className="cl-solar fs-5" id='Solar'>Solar</span>
                        <div className='d-flex align-items-center' id='Solar'>
                          <span className="cl-solar fs-5 me-1" id='Solar'>10</span>
                          <img src="assets/img/icons/solar_power.png" alt="solar_power" className='icon-size' id='Solar' />
                        </div>
                      </div>
                      <img src="assets/img/node/solar.png" alt="solar" className='node-img-size' id='Solar' />
                      <div className="d-flex justify-content-between align-items-center border-top" id='Solar'>
                        <span className="cl-gray fw-bold" id='Solar'>Tokens / Day</span>
                        <span className="cl-solar fs-5" id='Solar'>0.1</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center border-top" id='Solar'>
                        <span className="cl-gray fw-bold" id='Solar'>ROI</span>
                        <span className="cl-solar fs-5" id='Solar'>114 Days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mx-0">
                  <div className={`col-6 my-2 text-center ${nodeLeftField}`}>
                    <div
                      className="hydro-card"
                      style={selectedNode === "Hydro" ? nodeStyle : null}
                      id='Hydro'
                      onClick={onSelectNode}
                    >
                      <div className="d-flex justify-content-between align-items-center" id='Hydro'>
                        <span className="cl-hydro fs-5" id='Hydro'>Hydro</span>
                        <div className='d-flex align-items-center' id='Hydro'>
                          <span className="cl-hydro fs-5 me-1" id='Hydro'>5</span>
                          <img src="assets/img/icons/hydro_power.png" alt="hydro_power" className='icon-size' id='Hydro' />
                        </div>
                      </div>
                      <img src="assets/img/node/hydro.png" alt="hydro" className='node-img-size' id='Hydro' />
                      <div className="d-flex justify-content-between align-items-center border-top" id='Hydro'>
                        <span className="cl-gray fw-bold" id='Hydro'>Tokens / Day</span>
                        <span className="cl-hydro fs-5" id='Hydro'>0.025</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center border-top" id='Hydro'>
                        <span className="cl-gray fw-bold" id='Hydro'>ROI</span>
                        <span className="cl-hydro fs-5" id='Hydro'>114 Days</span>
                      </div>
                    </div>
                  </div>

                  <div className={`col-6 my-2 text-center ${nodeRightField}`}>
                    <div
                      className="wind-card"
                      style={selectedNode === "Wind" ? nodeStyle : null}
                      id='Wind'
                      onClick={onSelectNode}
                    >
                      <div className="d-flex justify-content-between align-items-center" id='Wind'>
                        <span className="cl-wind fs-5" id='Wind'>Wind</span>
                        <div className='d-flex align-items-center' id='Wind'>
                          <span className="cl-wind fs-5 me-1" id='Wind'>1</span>
                          <img src="assets/img/icons/wind_power.png" alt="wind_power" className='icon-size' id='Wind' />
                        </div>
                      </div>
                      <img src="assets/img/node/wind.png" alt="wind" className='node-img-size' id='Wind' />
                      <div className="d-flex justify-content-between align-items-center border-top" id='Wind'>
                        <span className="cl-gray fw-bold" id='Wind'>Tokens / Day</span>
                        <span className="cl-wind fs-5" id='Wind'>0.003</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center border-top" id='Wind'>
                        <span className="cl-gray fw-bold" id='Wind'>ROI</span>
                        <span className="cl-wind fs-5" id='Wind'>114 Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="row mx-0 mt-2">
                  <div className={`col-12 my-2 text-center ${nodeLeftField}`}>
                    <div
                      className="nuclear-card"
                      style={selectedNode === "Nuclear" ? nodeStyle : null}
                      id='Nuclear'
                      onClick={onSelectNode}
                    >
                      <div className="d-flex justify-content-between align-items-center" id='Nuclear'>
                        <span className="cl-nuclear fs-5" id='Nuclear'>Nuclear</span>
                        <div className='d-flex align-items-center' id='Nuclear'>
                          <span className="cl-nuclear fs-5 me-1" id='Nuclear'>50</span>
                          <img src="assets/img/icons/nuclear_power.png" alt="nuclear_power" className='icon-size' id='Nuclear' />
                        </div>
                      </div>
                      <img src="assets/img/node/nuclear.png" alt="nuclear" className='node-img-size' id='Nuclear' />
                      <div className="d-flex justify-content-between align-items-center border-top" id='Nuclear'>
                        <span className="cl-gray fw-bold" id='Nuclear'>Tokens / Day</span>
                        <span className="cl-nuclear fs-5" id='Nuclear'>0.7</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center border-top" id='Nuclear'>
                        <span className="cl-gray fw-bold" id='Nuclear'>ROI</span>
                        <span className="cl-nuclear fs-5" id='Nuclear'>114 Days</span>
                      </div>
                    </div>
                  </div>

                  <div className={`col-12 my-2 text-center ${nodeRightField}`}>
                    <div
                      className="solar-card"
                      style={selectedNode === "Solar" ? nodeStyle : null}
                      id='Solar'
                      onClick={onSelectNode}
                    >
                      <div className="d-flex justify-content-between align-items-center" id='Solar'>
                        <span className="cl-solar fs-5" id='Solar'>Solar</span>
                        <div className='d-flex align-items-center' id='Solar'>
                          <span className="cl-solar fs-5 me-1" id='Solar'>10</span>
                          <img src="assets/img/icons/solar_power.png" alt="solar_power" className='icon-size' id='Solar' />
                        </div>
                      </div>
                      <img src="assets/img/node/solar.png" alt="solar" className='node-img-size' id='Solar' />
                      <div className="d-flex justify-content-between align-items-center border-top" id='Solar'>
                        <span className="cl-gray fw-bold" id='Solar'>Tokens / Day</span>
                        <span className="cl-solar fs-5" id='Solar'>0.1</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center border-top" id='Solar'>
                        <span className="cl-gray fw-bold" id='Solar'>ROI</span>
                        <span className="cl-solar fs-5" id='Solar'>114 Days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mx-0">
                  <div className={`col-12 my-2 text-center ${nodeLeftField}`}>
                    <div
                      className="hydro-card"
                      style={selectedNode === "Hydro" ? nodeStyle : null}
                      id='Hydro'
                      onClick={onSelectNode}
                    >
                      <div className="d-flex justify-content-between align-items-center" id='Hydro'>
                        <span className="cl-hydro fs-5" id='Hydro'>Hydro</span>
                        <div className='d-flex align-items-center' id='Hydro'>
                          <span className="cl-hydro fs-5 me-1" id='Hydro'>5</span>
                          <img src="assets/img/icons/hydro_power.png" alt="hydro_power" className='icon-size' id='Hydro' />
                        </div>
                      </div>
                      <img src="assets/img/node/hydro.png" alt="hydro" className='node-img-size' id='Hydro' />
                      <div className="d-flex justify-content-between align-items-center border-top" id='Hydro'>
                        <span className="cl-gray fw-bold" id='Hydro'>Tokens / Day</span>
                        <span className="cl-hydro fs-5" id='Hydro'>0.025</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center border-top" id='Hydro'>
                        <span className="cl-gray fw-bold" id='Hydro'>ROI</span>
                        <span className="cl-hydro fs-5" id='Hydro'>114 Days</span>
                      </div>
                    </div>
                  </div>

                  <div className={`col-12 my-2 text-center ${nodeRightField}`}>
                    <div
                      className="wind-card"
                      style={selectedNode === "Wind" ? nodeStyle : null}
                      id='Wind'
                      onClick={onSelectNode}
                    >
                      <div className="d-flex justify-content-between align-items-center" id='Wind'>
                        <span className="cl-wind fs-5" id='Wind'>Wind</span>
                        <div className='d-flex align-items-center' id='Wind'>
                          <span className="cl-wind fs-5 me-1" id='Wind'>1</span>
                          <img src="assets/img/icons/wind_power.png" alt="wind_power" className='icon-size' id='Wind' />
                        </div>
                      </div>
                      <img src="assets/img/node/wind.png" alt="wind" className='node-img-size' id='Wind' />
                      <div className="d-flex justify-content-between align-items-center border-top" id='Wind'>
                        <span className="cl-gray fw-bold" id='Wind'>Tokens / Day</span>
                        <span className="cl-wind fs-5" id='Wind'>0.003</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center border-top" id='Wind'>
                        <span className="cl-gray fw-bold" id='Wind'>ROI</span>
                        <span className="cl-wind fs-5" id='Wind'>114 Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <input type="text" name="node_name" placeholder='Enter your node’s name here' className='nodename_input mt-3' />

            <p className="mb-0 mt-3">If this is your first time creating a node, please approve the contract first.</p>

            <div className="mt-2 d-flex flex-wrap">
              <button type='button' className='dark-btn me-2 px-3 my-2'>
                <span className='cl-orange-gd fw-bold'>Approve Contract</span>
              </button>
              <button type='button' className='orange-btn me-2 px-3 my-2'>
                <span className='cl-black fw-bold'>Create Node</span>
              </button>
              <button type='button' className='orange-btn px-3 my-2'>
                <span className='cl-black fw-bold'>Compound Rewards</span>
              </button>
            </div>

          </div>
        </div>

        <div className="col-md-6 ps-2 pe-0 node-field my-2">
          <div className="reward-field d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between flex-wrap">
              <div className="d-flex align-items-center my-1">
                <img src="assets/img/icons/generator.png" alt="generator" className='icon-size me-2' />
                <span className="fs-5">Your Rewards</span>
              </div>
              <button type='button' className='white-btn my-1'>
                <span className="cl-orange-gd fw-bold px-3">Claim Rewards</span>
              </button>
            </div>

            <div className="row mx-0">
              <div className="col-6 p-0 text-start right-border">
                <p className="mb-0 cl-white-60">3.68 / Day</p>
                <p className="mb-0 fs-1 cl-white-gd">24.004</p>
                <p className="mb-0 fs-5">/POWER</p>
              </div>
              <div className="col-6 p-0 text-end">
                <p className="mb-0 cl-white-60">$71.24 / Day</p>
                <p className="mb-0 fs-1 cl-white-gd">$464.64</p>
                <p className="mb-0 fs-5">/USD</p>
              </div>
            </div>
          </div>

          <div className="node-list-field" style={{ height: `${height - 250}px` }}>
            <p className="mb-1 fs-5 cl-orange-gd">Your Generators</p>
            {width > 400 ? (
              <div className="row mx-0 my-2" id='node-list-header'>
                <div className="col-1">
                  <span className="cl-white-40">RPC</span>
                </div>
                <div className="col-2">
                  <span className="cl-white-40">Type</span>
                </div>
                <div className="col-3">
                  <span className="cl-white-40">Name</span>
                </div>
                <div className="col-6">
                  <span className="cl-white-40">Rewards</span>
                </div>
              </div>
            ) : (
              <div className="row mx-0 my-2" id='node-list-header'>
                <div className="col-5">
                  <span className="cl-white-40">RPC</span>
                </div>
                <div className="col-7">
                  <span className="cl-white-40">Type</span>
                </div>
                <div className="col-5">
                  <span className="cl-white-40">Name</span>
                </div>
                <div className="col-7">
                  <span className="cl-white-40">Rewards</span>
                </div>
              </div>
            )}

            {/* <div className="d-flex justify-content-center align-items-center my-5">
              <div className="text-center">
                <IoTrashBinSharp className='display-2' />
                <p className='mb-0'>NoData</p>
              </div>
            </div> */}

            <div className="node-list" style={{ height: `${height - 360}px` }}>
              {nodeArray.map((item, index) =>
                <NodeItem key={index} type={item.type} name={item.name} rewards={item.rewards} />
              )}
            </div>

          </div>
        </div>

      </div>
    </React.Fragment>
  );
}

export default Dashboard;