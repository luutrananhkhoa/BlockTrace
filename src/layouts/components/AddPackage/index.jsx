import React, { useEffect } from 'react'
import styles from './AddPackage.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { NFTStorage, File } from "nft.storage";
import { useRef } from 'react';
import axios from 'axios';
import Package from './../../../pages/Package/index';

const AddPackage = (props) => {
    const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ0M2MyNTQ0ZEQzRTBEOThmODA5RGIyOTFGYjJjOUVBQ0FCMDk0ZDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MTA5NzkzMjY2OCwibmFtZSI6Imx0YWsifQ.fsQKauAy7q2xFUK9iNipp2bivyvu2vIcg_iQOsuzJVU"

    const addressAccount = useSelector((state)=>state.address)
    const [listWarehouses, setListWarehouses] =useState([])
    const {setIsShow} = props;
    const inputRef = useRef();
    const [linkImg, setLinkImg] = useState()
    const [file, setFile] = useState();

    useEffect(()=>{
        getProcessingContract().then((contract) =>{
            contract.methods.getAllWarehouse().call({
              from: addressAccount.address
            })
            .then((response)=>{
              console.log('response', response)
              setListWarehouses(response)
            })
            .catch((err)=>{console.log(err);})
          })
    },[])
    const formik = useFormik({
        initialValues: {
            BatchId: "",
            UserName: "",
            Warehouse   : "",
            Date: "",
        },
        validationSchema: Yup.object({
          BatchId: Yup.string().required('Required!'),
          UserName: Yup.string().required('Required!'),
          Warehouse: Yup.string().required('Required!'),
          Date: Yup.string().required('Required!'),
        }),
        onSubmit: async (values)=>{
            console.log(values)
            handleUpload()
            
            let keyValue = Math.floor(Math.random()*100000)
        
            getProcessingContract().then((contract)=>{
                contract.methods.addPackage(
                    values.BatchId,
                    values.UserName,
                    values.Date,
                    values.Warehouse,
                    linkImg,
                    keyValue
                ).send({
                    from: addressAccount.address
                }).then((res)=>{
                    console.log(res)
                    // dispatch(saveQR(res.blockNumber.toString()))
    
                    res.status&&setIsShow(true)
                })
                .catch((err)=>{console.log(err);})
                
            }).catch((err)=>{console.log(err);})
        }
    })

    //Upload img NFT Storage
    async function storeNFT(image, name, description) {
        // load the file from disk
      
        // create a new NFTStorage client using our API key
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
      
        // call client.store, passing in the image & metadata
        return nftstorage.store({
          image,
          name,
          description,
        });
      }
      
      const handleUpload = async () =>{
        // await storeNFT(e?.target?.files[0], "a", "a")
            //   .then((success) => console.log(success))
            //   .catch((error) => console.log(error));
            if(file){
              const fileName = file.name;
              const newFile = new File([file], fileName, {
                type: file.type,
                lastModified: file.lastModified,
              });
    
              // console.log(newFile);
              const ipfsImage = await storeNFT(
                newFile,
                fileName,
                "description"
              ).then((success) => {
                  // console.log(
                  //   `https://cloudflare-ipfs.com/ipfs/${success.ipnft}/metadata.json`
                  // );
                  axios
                    .get(
                      `https://cloudflare-ipfs.com/ipfs/${success.ipnft}/metadata.json`
                    )
                    .then((imageURL) => {
                      const a = imageURL.data?.image;
                      const x = a.replace(
                        "ipfs://",
                        "https://cloudflare-ipfs.com/ipfs/"
                      );
                      console.log(x);
                      setLinkImg(x);
                    })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
            }
            
      }
  
  return (
    <div className={styles.wrapper}>
        <div className={styles.title}>
            <h2>Add Package</h2>
        </div>
        <div className={styles.form}>
            <div className={styles.inputContainer}>
                <label htmlFor="BatchId">BatchId</label>
                <input type="text" name="BatchId" 
                placeholder='Batch Id'
                value={formik.values.BatchId} 
                onChange={formik.handleChange}/>
                <p>{formik.errors.BatchId}</p>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="UserName">Full Name</label>
                <input type="text" name="UserName" 
                placeholder='Full name'
                value={formik.values.UserName} 
                onChange={formik.handleChange}/>
                <p>{formik.errors.UserName}</p>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="Date">Date</label>
                <input type="date" name="Date" 
                value={formik.values.Date} 
                onChange={formik.handleChange}/>
                <p>{formik.errors.Date}</p>
            </div>
            <div className={styles.inputContainer}>
                <label>Warehouse</label>
                <select 
                name="Warehouse"
                value={formik.values.Ward}
                onChange={formik.handleChange}>
                    <option value="" label="Select a warehouse">
                    Warehouse
                    </option>
                {listWarehouses.map((Warehouse, index)=>{
                    return  <option key={Warehouse.warehouseId} value={Warehouse.warehouseAddress}>
                            {Warehouse.warehouseName}
                            </option>
                })}
                </select>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="Upload">Process Photo</label>
                <input type="file" name="upload" 
                ref={inputRef}
                onChange={e => {
                    setFile(e.target.files[0]);
                }}
                />
            </div>
        </div>
        <div className={styles.buttonContainer}>
          <button 
            className={styles.button_Ok}
            type="submit" onClick={formik.handleSubmit}
          >OK</button>
        </div>
    </div>
  )
}

export default AddPackage