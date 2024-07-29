import { TodoInterface } from "../interfaces/todo.interface";
import ItemTodo from "./item.todo";

interface ListTodoProps {
    todos: TodoInterface[];
}

const ListTodo = ({ todos }: ListTodoProps) => {
    if (!todos.length) return <div>No todos</div>;

    return (
        <>
            {todos.map((todo) => (
                <ItemTodo
                    key={todo.id}
                    todo={todo}
                />
            ))}
        </>
    );
};
export default ListTodo;
