import { useEffect, useState } from "react"
import IRestaurante from "../../interfaces/IRestaurante"
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material"
import axios from "axios"
const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    useEffect (()=>{
        axios.get<IRestaurante[]>('http://0.0.0.0:8000/api/v2/restaurantes/')
        .then(resposta =>setRestaurantes(resposta.data))
    },[])
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes