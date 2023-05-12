import axios from 'axios';

export const getTasks = async (dummyData = false) => {
	if (dummyData) {
		console.log("here")
		return [{
			title: 'testTitle',
			description: 'testDescription',
			dueDate: new Date('2022-03-05'),
			id: "haskjdfhjksasdf",
			status: "pending",
		},
		{
			title: 'testTitle2',
			description: 'testDescription2',
			dueDate: new Date(),
			id: "haskjdfhjks",
			status: "done",
		},
		{
			title: 'testTitle3',
			description: 'testDescription3',
			dueDate: new Date('2023-05-29'),
			id: "haskjdfhjksqwe",
			status: "overdue",
		}
		];
	}

	const result = await axios.get('http://localhost:4000/api/todos').then(response => {
		return response.data;
	}).catch(err => {
		console.log(err)
	})
	return result;
}

export const addTask = async (task) => {
	await axios.post('http://localhost:4000/api/todos', task).then(
		response => {
			return response.data;
		}
	)
}

export const updateTask = async (task, id) => {
	await axios.put(`http://localhost:4000/api/todos/${id}`, task).then(
		response => {
			console.log(`http://localhost:4000/api/todos/${id}`)
			console.log(task)
			return response.data;
		}
	);
}

export const deleteTask = async (id) => {
	await axios.delete(`http://localhost:4000/api/todos/${id}`).then(
		respose => {
			return respose.data;
		}
	)
}