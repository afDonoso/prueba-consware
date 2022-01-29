import { Box, Button, Checkbox, FormControl, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTHED_USER_KEY } from '../../shared/constants/keys';
import getAuthedUser from '../../shared/helper/get-authed-user';
import { logout } from '../../shared/helper/logout';
import CreateTask from './create-task';
import UpdateTask from './update-task';

export default function ListTasks() {
    const [tasks, setTasks] = useState([])
    const [createTask, setCreateTask] = useState(false)
    const [username, setUsername] = useState("")
    const [task, setTask] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        setUsername(localStorage.getItem(AUTHED_USER_KEY))
    }, [])

    const handleOpenCreateTask = () => {
        setCreateTask(true)
    }

    const handleCloseCreateTask = () => {
        setCreateTask(false)
        
        const user = getAuthedUser()
        setTasks(user.tasks)
    }

    const handleCloseUpdateTask = () => {
        setTask(null)

        const user = getAuthedUser()
        setTasks(user.tasks)
    }

    const handleLogout = () => {
        logout()
        navigate("login")
    }

    useEffect(() => {
        const user = getAuthedUser()

        if (user) {
            setTasks(user.tasks)
        }
    }, [])

    return (
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center"}}>
            <h1>{`Bienvenido, ${username}`}</h1>
            <Button variant="outlined" onClick={handleLogout} sx={{maxWidth: "200px"}}>Salir</Button>
            <h2>Tareas diarias</h2>
            <Button variant="outlined" sx={{maxWidth: "200px"}} onClick={handleOpenCreateTask}>Crear Tarea</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Completado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map(task => (
                            <TableRow hover onClick={() => setTask(task)} style={{cursor: "pointer"}} key={task.id}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.description}</TableCell>
                                <TableCell>
                                    <Checkbox checked={task.done} disabled/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateTask open={createTask} handleCloseModal={handleCloseCreateTask}/>
            <UpdateTask handleCloseModal={handleCloseUpdateTask} task={task} />
        </Box>
    );
}
