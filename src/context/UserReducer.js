const UserReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      }
    default:
      return state
  }
}

export default UserReducer
