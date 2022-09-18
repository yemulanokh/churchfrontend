/* eslint-disable react/prop-types */
import React, { useReducer, createContext, useState } from 'react'

import UserReducer from './UserReducer'
const INITIAL_STATE = {
  currentUser: null,
}
export const UserContext = createContext(INITIAL_STATE)

export const UserContextProvider = ({ children }) => {
  // const [state, setState] = useReducer(UserReducer, INITIAL_STATE)
  const [state, setState] = useState('')

  const dispatch = (value) => {
    setState(value.payload)
  }

  return <UserContext.Provider value={{ user: state, dispatch }}>{children}</UserContext.Provider>
}
