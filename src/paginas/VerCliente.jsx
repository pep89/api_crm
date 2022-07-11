import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Spiner from '../components/Spiner';

const VerCliente = () => {

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
        <div>
            {cargando ? <Spiner /> : 
            (
                Object.keys(cliente).length === 0 ? (
                    <h1 className='font-black text-4xl text-blue-900'>
                        No existe ningún cliente con el id: {id}
                    </h1>
                ) : (

                    <>
                        <h1 className='font-black text-4xl text-blue-900'>
                            Ver Cliente: {cliente.nombre}
                        </h1>
                        <p className='mt-3'>Información del cliente</p>

                        <p className='text-2xl text-gray-600 mt-10'>
                            <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
                            {cliente.nombre}
                        </p>

                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='text-gray-800 uppercase font-bold'>Empresa: </span>
                            {cliente.empresa}
                        </p>

                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='text-gray-800 uppercase font-bold'>Email: </span>
                            {cliente.email}
                        </p>

                        {cliente.telefono && (
                            <p className='text-2xl text-gray-600 mt-4'>
                                <span className='text-gray-800 uppercase font-bold'>Telefono: </span>
                                {cliente.telefono}
                            </p>
                        )}

                        {cliente.notas && (
                            <p className='text-2xl text-gray-600 mt-4'>
                                <span className='text-gray-800 uppercase font-bold'>Notas: </span>
                                {cliente.notas}
                            </p>
                        )}
                    
                    </>
                )
            )}
            

        </div>
    )
}

export default VerCliente
