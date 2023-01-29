import React, { useContext, useState } from 'react'
import Modal from '~/layouts/components/Modal'
import styles from './Dashboard.module.scss'
import { Context } from '~/context/Context.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '~/redux/slices/userSlice';
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract";
import Badge from '~/components/Badge';
import QR from '~/components/QR';
import { faCheck, faClockFour, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Toast from '~/components/Toast/Toast';
const Dashboard = () => {
  // const { address, setAddress} = useContext(Context)
  const [isShown,setIsShown] = useState(false)
  const [isShownQR,setIsShownQR] = useState(false)

  const addressRedux = useSelector((state) => state.address)
  const fullName = useSelector((state) => state.userInfo.fullName)

  return (
    <div className={styles.wrapper}>
      <Toast 
        toastType="success"
        toastTitle="This is a success message"
        />
      {isShown && <Modal setIsShownQR={setIsShownQR} setIsShown={setIsShown}/>}
      {isShownQR && <QR setIsShownQR={setIsShownQR}/>}
        <div className={styles.title}>
          <h1>Dashboard</h1>
          <h6>Welcome, {fullName}!</h6>
          {/* <button 
            className={styles.button_Add}
            onClick = {()=>setIsShown(true)}>+ Add</button> */}
        </div>
        <div className={styles.cardContainer}>
            <div className={styles.cardItem}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faCheck}/>
              <div className={styles.cardInfo}>
                <p>3</p>
                <h6>Complete</h6>
              </div>
            </div>
            <div className={styles.cardItem}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faClockFour}/>
              <div className={styles.cardInfo}>
                <p>4</p>
                <h6>Pending</h6>
              </div>
            </div>
            <div className={styles.cardItem}>
              <FontAwesomeIcon className={styles.cardIcon} icon={faCircleXmark}/>
              <div className={styles.cardInfo}>
                <p>2</p>
                <h6>Not Available</h6>
              </div>
            </div>
        </div>
        <div className={styles.overview}>
          <h2>Overview</h2>
          <table>
            <thead>
              <tr>
                <th>BatchID</th>
                <th>Ingress</th>
                <th>Rough</th>
                <th>Title</th>
                <th>Title</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td><Badge
                    title="Complete"
                    completed
                    /></td>
                <td>
                <Badge
                    title="Pending"
                    pending
                    />
                </td>
                <td>
                <Badge
                    title="Not Available"
                    notAvailable
                    />
                </td>
                <td>
                <Badge
                    title="Not Available"
                    notAvailable
                    />
                </td>
                <td>
                <Badge
                    title="Not Available"
                    notAvailable
                    />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td><Badge
                    title="Complete"
                    completed
                    /></td>
                <td>
                <Badge
                    title="Pending"
                    pending
                    />
                </td>
                <td>
                <Badge
                    title="Not Available"
                    notAvailable
                    />
                </td>
                <td>
                <Badge
                    title="Not Available"
                    notAvailable
                    />
                </td>
                <td>
                <Badge
                    title="Not Available"
                    notAvailable
                    />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td><Badge
                    title="Complete"
                    completed
                    /></td>
                <td>
                <Badge
                    title="Pending"
                    pending
                    />
                </td>
                <td>
                <Badge
                    title="Not Available"
                    notAvailable
                    />
                </td>
                <td>
                <Badge
                    title="Not Available"
                    notAvailable
                    />
                </td>
                <td>
                <Badge
                    title="Not Available"
                    notAvailable
                    />
                </td>
              </tr>
            </tbody>
            
          </table>
        </div>
    </div>
  )
}

export default Dashboard