import { logout, setToken, setUser } from '../features/auth/authSlice'

export const handleResponse = (result, dispatch, navigate, route) => {
  if (result.status === 'fulfilled') {
    const { token, ...userWithoutToken } = result.data

    console.log('Request successful')
    dispatch(setUser({ ...userWithoutToken.user }))
    dispatch(setToken(token))
    navigate(route)
  } else if (result.status === 'rejected') {
    console.log('Request failed')
    dispatch(logout())
    navigate('/')
  } else if (result.status === 'pending') {
    console.log('Pending...')
  }
}

export const handleFetchedData = (result, dispatch, setState) => {
  if (result.status === 'fulfilled') {
    dispatch(setState(result.data))
    console.log('Request successful')
  } else if (result.status === 'rejected') {
    console.log(result.error)
    console.log('Request failed')
    // handle
  } else if (result.status === 'pending') {
    console.log('Pending...')
  }
}

export const handleAddData = (result, dispatch, addState) => {
  console.log('1')
  if (result.status === 'fulfilled') {
    
    console.log(result.data)
    dispatch(addState(result.data))
    console.log('Request successful')
  } else if (result.status === 'rejected') {
    console.log('Request failed')
    // handle
  } else if (result.status === 'pending') {
    console.log('Pending...')
  }
}

export const handleEditData = (result, dispatch, editState) => {
  if (result.status === 'fulfilled') {
    dispatch(editState(result.data))
    console.log('Request successful')
  } else if (result.status === 'rejected') {
    console.log('Request failed')
    // handle
  } else if (result.status === 'pending') {
    console.log('Pending...')
  }
}
