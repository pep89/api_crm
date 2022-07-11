import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Spiner from '../components/Spiner';
import Formulario from '../components/Formulario';

const EditarCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    //const params = useParams();
    const { id } = useParams();


    useEffect(() => {

        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                
                const respuesta = await fetch(url);

                const resultado = await respuesta.json()

                //console.log(resultado)
                setCliente(resultado)
            } catch (error) {
                console.log(error);
            }
        }

        setTimeout( () => {
            setCargando(false) //Modificamos el state cargando por el valor contrario al que se encuentra (de true a false y de false a true)
        },1000)
        
        obtenerClienteAPI();
    }, [])


    return (

        cliente?.nombre ? (

            <>
                <h1 className='font-black text-4xl text-blue-900'>
                    Editar Cliente
                </h1>
                <p className='mt-3'>
                    Utiliza este fromulario para editar el cliente
                </p>

                <Formulario 
                    cliente={cliente}
                    cargando={cargando}
                />
            </>
        ): (
            <h1 className='font-black text-4xl text-blue-900'>
                El cliente no existe
            </h1>
        )

    )
}

export default EditarCliente
