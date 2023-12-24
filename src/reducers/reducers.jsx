const initialStates = {
    place: "",
    weather: false,
    info: "",
    search: false
}

export default function stateReducer(state = initialStates, action) {
    switch(action.type){
        case "INPUT_PLACE":
            return {...state, place: action.payload}
        case "SUBMIT":
            return {...state, weather: true, search: !state.search}
        case "RESET":
            return {...state, weather: false, place: "", info: ""}
        case "SET_INFO_FROM_API":
            return {...state, info: action.payload}
        default:
            return state
    }
}

