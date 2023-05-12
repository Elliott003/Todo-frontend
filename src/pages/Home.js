import React from 'react';
import TodoList from '../components/TodoList';
import { getTasks } from '../utils/api/todo';
import NewTaskArea from '../components/NewTaskArea';

function Home() {
	const [lists, setLists] = React.useState([]);

	React.useEffect(() => {
		getTasks().then(res => setLists(res))
	}, []);

	return (
		<div style={{
			display: "flex",
			alignItems: "center",
			flexDirection: 'column',
			justifyContent: "center",
			height: "100%",
			width: "100%",
			position: "absolute",
			backgroundSize: "cover",
			backgroundImage: `url("https://images.unsplash.com/photo-1596017497096-90ee17fb4e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80")`
		}}>
			<TodoList lists={lists} setLists={setLists} />
			<NewTaskArea />
		</div >
	)
}

export default Home;