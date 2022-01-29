import {Box, Button, FormControl, FormGroup, FormHelperText, Input, InputLabel} from "@mui/material"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AUTHED_USER_KEY, USERS_KEY } from "../../shared/constants/keys"
import { SIGNUP_ROUTE } from "../../shared/constants/routes"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = () => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY))
        const user = users !== null 
            ? users.find(user => user.username === username)
            : null

        if (user === null || typeof user === "undefined") {
            setErrors({username: "Este usuario no existe."})
        } else {
            if (password !== user.password) {
                setErrors({password: "La contraseña no corresponde al usuario ingresado."})
            } else {
                localStorage.setItem(AUTHED_USER_KEY, username)
                navigate("/")
            }
        }
    }

    const handleChangeUsername = ({target: {value}}) => {
        setUsername(value)
    }

    const handleChangePassword = ({target: {value}}) => {
        setPassword(value)
    }
    
    return (
        <div style={{height: "100vh"}}>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <h1>Iniciar Sesión</h1>
                <FormGroup sx={{marginBottom: "16px"}}>
                    <FormControl sx={{marginBottom: "16px"}}>
                        <InputLabel htmlFor="username-input">Nombre de usuario</InputLabel>
                        <Input id="username-input" 
                            aria-describedby="username-input-helper" 
                            onChange={handleChangeUsername}
                        />
                        {typeof errors["username"] !== "undefined" 
                            && <FormHelperText id="username-input-helper" style={{color: "red"}}>
                                    {errors["username"]}
                                </FormHelperText>
                        }
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="password-input">Contraseña</InputLabel>
                        <Input id="password-input" 
                            type="password" 
                            onChange={handleChangePassword}
                            aria-describedby="username-input-helper" 
                        />
                        {typeof errors["password"] !== "undefined" 
                            && <FormHelperText id="password-input-helper" style={{color: "red"}}>
                                    {errors["password"]}
                                </FormHelperText>
                        }
                    </FormControl> 
                </FormGroup>
                <Button variant="contained" onClick={handleSubmit}>Ingresar</Button>
                <Link to={`/${SIGNUP_ROUTE}`}>¿No estás registrado?</Link>
            </Box>
        </div>
    );
}

export default Login