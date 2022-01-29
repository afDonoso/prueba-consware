import {React, useEffect, useState} from "react"
import { Button, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, InputLabel, TextField } from "@mui/material";
import { createTask, deleteTask, updateTask } from "../../shared/helper/tasks-funcs";

function UpdateTask({ task, handleCloseModal}) {
    const [errors, setErrors] = useState({})
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [done, setDone] = useState(false)

    const handleSubmit = () => {
        if (title.length === 0) {
            setErrors({title: "El título no puede estar vacío"})
        } else {
            updateTask({id: task.id, title, description, done})
            handleCloseModal()
        }
    }

    const handleDelete = () => {
        deleteTask(task.id)
        handleCloseModal()
    }

    useEffect(() => {
        if(task) {
            setTitle(task.title)
            setDescription(task.description)
            setDone(task.done)
        }
    }, [task])

    return (
        <Dialog open={!!task} sx={{padding: "32px"}}>
            <DialogTitle>{"Actualizar Tarea"}</DialogTitle>
            <DialogContent>
                <FormGroup sx={{marginBottom: "16px"}}>
                    <FormControl sx={{marginBottom: "16px"}}>
                        <InputLabel htmlFor="title-input">Título</InputLabel>
                        <Input id="title-input" 
                            value={title}
                            aria-describedby="title-input-helper" 
                            onChange={({target: {value}}) => {
                                setTitle(value)
                            }}
                        />
                        {typeof errors["title"] !== "undefined" 
                            && <FormHelperText id="title-input-helper" style={{color: "red"}}>
                                    {errors["title"]}
                                </FormHelperText>
                        }
                    </FormControl>
                    <FormControl sx={{marginBottom: "16px"}}>
                        <TextField 
                            id="description-input" 
                            label="Descripción"
                            multiline maxRows={4} 
                            value={description}
                            onChange={({target: {value}}) => {
                                setDescription(value)
                            }}
                        />
                        {typeof errors["description"] !== "undefined" 
                            && <FormHelperText id="description-input-helper" style={{color: "red"}}>
                                    {errors["description"]}
                                </FormHelperText>
                        }
                    </FormControl>
                    <FormControl sx={{marginBottom: "16px"}}>
                        <FormControlLabel control={<Checkbox checked={done} onClick={() => setDone(!done)} />} 
                            label="Completado" 
                            id="done-input" 
                        />
                    </FormControl>
                </FormGroup>
                <Button variant="outlined" color="error" onClick={handleDelete}>Eliminar</Button>
                <Button variant="contained" color="inherit" onClick={handleCloseModal}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit}>{"Actualizar"}</Button>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateTask