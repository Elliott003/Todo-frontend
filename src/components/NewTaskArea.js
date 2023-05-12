import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { addTask } from '../utils/api/todo';

export default function NewTaskArea() {
	const [inputValue, setInputValue] = React.useState("");

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			console.log(inputValue)
			addTask({ title: inputValue, type: 'default' });
		}
	}

	const handleTaskNameChange = (event) => {
		setInputValue(event.target.value);
	}
	return (
		<Paper
			component="form"
			sx={{
				p: '2px 4px',
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				maxWidth: '353px',
				margin: '5px',
				opacity: '0.9'
			}}
			onKeyDown={handleKeyDown}
		>

			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Task Name"
				inputProps={{ 'aria-label': 'Task Name' }}
				onChange={handleTaskNameChange}
			/>
			{/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"> */}
			{/* <CalendarMonthIcon onClick={openDatePicker} label='open date picker' /> */}
			{/* </IconButton> */}
		</Paper>
	);
}