import UserFinder from "./components/UserFinder";
import UsersContext from "./store/users-context";

const DUMMY_USERS = [
    {id: 'u1', name: 'Max'},
    {id: 'u2', name: 'Manuel'},
    {id: 'u3', name: 'Julie'},
];

function App() {
    const userContext = {
        users: DUMMY_USERS
    }
    return (
        <UsersContext.Provider value={userContext}>
            <UserFinder/>
        </UsersContext.Provider>
    );
}

export default App;
