import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../Http"
import IPrato from "../../../interfaces/IPrato"
import ITag from "../../../interfaces/ITag"


const FormularioPrato = () => {

  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tags, setTags] = useState<ITag[]>([])
  const [tag,setTag]=useState('')

  const parametros = useParams()
  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`)
        .then(resposta => setNomePrato(resposta.data.nome))
    }
  }, [parametros])


  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => setTags(resposta.data.tags))
  }, [])



  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`pratos/${parametros.id}/`, {
        nome: nomePrato
      })
        .then(() => {
          alert('Prato atualizado com sucesso!')
        })
    } else {
      http.post('pratos/', {
        nome: nomePrato
      })
        .then(() => {
          alert('Prato cadastrado com sucesso!')
        })
    }

  }
  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
      <Typography component="h1" variant="h6">Formulário de Prato</Typography>
      <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm} >
        <TextField
          value={nomePrato}
          onChange={evento => setNomePrato(evento.target.value)}
          id="outlined-basic"
          label="Nome do Prato"
          variant="outlined"
          fullWidth
          required
          margin="dense"
        />
        <TextField
          value={descricao}
          onChange={evento => setDescricao(evento.target.value)}
          id="outlined-basic"
          label="Descrição do Prato"
          variant="outlined"
          fullWidth
          required
          margin="dense"
        />
        <FormControl margin="dense" fullWidth >
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select labelId="select-tag " value={tag} onChange={evento =>setTag(evento.target.value)}>
            {tags.map(tag => <MenuItem key={tag.id} value={tag.id}>
              {tag.value}
            </MenuItem>)}
          </Select>
        </FormControl>
        <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="contained" color="success">Salvar</Button>
      </Box>
    </Box>
  )
}
export default FormularioPrato