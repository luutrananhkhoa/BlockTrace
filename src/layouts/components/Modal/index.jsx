import React, { useContext } from 'react'
import styles from './Modal.module.scss'
import closeIcon from '~/assets/images/Close.svg'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
import { useFormik } from 'formik';
import * as Yup from 'yup'
// import { Context } from '~/context/Context';
import { useDispatch, useSelector } from 'react-redux';

const Modal = (props) => {

  const {setIsShown} = props;
  // const { address, setAddress} = useContext(Context)
  let addressAccount = useSelector((state)=>state.address)
  const hideModalHandler = () =>{
    setIsShown(false)
  }

  const formik = useFormik({
    initialValues: {
        UserName: "",
        Address: "",
        Date: "",
        FarmerName: ""
    },
    validationSchema: Yup.object({
      UserName: Yup.string('Require int').required('Required*'),
      Address: Yup.string('Require int').required('Required*'),
      Date: Yup.string('Require int').required('Required*'),
      FarmerName: Yup.string('Require int').required('Required*')

    }),
    onSubmit: async (values)=>{
        console.log(values)
        getProcessingContract().then((contract)=>{
          contract.methods.addIngress(
                values.UserName,
                values.FarmerName,
                parseInt(values.Date),
                values.Address
            ).send({
                from: addressAccount.address
              }).then((res)=>{console.log(res);
            }).then(()=>{setIsShown(false)})
            .catch((err)=>{console.log(err);})
            
        }).catch((err)=>{console.log(err);})
    }
})

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.headerModal}>
          <h4>Importer</h4>
            <div className={styles.closeIcon}> 
                <div onClick={hideModalHandler} ><img src={closeIcon} alt="" /></div>
            </div>
        </div>
        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="UserName">UserName</label>
            <input type="text" name="UserName" 
            value={formik.values.UserName} 
            onChange={formik.handleChange}/>
              <p>{formik.errors.UserName}</p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="FarmerName">FarmerName</label>
            <input type="text" name="FarmerName" 
            value={formik.values.FarmerName} 
            onChange={formik.handleChange}/>
              <p>{formik.errors.FarmerName}</p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="Address">Address</label>
            <input type="text" name="Address" 
            value={formik.values.Address} 
            onChange={formik.handleChange}/>
              <p>{formik.errors.Address}</p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="Date">Date</label>
            <input type="text" name="Date" 
            value={formik.values.Date} 
            onChange={formik.handleChange}/>
              <p>{formik.errors.Date}</p>
          </div>
         
        </div>
        <div className={styles.buttonContainer}>
          <button 
            className={styles.button_Ok}
            type="submit" onClick={formik.handleSubmit}
          >OK</button>
        </div>
       
      </div>
    </div>
    
  )
}

export default Modal