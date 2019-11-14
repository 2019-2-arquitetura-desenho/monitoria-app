const RegisterDisciplines = (state = {}, action) => {
  switch (action.type) {
    case 'GET_DISCIPLINES_REQUEST':
      return {
        ...state,
        fetchingData: action.fetchingData
      }
    case 'GET_DISCIPLINES_SUCCESS':
      return {
        ...state,
        fetchingData: action.fetchingData,
        disciplines: action.payload
      }
    case 'GET_DISCIPLINES_ERROR':
      return {
        ...state,
        fetchingData: action.fetchingData,
        requestError: action.requestError
      }
    case 'REGISTER_DISCIPLINE_REQUEST':
      return {
        ...state,
        registeringDiscipline: action.registeringDiscipline
      }
    case 'REGISTER_DISCIPLINE_SUCCESS':
      return {
        ...state,
        registeringDiscipline: action.registeringDiscipline,
        registeredDisciplines: [...state.registeredDisciplines, action.payload]
      }
    case 'REGISTER_DISCIPLINE_ERROR':
      return {
        ...state,
        registeringDiscipline: action.registeringDiscipline,
        requestError: action.requestError
      }
    default:
      return state
  }
}

export default RegisterDisciplines;