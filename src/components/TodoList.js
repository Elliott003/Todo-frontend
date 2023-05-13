import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { updateTask } from '../utils/api/todo';

export default function TodoList({ lists, setLists }) {
	// console.log(lists);
	const [sortedTodos, setSortedTodos] = React.useState([]);
	const [checked, setChecked] = React.useState([]);
	const [hoverId, setHoverId] = React.useState([]);

	const handleSort = (todos) => {
		const newlist = todos.sort((a, b) => {
			if (a.status === 'completed' && b.status !== 'completed') {
				return 1;
			} else if (a.status !== 'completed' && b.status === 'completed') {
				return -1;
			} else {
				return 0;
			}
		});
		setSortedTodos(newlist);
	};
	const handleCheck = (todos) => {
		setChecked(todos.filter((item) => item.status === 'completed').map(({ _id }) => (_id)))
	}
	// handleSort();
	// console.log(sortedTodos.filter((item) => item.status === 'completed').map(({ _id }) => (_id)));
	React.useEffect(() => { handleSort(lists); handleCheck(lists) }, [lists]);
	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
		changeItemStatus(sortedTodos, value);
	};
	const changeItemStatus = (todos, idx) => {
		const item = sortedTodos.find(i => i._id === idx);
		if (item) {
			const todoCopy = [...todos];
			const index = todoCopy.indexOf(item);
			todoCopy[index] = { ...item, status: item.status === 'pending' ? 'completed' : 'pending' };
			updateTask({ ...item, status: item.status === 'pending' ? 'completed' : 'pending' }, item._id);
			setSortedTodos(todoCopy);
			handleSort(todoCopy);
		}
	}
	const handleHoverOver = (value) => () => {
		setHoverId(value);
	}
	const handleHoverOut = (value) => () => {
		setHoverId();
	}

	return (
		<List sx={{ maxHeight: 300, borderRadius: '4px', width: '100%', maxWidth: 400, bgcolor: 'background.paper', opacity: 0.9, overflowY: "scroll" }}>
			{sortedTodos.map((item) => {
				const labelId = `${item._id}`;
				return (
					<ListItem
						key={item._id}
						secondaryAction={
							labelId === hoverId ? <IconButton edge="end" aria-label="comments">
								<EditIcon />
							</IconButton> : ""
						}
						disablePadding
						onMouseOver={handleHoverOver(item._id)}
						onMouseOut={handleHoverOut(item._id)}
					>
						<ListItemButton role={undefined} onClick={handleToggle(item._id)} dense>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={checked.indexOf(item._id) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText sx={checked.indexOf(item._id) !== -1 ? { textDecoration: 'line-through', color: 'grey' } : {}} id={labelId} primary={` ${item.title}`} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List >
	);
}