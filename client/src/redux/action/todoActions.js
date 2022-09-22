export const createTodo = (data) => { // api call to create data within db form data
    return({
        type: "CREATE_TODO",
        payload: data
    })
}
export const getAllTodo = (data) => { // api call to db and get all todos and pass here as a data
    return({
        type: "GETALL_TODO",
        payload: data
    })
}
export const updateTodo = (data) => { // api call to the db first then data is passed to the reducer
    return({
        type: "UPDATE_TODO",
        payload: data
    })
}
export const deleteTodo = (data) => { // Api call to the db to delete id of the deleted todo 
    return({
        type: "DELETE_TODO",
        payload: data
    })
}