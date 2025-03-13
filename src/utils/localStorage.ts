export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export const loadTodos = (): Todo[] => {
    try {
        const serializedTodos = localStorage.getItem('todos');
        if (serializedTodos === null) {
            return []; // No todos in local storage yet
        }
        return JSON.parse(serializedTodos) as Todo[]; // Type assertion here
    } catch (err) {
        console.error("Error loading todos from local storage:", err);
        return []; // Return empty array in case of error
    }
};

export const saveTodos = (todos: Todo[]): void => {
    try {
        const serializedTodos = JSON.stringify(todos);
        localStorage.setItem('todos', serializedTodos);
    } catch (err) {
        console.error("Error saving todos to local storage:", err);
    }
};