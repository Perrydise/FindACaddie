// reducers/userReducer.js
const initialState = {
    users: [],
    currentUser: null,
    isLoading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USERS_REQUEST':
        return {
          ...state,
          isLoading: true,
        };
      case 'FETCH_USERS_SUCCESS':
        return {
          ...state,
          isLoading: false,
          users: action.payload,
        };
      case 'FETCH_USERS_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case 'SET_CURRENT_USER':
        return {
          ...state,
          currentUser: action.payload,
        };
      // Other user-related actions and state updates...
      default:
        return state;
    }
  };
  
  export default userReducer;
  