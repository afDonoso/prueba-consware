import {React, useEffect, useState} from "react"
import { Button, Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, InputLabel, TextField } from "@mui/material";
import { createTask } from "../../shared/helper/tasks-funcs";

function CreateTask({open, handleCloseModal}) {
    const [errors, setErrors] = useState({})
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [done, setDone] = useState(false)

    const handleSubmit = () => {
        if (title.length === 0) {
            setErrors({title: "El título no puede estar vacío"})
        } else {
            createTask({title, description, done})
            handleCloseModal()
        }
    }

    return (
        <Dialog open={open} sx={{padding: "32px"}}>
            <DialogTitle>{"Crear Tarea"}</DialogTitle>
            <DialogContent>
                <FormGroup sx={{marginBottom: "16px"}}>
                    <FormControl sx={{marginBottom: "16px"}}>
                        <InputLabel htmlFor="title-input">Título</InputLabel>
                        <Input id="title-input" 
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
                        <FormControlLabel control={<Checkbox value={done} onClick={() => setDone(!done)} />} 
                            label="Completado" 
                            id="done-input" 
                        />
                    </FormControl>
                </FormGroup>
                <Button variant="outlined" color="error" onClick={handleCloseModal}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit}>{"Crear"}</Button>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTask