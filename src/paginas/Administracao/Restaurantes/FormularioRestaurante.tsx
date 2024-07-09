import { Button, TextField } from "@mui/material"

const FormularioRestaurante = () => {
    return (
        <form >
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <Button variant="contained" color="success">Cadastrar</Button>
        </form>
    )
}
export default FormularioRestaurante