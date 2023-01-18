import React, { useState } from 'react'
import styles from './AddFarmer.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useSelector } from 'react-redux';
import {getContractFarmer as getFarmerContract} from "~/contracts/farmerContract"
import axios from 'axios';
import { useEffect } from 'react';

const AddFarmer = () => {
    let provinceId
    let districtId

    let addressAccount = useSelector((state)=>state.address)

    const [listProvinces, setListProvinces] = useState([])
    const [listDistricts, setListDistricts] = useState([])
    const [listWards, setListWards] = useState([])

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

      useEffect(()=>{
  
        axios.get('https://vapi.vnappmob.com/api/province/')
        .then(res=>{
          console.log(res)
          setListProvinces(res.data.results)
        })
        .catch(err=>console.log(err))

    },[])

    const formik = useFormik({
        initialValues:{
            farmerCccd: "",
            farmerName: "",
            farmerEmail: "",
            farmerAddress: "",
            Province: "",
            District: "",
            Ward: "",
        },
        validationSchema: Yup.object({
            farmerCccd: Yup.number()
              .min(10, "Must be 9 characters")
              .required('Required!'),
            farmerName: Yup.string()
              .required('Required!'),
            farmerEmail: Yup.string()
              .email("Invalid email format")
              .required("Required!"),
            farmerAddress: Yup.string()
              .required('Required!'),
            Province: Yup.string()
              .required('Required!'),
            District: Yup.string()
              .required('Required!'),
            Ward: Yup.string()
              .required('Required!'),
        }),
        onSubmit: async (values)=>{
            console.log(values)
            let addressFarmer = values.farmerAddress + ', ' + values.Ward + ', ' + values.District + ', ' +values.Province
            getFarmerContract().then((contract)=>{
                contract.methods.addFarmer(parseInt(values.farmerCccd), values.farmerName, values.farmerEmail, addressFarmer )
                .send({
                        from: addressAccount.address
                    }).then((res)=>{
                        console.log(res)

                        res.status&&alert("Add farmer success!")
                    }).catch((err)=>{console.log(err);})

                }).catch((err)=>{console.log(err);})
        }
    })
  return (
    <div className={styles.wrapper}>
        <div className={styles.title}>
            <h2>Add Farmer</h2>
        </div>
        <div className={styles.form}>
            <div className={styles.inputContainer}>
                <label htmlFor="farmerName">Full Name</label>
                <input type="text" name="farmerName" 
                placeholder='Full Name'
                value={formik.values.farmerName} 
                onChange={formik.handleChange}/>
                <p>{formik.errors.farmerName}</p>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="farmerCccd">Identity Number</label>
                <input type="text" name="farmerCccd" 
                placeholder='Identication'
                value={formik.values.farmerCccd} 
                onChange={formik.handleChange}/>
                <p>{formik.errors.farmerCccd}</p>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="farmerEmail">Email</label>
                <input type="text" name="farmerEmail" 
                placeholder='Email'
                value={formik.values.farmerEmail} 
                onChange={formik.handleChange}/>
                <p>{formik.errors.farmerEmail}</p>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="farmerAddress">Address</label>
                <input type="text" name="farmerAddress" 
                placeholder='Address'
                value={formik.values.farmerAddress} 
                onChange={formik.handleChange}/>
                <p>{formik.errors.farmerAddress}</p>
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

export default AddFarmer