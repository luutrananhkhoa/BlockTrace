import React, { useEffect, useState } from 'react'
import styles from './Users.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '~/redux/slices/userSlice';
import {getContract as getUserContract} from "~/contracts/userContract";

const Users = () => {
    let address = useSelector((state)=>state.address)

    const [listUsers, setListUsers] = useState([])

    useEffect(()=>{
        getUserContract().then((contract) =>{
            contract.methods.getAllUser().call({
              from: address.address
            })
            .then((response)=>{
              console.log('response', response)
              setListUsers(response)
            })
            .catch((err)=>{console.log(err);})
          })
    },[])

  return (
    <div className={styles.wrapper}>
        <div className={styles.title}>
            <h1>Users</h1>
        </div>
        <div className={styles.content}>
            <div className={styles.table}>
                <div className={styles.userItemHeader}>
                    <div className={styles.userName}>
                        <h3>User Name</h3>
                    </div>
                    <div className={styles.userAddress}>
                        <h3>Address</h3>
                    </div>
                    <div className={styles.userCategory}>
                        <h3>Category</h3>
                    </div>
                    <div className={styles.userCategory}>
                        <h3>userIsChecked</h3>
                    </div>
                </div>
                { listUsers.map((user,index)=>{
                    return(
                        <div key={index} className={styles.userItem}>
                            <div className={styles.userName}>
                                <p>{user.fullName}</p>
                            </div>
                            <div className={styles.userAddress}>
                                <p>{user.userAddress}</p>
                            </div>
                            <div className={styles.userCategory}>
                                <p>{user.userCatergory}</p>
                            </div>
                            <div className={styles.userCategory}>
                                <p>{user.userIsChecked==true?'true':'false'}</p>
                            </div>
                        </div>
                    ) 
                        
                })}
               
            </div>
        </div>
    </div>
  )
}

export default Users