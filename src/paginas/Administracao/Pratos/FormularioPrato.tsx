import { Box, Button, TextField, Typography,} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../Http"
import IPrato from "../../../interfaces/IPrato"

const FormularioPrato = () => {

  const parametros = useParams()
  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => setNomePrato(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomePrato] = useState('')

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`pratos/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Prato atualizado com sucesso!')
        })
    } else {
      http.post('pratos/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Prato cadastrado com sucesso!')
        })
    }

  }
  return (

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
        <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
        <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm} >
          <TextField
            value={nomeRestaurante}
            onChange={evento => setNomePrato(evento.target.value)}
            id="outlined-basic"
            label="Nome do Restaurante"
            variant="outlined"
            fullWidth
            required
          />
          <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="contained" color="success">Salvar</Button>
        </Box>
      </Box>
  )
}
export default FormularioPrato