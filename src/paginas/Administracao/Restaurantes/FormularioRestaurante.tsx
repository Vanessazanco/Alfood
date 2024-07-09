import { Button, TextField } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        axios.post('http://0.0.0.0:8000/api/v2/restaurantes/',{
            nome:nomeRestaurante
        })
            .then(()=>{
             alert('Restaurante cadastrado com sucesso!')   
            })
    }
    return (
        <form onSubmit={aoSubmeterForm} >
            <TextField value={nomeRestaurante}
                onChange={evento => setNomeRestaurante(evento.target.value)}
                id="outlined-basic" label="Nome do Restaurante" variant="outlined" />
            <Button type="submit" variant="contained" color="success">Salvar</Button>
        </form>
    )
}
export default FormularioRestaurante