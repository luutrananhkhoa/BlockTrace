import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './AddWarehouse.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
import axios from 'axios';
import Button from '~/components/Button';

const AddWarehouse = (props) => {

    let addressAccount = useSelector((state)=>state.address)
    const {setIsShow} = props
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
    const formik = useFormik({
        initialValues:{
            warehouseName: "",
            warehouseAddress: "",
            Province: "",
            District: "",
            Ward: "",
        },
        validationSchema: Yup.object({
            warehouseName: Yup.string('Require int').required('Required*'),
            warehouseAddress: Yup.string('Require int').required('Required*'),
            Province: Yup.string('Require int').required('Required*'),
            District: Yup.string('Require int').required('Required*'),
            Ward: Yup.string('Require int').required('Required*'),
        }),
        onSubmit: async (values)=>{
            console.log(values)
            let fullAddress =values.warehouseAddress + ', ' + values.Ward +', ' + values.District +', '+ values.Province
            getProcessingContract().then((contract)=>{
                contract.methods.addWarehouse(values.warehouseName, fullAddress)
                .send({
                        from: addressAccount.address
                    }).then((res)=>{
                        console.log(res)

                        res.status &&setIsShow(false)
                    }).catch((err)=>{console.log(err);})

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
  return (
    <div className={styles.wrapper}>
        <div className={styles.title}>
            <h2>Add Warehouse</h2>
        </div>
        <div className={styles.form}>
        <div className={styles.inputContainer}>
                <label htmlFor="warehouseName">Warehouse Name</label>
                <input type="text" name="warehouseName" 
                placeholder='Name'
                value={formik.values.warehouseName} 
                onChange={formik.handleChange}/>
                <p>{formik.errors.warehouseName}</p>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="warehouseAddress">Warehouse Address</label>
                <input type="text" name="warehouseAddress" 
                placeholder='Address'
                value={formik.values.warehouseAddress} 
                onChange={formik.handleChange}/>
                <p>{formik.errors.warehouseAddress}</p>
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
          <Button 
             onClick={formik.handleSubmit}
            primary
          >OK</Button>
        </div>
    </div>
  )
}

export default AddWarehouse