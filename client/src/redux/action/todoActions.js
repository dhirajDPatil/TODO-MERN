import * as api from '../../api'

export const getAllT = () => async (dispatch) => { // api call to create data within db form data
    try {
        const { data } = await api.fetchTodo();
        dispatch({type: "GETALL_TODO", payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const createT = (newTodo) => async (dispatch) => {
    try {
        const { data } = await api.createTodo(newTodo);
        dispatch({ type: "CREATE_TODO" , payload: data});
    } catch (error) {
        console.log("Error occured in post ",error.message)
    }
}

export const markT = (id) => async (dispatch) => { // api call to the db first then data is passed to the reducer
    try {
        const { data } = await api.markTodo(id);
        dispatch({ type : "MARK_TODO", payload: data})
    } catch (error) {
        console.log("Error while marking todo", error.message);
    }
}

export const updateT = (id, newTodo) => async (dispatch) => { // api call to the db first then data is passed to the reducer
    try {
        const { data } = await api.updateTodo(id, newTodo);
        dispatch({ type : "UPDATE_TODO", payload: data})
    } catch (error) {
        console.log("Error while updating todo", error.message);
    }
}

export const deleteT = (id) => async (dispatch) => { // api call to the db first then data is passed to the reducer
    try {
        const { data } = await api.deleteTodo(id);
        dispatch({ type : "DELETE_TODO", payload: data})
    } catch (error) {
        console.log("Error while deleting todo", error.message);
    }
}


// export const createTodo = (data) => { // api call to create data within db form data
//     return({
//         type: "CREATE_TODO",
//         payload: data
//     })
// }

// export const getAllTodo = (data) => { // api call to db and get all todos and pass here as a data
//     return({
//         type: "GETALL_TODO",
//         payload: data
//     })
// }
// export const updateTodo = (data) => { // api call to the db first then data is passed to the reducer
//     return({
//         type: "UPDATE_TODO",
//         payload: data
//     })
// }
// export const deleteTodo = (data) => { // Api call to the db to delete id of the deleted todo 
//     return({
//         type: "DELETE_TODO",
//         payload: data
//     })
// }