import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthMiddleware = (props) => {
    const auth = useSelector((state) => state.auth)
  return (
    <>
    {(() => {
        let isNavigated = <Navigate to="/login" />
        let isStayed = <Outlet></Outlet>

        if (props.requestAuth) {
            if (auth.isAuthenticated) return isStayed
            else return isNavigated
        } else return isStayed
      })()}
    </>
  )
}

export default AuthMiddleware