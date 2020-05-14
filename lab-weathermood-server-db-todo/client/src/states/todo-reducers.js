/* Todo Form */

const initTodoFormState = {
    inputValue: '',
    inputDanger: false,
    moodToggle: false,
    mood: 'na'
};
export function todoForm(state = initTodoFormState, action) {
    switch (action.type) {
        case '@TODO_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@TODO_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        case '@TODO_FORM/TOGGLE_MOOD':
            return {
                ...state,
                moodToggle: !state.moodToggle
            };
        case '@TODO_FORM/SET_MOOD_TOGGLE':
            return {
                ...state,
                moodToggle: action.toggle
            };
        case '@TODO_FORM/SELECT_MOOD':
            return {
                ...state,
                mood: action.mood
            };
        default:
            return state;
    }
}

/* Todos */

const initTodoState = {
    todoLoading: false,
    todos: [],
    unaccomplishedOnly: false,
    hasMore : true
};
export function todo(state = initTodoState, action) {
    switch (action.type) {
        case '@TODO/START_LOADING':
            return {
                ...state,
                todoLoading: true
            };
        case '@TODO/END_LOADING':
            return {
                ...state,
                todoLoading: false
            };
        case '@TODO/END_LIST_TODOS':
            return {
                ...state,
                todos: action.todos
            };
        case '@TODO/TOGGLE_UNACCOMPLISHED_ONLY':
            return {
                ...state,
                unaccomplishedOnly: !state.unaccomplishedOnly,
                hasMore:true,
            };
        case '@TODO/END_LIST_MORE_TODOS':
            return {
                ...state,
                todos: [...state.todos, ...action.todos],
                hasMore: action.todos.length > 0
            };
        case '@TODO/END_CREATE_TODO':
            var newTodos = state.todos.slice();
            newTodos.unshift(action.todo);
            return {
                ...state,
                todos: newTodos
            };
        case '@TODO/END_ACCOMPLISH_TODO':
            var newTodos = state.todos.map(t => {
                if (t.id === action.todo.id){
                    return action.todo;
                }
                return t;
            });
            if (state.unaccomplishedOnly){
                newTodos = newTodos.filter(t =>{
                    if (t.id === action.todo.id)
                        return false
                    else 
                        return true
                })
            }
            return {
                ...state,
                todos: newTodos,
            };
        default:
            return state;
    }
}
