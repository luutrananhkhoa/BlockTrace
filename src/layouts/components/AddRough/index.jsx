import React, { useContext, useEffect, useState } from 'react'
import styles from './AddRough.module.scss'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { saveQR } from '~/redux/slices/userSlice';
import axios from 'axios';
import { NFTStorage, File } from "nft.storage";
import { useRef } from 'react';

const AddRough = (props) => {
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
            BatchId: "",
            UserName: "",
            Address: "",
            Date: "",
            Province: "",
            District: "",
            Ward: "",
        },
        validationSchema: Yup.object({
          BatchId: Yup.string('Require int').required('Required*'),
          UserName: Yup.string('Require int').required('Required*'),
          Address: Yup.string('Require int').required('Required*'),
          Date: Yup.string('Require int').required('Required*'),
          Province: Yup.string('Require int').required('Required*'),
          District: Yup.string('Require int').required('Required*'),
          Ward: Yup.string('Require int').required('Required*'),
        }),
        onSubmit: async (values)=>{
            console.log(values)
            handleUpload()
            
            let keyValue = Math.floor(Math.random()*100000)
            let fullAddress =values.Address + ', ' + values.Ward +', ' + values.District +', '+ values.Province
            console.log('addr', fullAddress)

            getProcessingContract().then((contract)=>{
            contract.methods.addRough(
                    values.BatchId,
                    values.UserName,
                    values.Date,
                    fullAddress,
                    linkImg,
                    keyValue
                ).send({
                    from: addressAccount.address
                }).then((res)=>{
                    console.log(res)
                    dispatch(saveQR(res.blockNumber.toString()))

                    res.status&&alert("Add batch success!")
                    setIsShow(false)

                    setIsShownQR(true)
                })
                .catch((err)=>{console.log(err);})
                
            }).catch((err)=>{console.log(err);})
        }
    })

    useEffect(()=>{
        // axios.get('https://provinces.open-api.vn/api/p/')
        // .then(res=>{
        //   console.log(res)
        //   setListProvinces(res.data)
        // })
        // .catch(err=>console.log(err))

        // axios.get('https://provinces.open-api.vn/api/d/')
        // .then(res=>{
        //   console.log(res)
        //   setListDistricts(res.data)
        // })
        // .catch(err=>console.log(err))

        // axios.get('https://provinces.open-api.vn/api/w/')
        // .then(res=>{
        //   console.log(res)
        //   setListWards(res.data)
        // })
        // .catch(err=>console.log(err))

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
            <h2>Add Rough </h2>
        </div>
        <div className={styles.form}>
        <div className={styles.inputContainer}>
            <label htmlFor="BatchId">BatchId</label>
            <input type="text" name="BatchId" 
            value={formik.values.BatchId} 
            onChange={formik.handleChange}/>
              <p>{formik.errors.BatchId}</p>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="UserName">UserName</label>
            <input type="text" name="UserName" 
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
          {/* <div className={styles.inputContainer}>
            <label htmlFor="IdentityFarmer">IdentityFarmer</label>
            <input type="text" name="IdentityFarmer" 
            value={formik.values.IdentityFarmer} 
            onChange={formik.handleChange}/>
              <p>{formik.errors.IdentityFarmer}</p>
          </div> */}
          <div className={styles.inputContainer}>
            <label htmlFor="Address">Address</label>
            <input type="text" name="Address" 
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

export default AddRough