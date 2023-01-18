import React, { useContext, useEffect, useState } from 'react'
import styles from './AddProduct.module.scss'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
import { useFormik } from 'formik';
import * as Yup from 'yup'
// import { Context } from '~/context/Context';
import { useDispatch, useSelector } from 'react-redux';
// import { saveQR } from '~/redux/slices/userSlice';
import axios from 'axios';
import { NFTStorage, File } from "nft.storage";
import { useRef } from 'react';
import Toast from '~/components/Toast/Toast';
// import { level1s } from 'dvhcvn'
  
const AddProduct = (props) => {
  const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ0M2MyNTQ0ZEQzRTBEOThmODA5RGIyOTFGYjJjOUVBQ0FCMDk0ZDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MTA5NzkzMjY2OCwibmFtZSI6Imx0YWsifQ.fsQKauAy7q2xFUK9iNipp2bivyvu2vIcg_iQOsuzJVU"

  const {setIsShow, setIsShownQR} = props;
  const inputRef = useRef();
  const [linkImg, setLinkImg] = useState()
  const [file, setFile] = useState();

  const dispatch = useDispatch()

  const [listProvinces, setListProvinces] = useState([])
  const [listDistricts, setListDistricts] = useState([])
  const [listWards, setListWards] = useState([])

  let provinceId
  let districtId

  const handleProvinceSelector = async () =>{

    if(provinceId){
      await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
      .then(res=>{
        console.log(res)
        setListDistricts(res.data.results)
      })
      .catch(err=>console.log(err))

    }else{

    }
  }
  const handleDistrictSelector = async () =>{

    if(districtId){
      await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
      .then(res=>{
        console.log(res)
        setListWards(res.data.results)
      })
      .catch(err=>console.log(err))

    }else{

    }
  }

  // const { address, setAddress} = useContext(Context)
  let addressAccount = useSelector((state)=>state.address)
  const hideModalHandler = () =>{
    setIsShow(false)
  }

  const formik = useFormik({
        initialValues: {
            UserName: "",
            Address: "",
            Date: "",
            IdentityFarmer: "",
            Province: "",
            District: "",
            Ward: "",
        },
        validationSchema: Yup.object({
          UserName: Yup.string().required('Required!'),
          Address: Yup.string().required('Required!'),
          Date: Yup.string().required('Required!'),
          IdentityFarmer: Yup.number()
            .min(10, "Must be 9 characters")
            .required('Required!'),
          Province: Yup.string().required('Required!'),
          District: Yup.string().required('Required!'),
          Ward: Yup.string().required('Required!'),
        }),
        onSubmit: async (values)=>{
            console.log(values)
            handleUpload()

            let key = Math.floor(Math.random()*1000000)
            let fullAddress =values.Address + ', ' + values.Ward +', ' + values.District +', '+ values.Province
            console.log('addr', fullAddress)
            console.log('key', key)

            getProcessingContract().then((contract)=>{
            contract.methods.addIngress(
                    values.UserName,
                    parseInt(values.IdentityFarmer),
                    values.Date,
                    fullAddress,
                    linkImg,
                    key
                ).send({
                    from: addressAccount.address
                }).then((res)=>{
                    console.log(res)
                    // dispatch(saveQR(res.blockNumber.toString()))

                    res.status && <Toast toastType="success" toastTitle="Complete add ingress."/>  
                })
                .catch((err)=>{console.log(err);})
                
            }).catch((err)=>{console.log(err);})
        }
    })

    useEffect(()=>{
        axios.get('https://vapi.vnappmob.com/api/province/')
        .then(res=>{
          console.log(res)
          setListProvinces(res.data.results)
        })
        .catch(err=>console.log(err))

    },[])

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
            <h2>Add Ingress</h2>
        </div>
        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="UserName">Full Name</label>
            <input type="text" name="UserName" 
            placeholder='Username'
            value={formik.values.UserName} 
            onChange={formik.handleChange}/>
              <p>{formik.errors.UserName}</p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="IdentityFarmer">Farmer's Identity Number</label>
            <input type="text" name="IdentityFarmer" 
            placeholder='Identification'
            value={formik.values.IdentityFarmer} 
            onChange={formik.handleChange}/>
              <p>{formik.errors.IdentityFarmer}</p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="Address">Address</label>
            <input type="text" name="Address" 
            placeholder='Address'
            value={formik.values.Address} 
            onChange={formik.handleChange}/>
              <p>{formik.errors.Address}</p>
          </div>
          
          <div className={styles.inputContainer}>
          <label>Province</label>
            <select 
            name="Province"
            value={formik.values.Province}
            onChange={e=>{
              formik.handleChange(e)
              // console.log('dsa',e.target.value)
              const selectedProvince = listProvinces.find(
                (entry) => entry.province_name === e.target.value
              );
              // console.log('111',selectedProvince)
              provinceId =selectedProvince.province_id
              handleProvinceSelector()
            }}
            >
                <option value="" label="Select a province">
                  Province
                </option>
              {listProvinces.map((province, index)=>{
                return  <option key={province.province_id} value={province.province_name} onChange={()=>{console.log(province.province_id)}}>
                          {province.province_name}
                        </option>
              })}
            </select>
          </div>
          <div className={styles.inputContainer}>
            <label>District</label>
            <select 
            name="District"
            value={formik.values.District}
            onChange={e=>{
              formik.handleChange(e)
              // console.log('dsa',e.target.value)
              const selectedDistrict = listDistricts.find(
                (entry) => entry.district_name === e.target.value
              );
              // console.log('111',selectedDistrict)
              districtId =selectedDistrict.district_id
              handleDistrictSelector()
            }}>
                <option value="" label="Select a district">
                  District
                </option>
              {listDistricts.map((district, index)=>{
                return  <option key={district.district_id} value={district.district_name}>
                          {district.district_name}
                        </option>
              })}
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label>Ward</label>
            <select 
            name="Ward"
            value={formik.values.Ward}
            onChange={formik.handleChange}>
                <option value="" label="Select a ward">
                  Ward
                </option>
              {listWards.map((ward, index)=>{
                return  <option key={ward.ward_id} value={ward.ward_name}>
                          {ward.ward_name}
                        </option>
              })}
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="Date">Date</label>
            <input type="date" name="Date" 
            value={formik.values.Date} 
            onChange={formik.handleChange}/>
              <p>{formik.errors.Date}</p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="Upload">Photo</label>
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

export default AddProduct