import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import {Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material"
import axios from "axios"
import { Link } from "react-router-dom"
const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    useEffect(() => {
        axios.get<IRestaurante[]>('http://0.0.0.0:8000/api/v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const excluir= (restauranteAhSerExcluido : IRestaurante) => {
        axios.delete(`http://0.0.0.0:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`)
        .then(() => {
            const listaRestaurante = restaurantes.filter(restaurante => 
                restaurante.id !== restauranteAhSerExcluido.id)
                setRestaurantes([...listaRestaurante])
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
                            Editar
                        </TableCell>
                        <TableCell>
                            Ecluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                        <TableCell>
                            {restaurante.nome}
                        </TableCell>
                        <TableCell>
                            [<Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={()=>excluir(restaurante)}>
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

export default AdministracaoRestaurantes