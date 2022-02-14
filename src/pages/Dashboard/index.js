import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { RiArrowRightUpLine } from 'react-icons/ri'
import { IoTrashBinSharp } from 'react-icons/io5'
import { useResizeDetector } from 'react-resize-detector'
import { useWeb3React } from "@web3-react/core";

import tierABI from '../../constants/ABI/tier.json';
import tierNodeABI from '../../constants/ABI/node.json';
import tokenABI from '../../constants/ABI/token.json';
import { tierAddr, tierNode, tokenAddr, ftmAddr, usdtAddr, ftm_usdt_lp, ftm_power_lp } from '../../constants/Addresses';

import './style.css'

import NodeItem from '../../components/NodeItem';

import isEmpty from '../../utils/is-empty';
import notify from '../../utils/notify';

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
  const { library, account } = useWeb3React();

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

  const [token, setToken] = useState(undefined);
  const [tier, setTier] = useState(undefined);
  const [wind, setWind] = useState(undefined);
  const [hydro, setHydro] = useState(undefined);
  const [solar, setSolar] = useState(undefined);
  const [nuclear, setNuclear] = useState(undefined);
  const [ftm, setFTM] = useState(undefined);
  const [usdt, setUSDT] = useState(undefined);

  const [totalNode, setTotalNode] = useState(0);
  const [totalWind, setTotalWind] = useState(0);
  const [totalHydro, setTotalHydro] = useState(0);
  const [totalSolar, setTotalSolar] = useState(0);
  const [totalNuclear, setTotalNuclear] = useState(0);

  const [userWind, setUserWind] = useState(0);
  const [userHydro, setUserHydro] = useState(0);
  const [userSolar, setUserSolar] = useState(0);
  const [userNuclear, setUserNuclear] = useState(0);

  const [ftmPrice, setFTMPrice] = useState(0);
  const [powerPrice, setPowerPrice] = useState(0);

  const [balance, setBalance] = useState(0);
  const [approved, setApproved] = useState(false);
  const [nodeName, setNodeName] = useState("");

  const [windReward, setWindReward] = useState(0);
  const [hydroReward, setHydroReward] = useState(0);
  const [solarReward, setSolarReward] = useState(0);
  const [nuclearReward, setNuclearReward] = useState(0);

  const [windNode, setWindNode] = useState([]);
  const [hydroNode, setHydroNode] = useState([]);
  const [solarNode, setSolarNode] = useState([]);
  const [nuclearNode, setNuclearNode] = useState([]);

  const [myNodeItems, setMyNodeItems] = useState(null);

  const ETHUnit = 1e18;
  const MaxUint256 = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  const APItoken = "19VRUK55Q67WQ8HX6FC9626AYRMTDEF2F5";
  const nodePrice = [1, 5, 10, 50];

  useEffect(() => {
    if (isEmpty(library)) {
      setToken(undefined);
      setFTM(undefined);
      setUSDT(undefined);
      setTier(undefined);
      setWind(undefined);
      setHydro(undefined);
      setSolar(undefined);
      setNuclear(undefined);
      return;
    }

    const _token = new library.eth.Contract(tokenABI, tokenAddr);
    const _ftm = new library.eth.Contract(tokenABI, ftmAddr);
    const _usdt = new library.eth.Contract(tokenABI, usdtAddr);
    const _tier = new library.eth.Contract(tierABI, tierAddr);
    const _wind = new library.eth.Contract(tierNodeABI, tierNode.wind);
    const _hydro = new library.eth.Contract(tierNodeABI, tierNode.hydro);
    const _solar = new library.eth.Contract(tierNodeABI, tierNode.solar);
    const _nuclear = new library.eth.Contract(tierNodeABI, tierNode.nuclear);

    setToken(_token);
    setFTM(_ftm);
    setUSDT(_usdt);
    setTier(_tier);
    setWind(_wind);
    setHydro(_hydro);
    setSolar(_solar);
    setNuclear(_nuclear);
  }, [library])

  useEffect(() => {
    if (isEmpty(tier) || isEmpty(account)) {
      setTotalNode(0);
      setTotalWind(0);
      setTotalHydro(0);
      setTotalSolar(0);
      setTotalNuclear(0);
      setFTMPrice(0);
      setPowerPrice(0);

      return;
    }

    const itv = setInterval(() => {
      usdt.methods.balanceOf(ftm_usdt_lp).call().then((usdtBal) => {
        ftm.methods.balanceOf(ftm_usdt_lp).call().then((ftmBal1) => {
          ftm.methods.balanceOf(ftm_power_lp).call().then((ftmBal2) => {
            token.methods.balanceOf(ftm_power_lp).call().then((tokenBal) => {
              const powerCost = parseFloat(ftmBal2) / parseFloat(tokenBal) * parseFloat(usdtBal) / parseFloat(ftmBal1) * 1000000000000;
              const ftmCost = parseFloat(usdtBal / ftmBal1) * 1000000000000;
              setPowerPrice(powerCost);
              setFTMPrice(ftmCost);
            })
          })
        })
      })

      tier.methods.getTotalCreatedNodes().call()
        .then(_totalToken => {
          setTotalNode(parseInt(_totalToken - 80));
        })

      wind.methods.totalNodesCreated().call()
        .then(_totalWind => {
          setTotalWind(parseInt(_totalWind));
        })
      hydro.methods.totalNodesCreated().call()
        .then(_totalHydro => {
          setTotalHydro(parseInt(_totalHydro));
        })
      solar.methods.totalNodesCreated().call()
        .then(_totalSolar => {
          setTotalSolar(parseInt(_totalSolar));
        })
      nuclear.methods.totalNodesCreated().call()
        .then(_totalNuclear => {
          setTotalNuclear(parseInt(_totalNuclear));
        })
    }, 3000)

    return () => clearInterval(itv);
  }, [tier, ftm, usdt, account])

  useEffect(() => {
    if (isEmpty(account) || isEmpty(tier)) {
      setBalance(0);
      setApproved(false);

      setUserWind(0);
      setUserHydro(0);
      setUserSolar(0);
      setUserNuclear(0);

      setWindReward(0);
      setHydroReward(0);
      setSolarReward(0);
      setNuclearReward(0);

      setWindNode([]);
      setHydroNode([]);
      setSolarNode([]);
      setNuclearNode([]);

      return;
    }

    const itv = setInterval(() => {
      token.methods.allowance(account, tokenAddr).call().then((_approved) => {
        if (_approved == '0') setApproved(false);
        else setApproved(true);
      })

      // axios.get(`https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=${tokenAddr}&address=${account}&tag=latest&apikey=${APItoken}`)
      //   .then(res => {
      //     setBalance(parseFloat(res.data.result / ETHUnit));
      //   });

      token.methods.balanceOf(account).call().then((_balance) => {
        setBalance(parseFloat(_balance) / ETHUnit);
      })

      tier.methods.getNodeNumberOf(account, "FLATVERSAL").call().then(_wind => {
        console.log({ user_wind: _wind })
        if (_wind != 0) {
          tier.methods.getRewardAmountOf(account, "FLATVERSAL").call().then((_windReward) => {
            console.log({ wind_reward: _windReward })
            setWindReward(_windReward);
          })
          wind.methods._getNodesNames(account).call().then((names) => {
            wind.methods._getNodesRewardAvailable(account).call().then((rewards) => {
              let tmp = [];
              let nameArray = names.split("#");
              let rewardArray = rewards.split("#");
              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  reward: rewardArray[i],
                  type: "Wind"
                });
              }
              console.log({ wind_node: tmp })
              setWindNode(tmp);
            })
          });
        } else {
          setWindReward(0)
          setWindNode([]);
        }
        setUserWind(parseInt(_wind));
      });

      tier.methods.getNodeNumberOf(account, "MICROSCOPIC").call().then(_hydro => {
        console.log({ user_hydro: _hydro })
        if (_hydro != 0) {
          tier.methods.getRewardAmountOf(account, "MICROSCOPIC").call().then((_hydroReward) => {
            console.log({ hydro_reward: _hydroReward })
            setHydroReward(_hydroReward);
          })
          hydro.methods._getNodesNames(account).call().then((names) => {
            hydro.methods._getNodesRewardAvailable(account).call().then((rewards) => {
              let tmp = [];
              let nameArray = names.split("#");
              let rewardArray = rewards.split("#");
              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  reward: rewardArray[i],
                  type: "Hydro"
                });
              }
              console.log({ hydro_node: tmp })
              setHydroNode(tmp);
            })
          });
        } else {
          setHydroReward(0)
          setHydroNode([]);
        }
        setUserHydro(parseInt(_hydro));
      });

      tier.methods.getNodeNumberOf(account, "HUMAN").call().then(_solar => {
        console.log({ user_solar: _solar })
        if (_solar != 0) {
          tier.methods.getRewardAmountOf(account, "HUMAN").call().then((_solarReward) => {
            console.log({ solar_reward: _solarReward })
            setSolarReward(_solarReward);
          })
          solar.methods._getNodesNames(account).call().then((names) => {
            solar.methods._getNodesRewardAvailable(account).call().then((rewards) => {
              let tmp = [];
              let nameArray = names.split("#");
              let rewardArray = rewards.split("#");
              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  reward: rewardArray[i],
                  type: "Solar"
                });
              }
              console.log({ solar_node: tmp })
              setSolarNode(tmp);
            })
          });
        } else {
          setSolarReward(0)
          setSolarNode([]);
        }
        setUserSolar(parseInt(_solar));
      });

      tier.methods.getNodeNumberOf(account, "SUPERHUMAN").call().then(_nuclear => {
        console.log({ user_nuclear: _nuclear })
        if (_nuclear != 0) {
          tier.methods.getRewardAmountOf(account, "SUPERHUMAN").call().then((_nuclearReward) => {
            console.log({ nuclear_reward: _nuclearReward })
            setNuclearReward(_nuclearReward);
          })
          nuclear.methods._getNodesNames(account).call().then((names) => {
            nuclear.methods._getNodesRewardAvailable(account).call().then((rewards) => {
              let tmp = [];
              let nameArray = names.split("#");
              let rewardArray = rewards.split("#");
              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  reward: rewardArray[i],
                  type: "Nuclear"
                });
              }
              console.log({ nuclear_node: tmp })
              setNuclearNode(tmp);
            })
          });
        } else {
          setNuclearReward(0)
          setNuclearNode([]);
        }
        setUserNuclear(parseInt(_nuclear));
      });
    }, 3000);

    return () => clearInterval(itv);
  }, [account, tier, wind, hydro, solar, nuclear]);

  useEffect(() => {
    let nodeItems;
    let myNodeItemsComponents;

    nodeItems = nuclearNode.concat(solarNode).concat(hydroNode).concat(windNode);

    myNodeItemsComponents = nodeItems.map((item, index) => {
      return <NodeItem key={index} type={item.type} name={item.name} rewards={item.reward} />
    });

    setMyNodeItems(myNodeItemsComponents);
  }, [windNode, hydroNode, solarNode, nuclearNode])

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

  const approve = () => {
    token.methods.approve(tokenAddr, MaxUint256).send({ from: account }).then(() => {
      notify("Approved Successfully!", "Please create a new node", "success");
    })
  }

  const createNode = () => {
    const nameLength = nodeName.length;

    if (nameLength < 3 || nameLength > 12) {
      notify("Invalid node's name!", "Node's name must be between 3 and 12", "warning");
      return;
    }

    if (!isEmpty(windNode)) {
      const index = windNode.findIndex((item) => {
        return item.name == nodeName;
      })
      if (index !== -1) {
        notify("Invalid node's name!", "The name already exists in Wind", "warning");
        return;
      }
    }
    if (!isEmpty(hydroNode)) {
      const index = hydroNode.findIndex((item) => {
        return item.name == nodeName;
      })
      if (index !== -1) {
        notify("Invalid node's name!", "The name already exists in Hydro", "warning");
        return;
      }
    }
    if (!isEmpty(solarNode)) {
      const index = solarNode.findIndex((item) => {
        return item.name == nodeName;
      })
      if (index !== -1) {
        notify("Invalid node's name!", "The name already exists in Solar", "warning");
        return;
      }
    }
    if (!isEmpty(nuclearNode)) {
      const index = nuclearNode.findIndex((item) => {
        return item.name == nodeName;
      })
      if (index !== -1) {
        notify("Invalid node's name!", "The name already exists in Nuclear", "warning");
        return;
      }
    }

    let id = 0;
    let node_type = "";
    if (selectedNode === 'Wind') {
      id = 0;
      node_type = "FLATVERSAL";
    } else if (selectedNode === 'Hydro') {
      id = 1;
      node_type = "MICROSCOPIC";
    } else if (selectedNode === 'Solar') {
      id = 2;
      node_type = "HUMAN";
    } else if (selectedNode === 'Nuclear') {
      id = 3;
      node_type = "SUPERHUMAN";
    }

    if (balance < nodePrice[id]) {
      notify("Insufficient balance!", "Please buy $Power", "warning");
      return;
    }

    tier.methods.createNodeWithTokens(nodeName, node_type).send({ from: account }).then(() => {
      if (selectedNode === 'Wind') {
        notify("Success!", "New Wind node created", "success");
      } else if (selectedNode === 'Hydro') {
        notify("Success!", "New Hydro node created", "success");
      } else if (selectedNode === 'Solar') {
        notify("Success!", "New Solar node created", "success");
      } else if (selectedNode === 'Nuclear') {
        notify("Success!", "New Nuclear node created", "success");
      }

      setNodeName("");
    })
  }

  const claimRewards = () => {

  }

  const inputNodeName = e => {
    setNodeName(e.target.value);
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-end">
        <span className="cl-orange fs-4 fw-bold">Dashboard</span>
        <div className="d-flex align-items-center">
          <span className='cl-gray me-2'>Your wallet:</span>
          <img src="assets/img/icons/power.png" alt="power" style={{ height: '1.1rem' }} />
          <span className="cl-orange fs-5 ms-1">{balance.toFixed(2)}</span>
        </div>
      </div>

      <div className="row mx-0 mt-3">
        <div className="col-lg-4 col-md-6 total-field my-2 ps-0 pe-3">
          <div className="dasboard-card">
            <p className="mb-0 cl-orange-gd fw-bold fs-5">Total Generators</p>
            <div>
              <p className="mb-0">
                <span className='cl-orange-gd fw-bold fs-1'>{totalNode.toLocaleString()}</span>
                <span className="cl-gray ms-2">Generators</span>
              </p>
              <div className="row mx-0 border-top py-1">
                <div className="col-5 px-0 d-flex justify-content-between">
                  <span className='cl-wind'>Wind</span>
                  <span className="cl-orange-gd fw-bold">{totalWind.toLocaleString()}</span>
                </div>
                <div className="col-2 d-flex justify-content-center">
                  <span className='vertical-border'></span>
                </div>
                <div className="col-5 px-0 d-flex justify-content-between">
                  <span className='cl-hydro'>Hydro</span>
                  <span className="cl-orange-gd fw-bold">{totalHydro.toLocaleString()}</span>
                </div>
              </div>
              <div className="row mx-0 border-top py-1">
                <div className="col-5 px-0 d-flex justify-content-between">
                  <span className='cl-solar'>Solar</span>
                  <span className="cl-orange-gd fw-bold">{totalSolar.toLocaleString()}</span>
                </div>
                <div className="col-2 d-flex justify-content-center">
                  <span className='vertical-border'></span>
                </div>
                <div className="col-5 px-0 d-flex justify-content-between">
                  <span className='cl-nuclear'>Nuclear</span>
                  <span className="cl-orange-gd fw-bold">{totalNuclear.toLocaleString()}</span>
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
                <span className="cl-orange-gd fw-bold fs-1" style={{ lineHeight: '2.5rem' }}>{powerPrice.toFixed(2)}</span>
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
                <span className="cl-fantom-gd fw-bold fs-1" style={{ lineHeight: '2.5rem' }}>{ftmPrice.toFixed(2)}</span>
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

            <input type="text" name="node_name" placeholder='Enter your node’s name here' value={nodeName} onChange={inputNodeName} className='nodename_input mt-3' />

            <p className="mb-0 mt-3">If this is your first time creating a node, please approve the contract first.</p>

            <div className="mt-2 d-flex flex-wrap">
              {approved ? (
                <button type='button' className='dark-btn me-2 px-3 my-2' disabled={true}>
                  <span className='cl-orange-gd fw-bold'>Approve Contract</span>
                </button>
              ) : (isEmpty(account) ? (
                <button type='button' className='dark-btn me-2 px-3 my-2' disabled={true}>
                  <span className='cl-orange-gd fw-bold'>Approve Contract</span>
                </button>
              ) : (
                <button type='button' className='dark-btn me-2 px-3 my-2' onClick={approve}>
                  <span className='cl-orange-gd fw-bold'>Approve Contract</span>
                </button>
              )
              )}
              {approved ? (
                <button type='button' className='orange-btn me-2 px-3 my-2' onClick={createNode}>
                  <span className='cl-black fw-bold'>Create Node</span>
                </button>
              ) : (
                <button type='button' className='orange-btn me-2 px-3 my-2' disabled={true}>
                  <span className='cl-black fw-bold'>Create Node</span>
                </button>
              )}
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
              {(parseFloat(windReward) + parseFloat(hydroReward) + parseFloat(solarReward) + parseFloat(nuclearReward) === 0) ? (
                <button type='button' className='white-btn my-1' disabled={true}>
                  <span className="cl-orange-gd fw-bold px-3">Claim Rewards</span>
                </button>
              ) : (
                <button type='button' className='white-btn my-1' onClick={claimRewards}>
                  <span className="cl-orange-gd fw-bold px-3">Claim Rewards</span>
                </button>
              )}

            </div>

            <div className="row mx-0">
              <div className="col-6 p-0 text-start right-border">
                <p className="mb-0 cl-white-60">{(parseFloat(userWind) * 0.003 + parseFloat(userHydro) * 0.025 + parseFloat(userSolar) * 0.1 + parseFloat(userNuclear) * 0.7).toFixed(2)} / Day</p>
                <p className="mb-0 fs-1 cl-white-gd">{(parseFloat(windReward) + parseFloat(hydroReward) + parseFloat(solarReward) + parseFloat(nuclearReward)).toFixed(2)}</p>
                <p className="mb-0 fs-5">/POWER</p>
              </div>
              <div className="col-6 p-0 text-end">
                <p className="mb-0 cl-white-60">${((parseFloat(userWind) * 0.003 + parseFloat(userHydro) * 0.025 + parseFloat(userSolar) * 0.1 + parseFloat(userNuclear) * 0.7) * parseFloat(powerPrice)).toFixed(2)} / Day</p>
                <p className="mb-0 fs-1 cl-white-gd">${((parseFloat(windReward) + parseFloat(hydroReward) + parseFloat(solarReward) + parseFloat(nuclearReward)) * parseFloat(powerPrice)).toFixed(2)}</p>
                <p className="mb-0 fs-5">/USD</p>
              </div>
            </div>
          </div>

          <div className="node-list-field" style={{ height: `${height - 250}px` }}>
            <p className="mb-1 fs-5 cl-orange-gd">Your Generators</p>
            {width > 390 ? (
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

            {(userWind + userHydro + userSolar + userNuclear) === 0 ? (
              <div className="d-flex justify-content-center align-items-center my-5">
                <div className="text-center">
                  <IoTrashBinSharp className='display-2 cl-orange' />
                  <p className='mb-0 cl-orange-gd fw-bold'>No Generator</p>
                </div>
              </div>
            ) : (
              <div className="node-list" style={{ height: `${height - 360}px` }}>
                {myNodeItems}
              </div>
            )}


          </div>
        </div>

      </div>
    </React.Fragment>
  );
}

export default Dashboard;