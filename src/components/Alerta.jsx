import React from 'react'


const Alerta = ({errors, touched}) => {

    if(errors && touched) {
        return(
            <div className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'>
                {errors}
            </div>
        )
    }
}

//const Alerta = ({children}) => {
  /* return (
    <div className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase'>
        {children}
    </div>
  ) 
}*/

export default Alerta