/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { contextType } from 'simplebar-react'
import { UserContext } from 'src/context/UserContext'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { UserContextProvider } from 'src/context/UserContext'

const DefaultLayout = () => {
  // const { user } = useContext(UserContext)
  // console.log(user)
  return (
    // <UserContextProvider>
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
    // </UserContextProvider>
  )
}

export default DefaultLayout
