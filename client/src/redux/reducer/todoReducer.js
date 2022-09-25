const ToDoReducer = (todos=[], action) => {
    switch (action.type) {
        case "CREATE_TODO":
            return [...todos, action.payload];
        case "GETALL_TODO":
            return action.payload;
        case "UPDATE_TODO":
            return todos.map((t)=> action.payload._id === t._id? action.payload : t)
        case "MARK_TODO":
            return todos.map((t)=> action.payload._id === t._id? action.payload : t)
        case "DELETE_TODO":
            return todos.filter((t)=> action.payload.id !== t._id)
        default:
           return todos;
    }
}

export default ToDoReducer;