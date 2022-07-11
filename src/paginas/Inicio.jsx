import { useEffect, useState } from 'react'
import Cliente from '../components/Cliente';

const Inicio = () => {
    const [clientes, setClientes] = useState([]);

    useEffect( () => {
        
        const obtenerClientesAPI = async () => {
            try {
                const URL = 'http://localhost:4000/clientes'
                
                const respuesta = await fetch(URL) //Metodo por Default es GET
                const resultado = await respuesta.json()

                setClientes(resultado);

            } catch (error) {
                console.log(error);
            }
        }

        obtenerClientesAPI();
    }, [])

    const handleEliminar = async id => {
        const confirmar = confirm(`Deseas eliminar el cliente con id ${id}?`)
        
        if(confirmar){
            try {
                //Eliminamos cliente de la base de datos json
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url, {
                    method: 'DELETE'
                })
                await respuesta.json()

                //Actualizamos el estado para que elimine de la lista dicho cliente
                
                /* location.reload() //Podemos recargar la página para que vuelva a obtener el nuevo listado de clientes, pero no sería una buena conducta de REACT*/

                //Filtramos el estado cliente por clientes con id diferente al id pasado y actualizamos el estado con este filtro.
                const arrayClientes = clientes.filter(cliente => cliente.id !== id)
                setClientes(arrayClientes);

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Clientes
            </h1>
            <p className='mt-3'> Administra tus clientes</p>
            
            <table className='w-full mt-5 table-auto shadow bg-white'>
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Empresa</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {clientes.map( cliente => (
                        <Cliente
                            key={cliente.id}
                            cliente={cliente}
                            handleEliminar={handleEliminar}
                        />
                    ))}
                </tbody>

            </table>

        </>
    )
}

export default Inicio
