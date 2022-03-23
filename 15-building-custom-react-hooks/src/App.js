import React, {useState, useEffect} from 'react';
import BackwardCounter from './components/BackwardCounter';
import ForwardCounter from './components/ForwardCounter';
import NewTask from "./components/NewTask/NewTask";
import Tasks from "./components/Tasks/Tasks";
import useHttp from "./hooks/use-http";

function App() {
    const [tasks, setTasks] = useState([]);

    const {isLoading, error, sendRequest: fetchTasks} = useHttp();
    // const {isLoading, error, sendRequest:fetchTasks} = httpData;

    useEffect(() => {
        const transformTask = taskObj => {
            const loadedTasks = [];
            for (const taskKey in taskObj) {
                loadedTasks.push({id: taskKey, text: taskObj[taskKey].text});
            }
            setTasks(loadedTasks);
        };
        fetchTasks({
            url: 'https://react-http-f7666-default-rtdb.firebaseio.com/tasks.json'
        }, transformTask);
    }, []);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <ForwardCounter/>
            <BackwardCounter/>
            <NewTask onAddTask={taskAddHandler}/>
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;
