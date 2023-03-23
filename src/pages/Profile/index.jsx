import React, { useEffect, useState } from 'react'
import styles from './Profile.module.scss'
import { useSelector } from 'react-redux';
import {getContract as getProfileContract} from "~/contracts/userContract"
const Profile = () => {
    let address = useSelector((state)=>state.address.address)
    const [profileUser, setProfileUser] = useState([])

    useEffect(()=>{
        getProfileContract().then((contract) =>{
            contract.methods.getAllUser().call({
              from: address
            })
            .then((response)=>{
              if(response){
                setProfileUser(response)
                console.log('profileUser', profileUser)
              } 
            })
            .catch((err)=>{console.log(err);})
          })
  
    },[])
  return (
    <div className={styles.Wrapper}>
        <div className={styles.title}>
            <h1>Profile</h1>
            {profileUser.map((item, index) =>{
                return ( item.userAddress == address
                    &&
                    <>
                        <span>{item.fullName}</span>
                    </>
                    ) 
          })}
        </div>
    </div>
  )
}

export default Profile