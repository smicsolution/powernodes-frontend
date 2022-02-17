import React, { useState, useEffect } from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link } from 'react-router-dom'
import { useResizeDetector } from 'react-resize-detector'

import { BiChat } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { IoShareSocialOutline } from 'react-icons/io5'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { GiTwoCoins, GiCheckMark } from 'react-icons/gi'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'
import { MdTimeline, MdOutlineOfflineBolt } from 'react-icons/md'
import { AiFillApi } from 'react-icons/ai'
import { FaAngleDoubleRight } from 'react-icons/fa'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import "react-pro-sidebar/dist/css/styles.css";
import './style.css';

import { hideSideMenu, showSideMenu } from '../../redux/actions/sidemenu'
import { setSidebarHeight } from '../../redux/actions/sidebarHeight'

const SideMenu = ({ sidemenu, hideSideMenu, showSideMenu, header, setSidebarHeight, screen }) => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const { width, height, ref } = useResizeDetector();

  useEffect(() => {
    setMenuCollapse(sidemenu.isVisibleSidemenu);
  }, [sidemenu])

  useEffect(() => {
    setSidebarHeight(height);
  }, [height])

  useEffect(() => {
    if (screen.width <= 700)
      ref.current.style.position = "absolute";
    else ref.current.style.position = "relative";
  }, [screen])

  const menuIconClick = () => {
    menuCollapse ? showSideMenu() : hideSideMenu();
  };

  // const onMouseEnter = () => {
  //   showSideMenu();
  // }

  // const onMouseLeave = () => {
  //   hideSideMenu();
  // }

  return <React.Fragment>
    <div className='sidemenu-field' ref={ref}>
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader className={`sidebar-header ${menuCollapse ? 'justify-content-center py-4 px-0' : 'justify-content-between'}`}>
          <p className='mb-0'>{menuCollapse ? "" : "DASHBOARD"}</p>
          <div className='close-menu-btn fs-5' onClick={menuIconClick}>
            {menuCollapse ? (
              <FaAngleDoubleRight />
            ) : (
              <RiCloseLine />
            )}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu>
            <MenuItem icon={<BsFillGrid3X3GapFill />}>
              Dashboard
              <Link to="/dashboard" />
            </MenuItem>
            <MenuItem icon={<GiTwoCoins />}>
              Farms
              <Link to="/farms" />
            </MenuItem>
            <MenuItem icon={<HiOutlineCurrencyDollar />}>
              Treasury
              <a href="https://treasury.powernode.io/" target="_self" />
            </MenuItem>
            <MenuItem icon={<MdTimeline />}>White Paper</MenuItem>
            <MenuItem icon={<IoShareSocialOutline />}>Social Feeds</MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarHeader className='sidebar-header'>
          <p className='mb-0'>{menuCollapse ? "" : "ADMINISTRATION"}</p>
        </SidebarHeader>

        <SidebarContent>
          <Menu>
            <MenuItem icon={<AiFillApi className='item-flip' />}>
              Connect App
            </MenuItem>
            <MenuItem icon={<MdOutlineOfflineBolt />}>Add Power Token</MenuItem>
            <MenuItem icon={<GiCheckMark />}>Approve Power</MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarHeader className='sidebar-header'>
          <p className='mb-0'>{menuCollapse ? "" : "UOT MEMBERS"}</p>
        </SidebarHeader>

        <SidebarContent>
          <Menu>
            <MenuItem icon={<img src="assets/img/icons/power.png" alt="power" className='sidebar-icon' />}>
              <span className='cl-orange-gd fw-bold'>Power</span>
            </MenuItem>
            <MenuItem icon={<img src="assets/img/icons/thor.png" alt="power" className='sidebar-icon' />}>
              <span>Thor</span>
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu>
            <MenuItem icon={<BiChat />}>Feedback & Support</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  </React.Fragment>;
}

SideMenu.propTypes = {
  showSideMenu: PropTypes.func.isRequired,
  hideSideMenu: PropTypes.func.isRequired,
  setSidebarHeight: PropTypes.func.isRequired,
  sidemenu: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  screen: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    sidemenu: state.sidemenu,
    header: state.header,
    screen: state.screen
  }
}

export default connect(mapStateToProps, { hideSideMenu, showSideMenu, setSidebarHeight })(SideMenu);