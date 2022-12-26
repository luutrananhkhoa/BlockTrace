import React, { useContext, useState } from 'react'
import Modal from '~/layouts/components/Modal'
import styles from './Dashboard.module.scss'
import { Context } from '~/context/Context.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '~/redux/slices/userSlice';
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract";
import Badge from '~/components/Badge';
import QR from '~/components/QR';

const Dashboard = () => {
  // const { address, setAddress} = useContext(Context)
  const [isShown,setIsShown] = useState(false)
  const [isShownQR,setIsShownQR] = useState(false)

  const addressRedux = useSelector((state) => state.address)
  console.log('dsadsa',addressRedux);

  return (
    <div className={styles.wrapper}>
      {isShown && <Modal setIsShownQR={setIsShownQR} setIsShown={setIsShown}/>}
      {isShownQR && <QR setIsShownQR={setIsShownQR}/>}
        <div className={styles.title}>
          <h1>Dashboard</h1>
          {/* <button 
            className={styles.button_Add}
            onClick = {()=>setIsShown(true)}>+ Add</button> */}
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