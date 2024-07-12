import { useEffect, useState } from "react"
import { Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../Http"
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {

  const [pratos, setPratos] = useState<IPrato[]>([])
  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then(resposta => setPratos(resposta.data))
  }, [])

  const excluir = (pratosAhSerExcluido: IPrato) => {
    http.delete(`pratos/${pratosAhSerExcluido.id}/`)
      .then(() => {
        const listaPratos= pratos.filter(prato =>
          prato.id !== pratosAhSerExcluido.id)
          setPratos([...listaPratos])
      })
  }


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Descrição
            </TableCell>
            <TableCell>
              Tag
            </TableCell>
            <TableCell>
              Imagem
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Ecluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map(prato => <TableRow key={prato.id}>
            <TableCell>
              {prato.nome}
            </TableCell>
            <TableCell>
              {prato.descricao}
            </TableCell>
            <TableCell>
              {prato.tag}
            </TableCell>
            <TableCell>
              [<a href={prato.imagem} target="blank" rel="noreferrer"> Ver imagem</a>]
            </TableCell>
            <TableCell>
              [<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
                Ecluir
              </Button>
            </TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoPratos