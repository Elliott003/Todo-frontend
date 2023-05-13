import React, { useState } from "react";
import {
	Container,
	Box,
	Typography,
	TextField,
	Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		const response = await axios.post(`http://${process.env.REACT_APP_BACKEND_IP}:4000/api/user`, { username, password });
		console.log(response);
		if (response.status === 200) {
			// 登录成功，处理响应数据（例如，保存令牌、设置状态等）
			console.log('登录成功：');
			navigate('/home');
		} else {
			// 登录失败，处理错误（例如，显示错误消息)
			console.log('登录失败:');
		}
	};

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Username"
						autoFocus
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
