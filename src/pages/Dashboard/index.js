import React, { useState, useEffect } from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri'
import { IoTrashBinSharp } from 'react-icons/io5'
import { useResizeDetector } from 'react-resize-detector'
import { useWeb3React } from "@web3-react/core";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BigNumber } from "@ethersproject/bignumber";

import tierABI from '../../constants/ABI/tier.json';
import tierNodeABI from '../../constants/ABI/node.json';
import tokenABI from '../../constants/ABI/token.json';
import { tierAddr, tierNode, tokenAddr, nodeManagerAddr, ftmAddr, usdtAddr, ftm_usdt_lp, ftm_power_lp } from '../../constants/Addresses';

import './style.css'

import NodeItem from '../../components/NodeItem';

import isEmpty from '../../utils/is-empty';
import notify from '../../utils/notify';

import { setGeneratorWidth } from '../../redux/actions/generatorScreen'

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

const Dashboard = ({ account, contentScreen, setGeneratorWidth }) => {
  const { library } = useWeb3React();

  const { width, height, ref } = useResizeDetector();

  const [selectedNode, setSelectedNode] = useState("Nuclear");
  const [nodeTypeColor, setNodeTypeColor] = useState("cl-nuclear");
  const [nodeStyle, setNodeStyle] = useState({
    background: "linear-gradient(165.39deg, #212226 9.14%, #0b4428 94.36%)",
    border: "1px solid #25E384",
    boxShadow: '-9px -9px 16px rgba(184, 184, 184, 0.08), 9px 9px 16px rgba(0, 0, 0, 0.4)'
  });
  const [nodeItemClass, setNodeItemClass] = useState("col-6");
  const [nodeLeftField, setLeftField] = useState("ps-0 pe-2");
  const [nodeRightField, setRightField] = useState("pe-0 ps-2");
  const [cardGrid, setCardGrid] = useState("col-4");
  const [totalPadding, setTotalPadding] = useState("ps-0 pe-3");
  const [powerPadding, setPowerPadding] = useState("px-1");
  const [fantomPadding, setFantomPadding] = useState("ps-3 pe-0");
  const [nodeCard, setNodeCard] = useState("col-6");
  const [createPadding, setCreatePadding] = useState("ps-0 pe-2");
  const [rewardPadding, setRewardPadding] = useState("ps-2 pe-0");
  const [rpcGrid, setRPCGrid] = useState("col-1");
  const [typeGrid, setTypeGrid] = useState("col-3");
  const [nameGrid, setNameGrid] = useState("col-4");
  const [rewardGrid, setRewardGrid] = useState("col-4");

  const [token, setToken] = useState(undefined);
  const [node, setNode] = useState(undefined);
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

  const nodePrice = [1, 5, 10, 50];

  useEffect(() => {
    if (isEmpty(library) || isEmpty(account)) {
      setToken(undefined);
      setNode(undefined);
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
    const _node = new library.eth.Contract(tierNodeABI, nodeManagerAddr);
    const _ftm = new library.eth.Contract(tokenABI, ftmAddr);
    const _usdt = new library.eth.Contract(tokenABI, usdtAddr);
    const _tier = new library.eth.Contract(tierABI, tierAddr);
    const _wind = new library.eth.Contract(tierNodeABI, tierNode.wind);
    const _hydro = new library.eth.Contract(tierNodeABI, tierNode.hydro);
    const _solar = new library.eth.Contract(tierNodeABI, tierNode.solar);
    const _nuclear = new library.eth.Contract(tierNodeABI, tierNode.nuclear);

    setToken(_token);
    setNode(_node);
    setFTM(_ftm);
    setUSDT(_usdt);
    setTier(_tier);
    setWind(_wind);
    setHydro(_hydro);
    setSolar(_solar);
    setNuclear(_nuclear);
  }, [library, account])

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
        if (_wind != 0) {
          tier.methods.getRewardAmountOf(account, "FLATVERSAL").call().then((_windReward) => {
            setWindReward(parseFloat(_windReward) / ETHUnit);
          })
          wind.methods._getNodesNames(account).call().then((names) => {
            wind.methods._getNodesCreationTime(account).call().then(creationTimes => {
              let tmp = [];
              let nameArray = names.split("#");
              let creationTimeArray = creationTimes.split("#");

              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  creationTime: creationTimeArray[i],
                  type: "Wind"
                });
              }

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
        if (_hydro != 0) {
          tier.methods.getRewardAmountOf(account, "MICROSCOPIC").call().then((_hydroReward) => {
            setHydroReward(parseFloat(_hydroReward) / ETHUnit);
          })
          hydro.methods._getNodesNames(account).call().then((names) => {
            hydro.methods._getNodesCreationTime(account).call().then(creationTimes => {
              let tmp = [];
              let nameArray = names.split("#");
              let creationTimeArray = creationTimes.split("#");

              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  creationTime: creationTimeArray[i],
                  type: "Hydro"
                });
              }

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
        if (_solar != 0) {
          tier.methods.getRewardAmountOf(account, "HUMAN").call().then((_solarReward) => {
            setSolarReward(parseFloat(_solarReward) / ETHUnit);
          })
          solar.methods._getNodesNames(account).call().then((names) => {
            solar.methods._getNodesCreationTime(account).call().then(creationTimes => {
              let tmp = [];
              let nameArray = names.split("#");
              let creationTimeArray = creationTimes.split("#");

              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  creationTime: creationTimeArray[i],
                  type: "Solar"
                });
              }

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
        if (_nuclear != 0) {
          tier.methods.getRewardAmountOf(account, "SUPERHUMAN").call().then((_nuclearReward) => {
            setNuclearReward(parseFloat(_nuclearReward) / ETHUnit);
          })
          nuclear.methods._getNodesNames(account).call().then((names) => {
            nuclear.methods._getNodesCreationTime(account).call().then(creationTimes => {
              let tmp = [];
              let nameArray = names.split("#");
              let creationTimeArray = creationTimes.split("#");

              for (let i = 0; i < nameArray.length; i++) {
                tmp.push({
                  name: nameArray[i],
                  creationTime: creationTimeArray[i],
                  type: "Nuclear"
                });
              }

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
    if (isEmpty(account)) return;

    let nodeItems;
    let myNodeItemsComponents;

    nodeItems = nuclearNode.concat(solarNode).concat(hydroNode).concat(windNode);

    nodeItems.sort((a, b) => {
      var x = a.creationTime.toLowerCase();
      var y = b.creationTime.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });

    myNodeItemsComponents = nodeItems.map((item, index) => {
      return <NodeItem key={index} type={item.type} name={item.name} creationTime={item.creationTime} />
    });

    setMyNodeItems(myNodeItemsComponents);
  }, [windNode, hydroNode, solarNode, nuclearNode])

  useEffect(() => {
    setGeneratorWidth(width);

    if (width > 420) {
      setLeftField("ps-0 pe-2");
      setRightField("pe-0 ps-2");
      setNodeItemClass("col-6");
    } else {
      setLeftField("p-0");
      setRightField("p-0");
      setNodeItemClass("col-12");
    }

    if (width > 700) {
      setRPCGrid("col-1");
      setTypeGrid("col-3");
      setNameGrid("col-4");
      setRewardGrid("col-4");
    } else if (width > 600 && width <= 700) {
      setRPCGrid("col-1");
      setTypeGrid("col-3");
      setNameGrid("col-3");
      setRewardGrid("col-5");
    } else if (width > 510 && width <= 600) {
      setRPCGrid("col-1");
      setTypeGrid("col-2");
      setNameGrid("col-3");
      setRewardGrid("col-6");
    } else if (width > 450 && width <= 510) {
      setRPCGrid("col-1");
      setTypeGrid("col-2");
      setNameGrid("col-2");
      setRewardGrid("col-7");
    } else if (width > 400 && width <= 450) {
      setRPCGrid("col-1");
      setTypeGrid("col-2");
      setNameGrid("col-3");
      setRewardGrid("col-6");
    } else if (width > 350 && width <= 400) {
      setRPCGrid("col-1");
      setTypeGrid("col-2");
      setNameGrid("col-4");
      setRewardGrid("col-5");
    } else {
      setRPCGrid("col-2");
      setTypeGrid("col-2");
      setNameGrid("col-4");
      setRewardGrid("col-4");
    }
  }, [width])

  useEffect(() => {
    if (contentScreen.width > 1000) {
      setCardGrid("col-4");
      setTotalPadding("ps-0 pe-3");
      setPowerPadding("px-1");
      setFantomPadding("ps-3 pe-0");
    } else if (contentScreen.width > 650 && contentScreen.width <= 1000) {
      setCardGrid("col-6");
      setTotalPadding("ps-0 pe-2");
      setPowerPadding("ps-2 pe-0");
      setFantomPadding("px-1");
    } else if (contentScreen.width <= 650) {
      setCardGrid("col-12");
      setTotalPadding("px-0");
      setPowerPadding("px-0");
      setFantomPadding("px-0");
    }

    if (contentScreen.width > 750) {
      setNodeCard("col-6");
      setCreatePadding("ps-0 pe-2");
      setRewardPadding("ps-2 pe-0");
    } else {
      setNodeCard("col-12");
      setCreatePadding("px-0");
      setRewardPadding("px-0");
    }
  }, [contentScreen])

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

    tier.methods.createNodeWithTokens(nodeName, node_type).send({ from: account })
      .then(() => {
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
      .catch(err => console.log({ "Node Creation Error: ": err }));
  }

  const claimAllRewards = () => {
    // tier.methods.cashoutAllTiers().send({ from: account })
    //   .then(() => {
    //     notify("Rewards claimed!", "Check your wallet for your rewards!", "info");
    //   })
    //   .catch(err => console.log({ "Claim Rewards Error: ": err }));

    if (windReward !== 0) {
      tier.methods.cashoutAll("FLATVERSAL").send({ from: account })
        .then(() => {
          notify("Wind Rewards claimed!", "Check your wallet for your rewards!", "info");
        })
        .catch(err => console.log({ "Claim Rewards Error: ": err }));
    } else if (hydroReward !== 0) {
      tier.methods.cashoutAll("MICROSCOPIC").send({ from: account })
        .then(() => {
          notify("Hydro Rewards claimed!", "Check your wallet for your rewards!", "info");
        })
        .catch(err => console.log({ "Claim Rewards Error: ": err }));
    } else if (solarReward !== 0) {
      tier.methods.cashoutAll("HUMAN").send({ from: account })
        .then(() => {
          notify("Solar Rewards claimed!", "Check your wallet for your rewards!", "info");
        })
        .catch(err => console.log({ "Claim Rewards Error: ": err }));
    } else if (nuclearReward !== 0) {
      tier.methods.cashoutAll("SUPERHUMAN").send({ from: account })
        .then(() => {
          notify("Nuclear Rewards claimed!", "Check your wallet for your rewards!", "info");
        })
        .catch(err => console.log({ "Claim Rewards Error: ": err }));
    }
  }

  const inputNodeName = e => {
    setNodeName(e.target.value);
  }

  const compoundReward = () => {
    let selectedTierName;
    let tierName;
    let isGod = false;

    if (!isEmpty(windNode)) {
      const index = windNode.findIndex((item) => {
        return item.name == nodeName;
      })
      if (index !== -1) {
        notify("Invalid node's name!", "The name already exists in Wind", "warning");
        return;
      } else {
        tierName = "FLATVERSAL";
      }
    }
    if (!isEmpty(hydroNode)) {
      const index = hydroNode.findIndex((item) => {
        return item.name == nodeName;
      })
      if (index !== -1) {
        notify("Invalid node's name!", "The name already exists in Hydro", "warning");
        return;
      } else {
        tierName = "MICROSCOPIC";
      }
    }
    if (!isEmpty(solarNode)) {
      const index = solarNode.findIndex((item) => {
        return item.name == nodeName;
      })
      if (index !== -1) {
        notify("Invalid node's name!", "The name already exists in Solar", "warning");
        return;
      } else {
        tierName = "HUMAN";
      }
    }
    if (!isEmpty(nuclearNode)) {
      const index = nuclearNode.findIndex((item) => {
        return item.name == nodeName;
      })
      if (index !== -1) {
        notify("Invalid node's name!", "The name already exists in Nuclear", "warning");
        return;
      } else {
        tierName = "SUPERHUMAN";
      }
    }

    if (userWind !== 0 && userHydro !== 0 && userSolar !== 0 && userNuclear !== 0) {
      isGod = true;
    }

    if (selectedNode === "Wind")
      selectedTierName = "FLATVERSAL";
    else if (selectedNode === "Hydro")
      selectedTierName = "MICROSCOPIC";
    else if (selectedNode === "Solar")
      selectedTierName = "HUMAN";
    else if (selectedNode === "Nuclear")
      selectedTierName = "SUPERHUMAN";

    if (!isGod) {
      tier.methods.compoundTierInto(tierName, tierName, nodeName).send({ from: account })
        .then(() => {
          notify("Successfully Compounded!", "New Node Compounded", "success");
        })
        .catch(err => console.log({ "Reward Compound Error: ": err }));
    } else {
      tier.methods.compoundInto(selectedTierName, nodeName).send({ from: account })
        .then(() => {
          notify("New Node Compounded!", "New Node Compounded", "success");
        })
        .catch(err => console.log({ "Reward Compound Error: ": err }));
    }
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

      <div className="row mx-0 mt-3 d-flex justify-content-center">
        <div className={`${cardGrid} ${totalPadding} my-2`}>
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

        <div className={`${cardGrid} ${powerPadding} my-2`}>
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

        <div className={`${cardGrid} ${fantomPadding} my-2`}>
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
        <div className={`${nodeCard} ${createPadding} node-field my-2`} ref={ref}>
          <div className="node-card">
            <div className="d-flex justify-content-between align-items-end">
              <span className='cl-orange-gd fw-bold fs-5'>Create a Generator</span>
              <span className="cl-gray">Selected: <span className={`${nodeTypeColor}`}>{selectedNode}</span></span>
            </div>

            <div>
              <div className="row mx-0 mt-2">
                <div className={`${nodeItemClass} my-2 text-center ${nodeLeftField}`}>
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

                <div className={`${nodeItemClass} my-2 text-center ${nodeRightField}`}>
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
                <div className={`${nodeItemClass} my-2 text-center ${nodeLeftField}`}>
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

                <div className={`${nodeItemClass} my-2 text-center ${nodeRightField}`}>
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

              {approved ? (
                <button type='button' className='orange-btn px-3 my-2' onClick={compoundReward}>
                  <span className='cl-black fw-bold'>Compound Rewards</span>
                </button>
              ) : (
                <button type='button' className='orange-btn px-3 my-2' disabled={true}>
                  <span className='cl-black fw-bold'>Compound Rewards</span>
                </button>
              )}
            </div>

          </div>
        </div>

        <div className={`${nodeCard} ${rewardPadding} node-field my-2`}>
          <div className="reward-field d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between flex-wrap">
              <div className="d-flex align-items-center my-1">
                <img src="assets/img/icons/generator.png" alt="generator" className='icon-size me-2' />
                <span className="fs-5">Your Rewards</span>
              </div>
              {(windReward + hydroReward + solarReward + nuclearReward) === 0 ? (
                <button type='button' className='white-btn my-1' disabled={true}>
                  <span className="cl-orange-gd fw-bold px-3">Claim Rewards</span>
                </button>
              ) : (
                <button type='button' className='white-btn my-1' onClick={claimAllRewards}>
                  <span className="cl-orange-gd fw-bold px-3">Claim Rewards</span>
                </button>
              )}

            </div>

            <div className="row mx-0">
              <div className="col-6 p-0 text-start right-border">
                <p className="mb-0 cl-white-60">{(userWind * 0.003 + userHydro * 0.025 + userSolar * 0.1 + userNuclear * 0.7).toFixed(3)} / Day</p>
                <p className="mb-0 fs-1 cl-white-gd">{(windReward + hydroReward + solarReward + nuclearReward).toFixed(3)}</p>
                <p className="mb-0 fs-5">/POWER</p>
              </div>
              <div className="col-6 p-0 text-end">
                <p className="mb-0 cl-white-60">${((userWind * 0.003 + userHydro * 0.025 + userSolar * 0.1 + userNuclear * 0.7) * powerPrice).toFixed(3)} / Day</p>
                <p className="mb-0 fs-1 cl-white-gd">${((windReward + hydroReward + solarReward + nuclearReward) * powerPrice).toFixed(2)}</p>
                <p className="mb-0 fs-5">/USD</p>
              </div>
            </div>
          </div>

          <div className="node-list-field" style={{ height: `${height - 250}px` }}>
            <p className="mb-1 fs-5 cl-orange-gd">Your Generators</p>
            <div className="row mx-0 my-2" id='node-list-header'>
              <div className={`${rpcGrid}`}>
                <span className="cl-white-40">RPC</span>
              </div>
              <div className={`${typeGrid}`}>
                <span className="cl-white-40">Type</span>
              </div>
              <div className={`${nameGrid}`}>
                <span className="cl-white-40">Name</span>
              </div>
              <div className={`${rewardGrid}`}>
                <span className="cl-white-40">Rewards</span>
              </div>
            </div>

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

Dashboard.propTypes = {
  setGeneratorWidth: PropTypes.func.isRequired,
  contentScreen: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    account: state.account.myAccount,
    contentScreen: state.contentScreen,
  }
}

export default connect(mapStateToProps, { setGeneratorWidth })(Dashboard);