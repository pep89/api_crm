import React from 'react'
import {Formik, Form, Field, /* ErrorMessage */} from 'formik' //Libreria de manejo de formularios
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup' //Librería de validacion de formularios
import Alerta from './Alerta'
import Spiner from './Spiner'

/* Estaremos utilizando este componente tanto para crear un nuevo cliente como para editar uno ya existente. 
1.Al crear un nuevo cliente, los valores iniciales del formulario estaran vacios, mientras que al editarlo, contendran la información del cliente.
2.En Nuevo cliente no pasamos ningun prop de cliente pero en editar cliente si. Esto nos creará un conflicto.
    1.Podriamos crear un objeto vacio en NuevoCliente y pasarlo como prop (no recomendado)
    2.Podemos crear unos defaultProps en este componente. (Mejor opción)
3.Al crear un nuevo cliente uitilizamos el método POST mientras que al editar uno existente utilizaremos el método PUT
4.Algunos textos cambiarán su contenido según si creamos o editamos
Podriamos crear dos componentes diferentes para controlar la creación y la edición, pero vamos a ver como reuitilizar el componente utilizando algunas funcionalidades de FORMIK
*/
const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    //Schema: Objeto con todos los campos (Yup.object) y la forma de estos (shape)
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                .required('La empresa es obligatoria'),
        email: Yup.string()
                .email('Email no valido')
                .required('El email es obligatorio'),
        telefono: Yup.number()
                    .positive('Numero no valido')
                    .integer('Número no valido')
                    .typeError('El número no es valido')
    })


    const handleSubmit = async (valores) => {
        let url
        let metodo
        try{

            if(cliente.id){
                //Editar Registro
                 url = `http://localhost:4000/clientes/${cliente.id}`
                 metodo = 'PUT'
            }else {
                //Nuevo Registro
                 url ='http://localhost:4000/clientes'
                 metodo = 'POST'
            }

            const respuesta = await fetch(url, {
                method: metodo,
                body: JSON.stringify(valores),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })

            //console.log(respuesta);
            const resultado = await respuesta.json()
            //console.log(resultado);
            navigate('/clientes')

        } catch (error){
            console.log(error);
        }
    }


  return (

    cargando ? <Spiner /> : (

        /* background white, margin top 10, paddin horizontal 5, padding vertical 10, bordes redondeados, sombreado, media query: resolucion mediana ocupa 3/4 del ancho y centrado */
        <div className='bg-white mt-10 px-15 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>

            <h1 className='text-grey-600 font-bold text-xl uppercase text-center'>
                {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
            </h1>

            <Formik
                initialValues={{
                    /* Indicamos que la propiedad nombre del objeto pasado cliente es opcional (depende de si estamos en nuevo cliente o en editar cliente). Si contiene valor, le pasamos dicho valor, de lo contrario pasamos un string vacio */
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? ""
                }}

                //Propiedad de formik que por default es false y que poniendola a true nos permitirá agregar valores al initialValues volviendolo a ejecutar el componente
                enableReinitialize={true} 

                onSubmit={ async (values, {resetForm})=> {
                    await handleSubmit(values)
                    resetForm()
                }}

                validationSchema={nuevoClienteSchema}            
            >
                {/* Hacemos destructuring del objeto predefinido "data" que guarda toda la información de Formik y la información enlazada con la validacion de Yup.
                    "errors" --> Indice donde guarda los errores del campo
                    "touched" --> Indice donde guarda si se ha accedido a dicho campo o no (true or false). (Excelente para validación en tiempo real)
                */}
                {( {errors, touched} ) => {

                    return (
                    <Form
                        className='mt-10'
                    >
                        {/* ----------CAMPO NOMBRE------------- */}
                        <div
                            className='mb-4'
                        >
                            <label
                                className='text-gray-800'
                                htmlFor="nombre"
                            >Nombre:</label>
                            <Field 
                                id="nombre"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Nombre del cliente"
                                name="nombre"
                            />

                            {/* El componente ErrorMessage es una forma fácil de imprimir los mensajes de error de cada campo. El problema es que no se le puede dar estilos
                            <ErrorMessage name="nombre" /> */}
                            
                            {/* <Alerta>{errors.nombre}</Alerta> */}
                            <Alerta
                                errors= {errors.nombre}
                                touched= {touched.nombre}
                            />

                        </div>

                        {/* ----------CAMPO EMPRESA------------- */}
                        <div
                            className='mb-4'
                        >
                            <label
                                className='text-gray-800'
                                htmlFor="empresa"
                            >Empresa:</label>
                            <Field 
                                id="empresa"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Empresa del cliente"
                                name="empresa"
                            />

                            <Alerta
                                errors= {errors.empresa}
                                touched= {touched.empresa}
                            />

                        </div>

                        {/* ----------CAMPO EMAIL------------- */}
                        <div
                            className='mb-4'
                        >
                            <label
                                className='text-gray-800'
                                htmlFor="email"
                            >Email:</label>

                            <Field 
                                id="email"
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Email del cliente"
                                name="email"
                            />

                            <Alerta
                                errors= {errors.email}
                                touched= {touched.email}
                            />

                        </div>

                        {/* ----------CAMPO TELÉFONO------------- */}
                        <div
                            className='mb-4'
                        >
                            <label
                                className='text-gray-800'
                                htmlFor="telefono"
                            >Telefono:</label>

                            <Field 
                                id="tel"
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Telefono del cliente"
                                name="telefono"
                            />

                            <Alerta
                                errors= {errors.telefono}
                                touched= {touched.telefono}
                            />

                        </div>

                        {/* ----------CAMPO NOTAS------------- */}
                        <div
                            className='mb-4'
                        >
                            <label
                                className='text-gray-800'
                                htmlFor="notas"
                            >Notas:</label>
                            <Field 
                                as="textarea"
                                id="notas"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                placeholder="Notas del cliente"
                                name="notas"
                            />
                        </div>

                        <input 
                            type="submit"
                            value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg' 
                        />
                        
                    </Form>
                )}}
            </Formik>
        </div>
    )
  )
}


/* Creamos defaultProps del componente Formulario
    Si el prop cliente está presente, tomará los valores de dicho prop, de lo contrario tomará los valores del defaultProp
    Si el prop cargando esta presente, tomará el valor de dicho prop, de lo contrario tomará el valor del defaultProp (false)
*/
Formulario.defaultProps = {
    cliente:{},
    cargando: false
}

export default Formulario