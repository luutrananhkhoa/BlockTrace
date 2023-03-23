import { faBars, faUser, faRightFromBracket, faBoxOpen, faTractor,
         faWarehouse, faBox, faBoxesPacking, faHandsWash, faSmog, faUserAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import './Sidebar.css'
import logo from '~/assets/images/Logo.png'
import clsx from 'clsx';

const Sidebar = () => {
  
  // const location = useLocation();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  let userInfo = useSelector((state)=>state.userInfo)

  const toggleSidebar =()=>{
    isOpenSidebar === true? setIsOpenSidebar(false): setIsOpenSidebar(true)
  }
  const classes = clsx("wrapper", {
    "wrapperSmall": isOpenSidebar
  })

  return (
    <div className={classes}>
      <div className="sidebar">
        <div className="logoContainer">
          <img src={logo} alt="" />
        </div>
        {/* {!isOpenSidebar?
         <FontAwesomeIcon onClick={toggleSidebar} className="IconSidebar" icon={faArrowLeft} />
        :
        <FontAwesomeIcon onClick={toggleSidebar} className="IconSidebar" icon={faArrowRight} />} */}

        {userInfo.userCategory==='0' &&
          <div className="menuList">
            <NavLink to='/' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/user' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faUser} />
              <p>User</p>
            </NavLink>
            <NavLink to='/product' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faWarehouse} />
              <p>Product</p>
            </NavLink>
            <NavLink to='/farmer' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faTractor} />
              <p>Farmer</p>
            </NavLink>
            <NavLink to='/warehouse' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faWarehouse} />
              <p>Warehouse</p>
            </NavLink>
          </div>
        }

        {userInfo.userCategory==='1' &&
          <div className="menuList">
            <NavLink to='/' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/product' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faWarehouse} />
              <p>Product</p>
            </NavLink>
            <NavLink to='/ingress' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faBoxOpen} />
              <p>Ingress</p>
            </NavLink>
          </div>
        }
         
        {userInfo.userCategory==='2' &&
          <div className="menuList">
            <NavLink to='/' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/product' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faWarehouse} />
              <p>Product</p>
            </NavLink>
            <NavLink to='/rough' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faBox} />
              <p>Rough</p>
            </NavLink>
          </div>
        }

        {userInfo.userCategory==='3' &&
          <div className="menuList">
            <NavLink to='/' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/product' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faWarehouse} />
              <p>Product</p>
            </NavLink>
            <NavLink to='/squash' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faHandsWash} />
              <p>Squash</p>
            </NavLink>
          </div>
        }

        {userInfo.userCategory==='4' &&
          <div className="menuList">
            <NavLink to='/' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/product' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faWarehouse} />
              <p>Product</p>
            </NavLink>
            <NavLink to='/dry' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faSmog} />
              <p>Dry</p>
            </NavLink>
          </div>
        }
        
        {userInfo.userCategory==='5' &&
          <div className="menuList">
            <NavLink to='/' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/product' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faWarehouse} />
              <p>Product</p>
            </NavLink>
            <NavLink to='/package' className="menuItem">
              <FontAwesomeIcon className="menuIcon" icon={faBoxesPacking} />
              <p>Package</p>
            </NavLink>
          </div>
        }
      </div>
      <Link to='/login' onClick={()=>{localStorage.removeItem("isLogin")}} className="logout">
          <FontAwesomeIcon className="menuIcon" icon={faRightFromBracket} />
          <p>Logout</p>
      </Link>
    </div>
  )
}

export default Sidebar