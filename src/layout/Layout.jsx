/* Escribimos rafce + enter para que nos cree la estructura inicial del componente */
import { Outlet, Link, useLocation } from 'react-router-dom'


const Layout = () => {

    const location = useLocation();

    const urlActual = location.pathname;
    //console.log(location);
    return (
        <div>
            {/* Tailwid: para resolucion md aplicamos flex e indicamos que el tamaño mínimo sea la altura de la pantalla */}
            <div className='md:flex md:min-h-screen' >
                
                {/* Tailwid: EN resolucion md el ancho es de 1/4, background azul de 900, padding horizontal 5, pading vertical 10 */}
                <div className='md:w-1/4 bg-blue-900 px-5 py-10'>
                    <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>

                    <nav className='mt-10'>

                        {/* En react router dom podemos utilizar las etiquetas <a> para crear enlaces, pero no nos daran tan buen soporte como las etiquetas <Link> que nos proporciona la propia libreria. En LINK no se utiliza'href', se utiliza 'to. */}
                        <Link
                            className={` ${urlActual === '/clientes' ? 'text-blue-300' : 'text-white' } 
                                text-2xl block mt-2 hover:text-blue-300`
                            }
                                
                            to='/clientes'>Cliente
                         </Link>

                        <Link
                            className={` ${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white' } 
                            text-2xl block mt-2 hover:text-blue-300`
                            }
                            to='/clientes/nuevo'>Nuevo Cliente
                        </Link>
                    </nav>
                </div>

                {/* Tailwid: Resolucion media ancho de 3/4, resolución media alto de toda la pantalla, scroll sobre el propio div*/}
                <div className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
                    <Outlet />
                </div>
                
            </div>       
            
        </div>
    )
}

export default Layout
