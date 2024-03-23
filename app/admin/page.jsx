"use client"
import React, { useEffect, useState } from 'react'


const AdminPage = () => {
    const [filtered , setFiltered] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const data = [
        // Array de Personas
        {
          id: 1,
          nombre: "Juan",
          apellido: "Pérez",
          email: "juan.perez@example.com",
          rol: "Postulante"
        },
        {
          id: 2,
          nombre: "Luisa",
          apellido: "Martínez",
          email: "luisa.martinez@example.com",
          rol: "Postulante"
        },
        // Array de Empresas
        {
          id: 4,
          nombre: "Tech Innovations Inc.",
          industria: "Tecnología",
          contacto: "Elena Ramos",
          email: "contacto@techinnovations.com",
          rol: "Empresa"

        },
        {
          id: 5,
          nombre: "Eco Solutions",
          industria: "Energías Renovables",
          contacto: "Carlos Gómez",
          email: "info@ecosolutions.com",
          rol: "Empresa"
        }
      ]

    const onClickPersonas = () => {
        setFiltered(data.filter((persona) => persona.rol === 'Postulante'))
    }

    const onClickEmpresas = () => {
        setFiltered(data.filter((persona) => persona.rol === 'Empresa'))
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Actualiza el valor de búsqueda basado en la entrada del usuario
    }

      
  return (
    <div className='lg:p-20 p-10 w-full min-h-screen bg-white relative'>
        <h2 className="text-4xl font-Ourland text-darkBlue py-4 lg:text-left text-center">Admin Panel</h2>
        <div className='flex justify-start gap-4 '>
            <button className='buttonDark' onClick = {onClickPersonas}>Personas</button>
            <button className='buttonDark' onClick = {onClickEmpresas}>Empresas</button>
        </div>
        <input
            type='text'
            placeholder='Buscar'
            className='w-2/3 rounded-md outline-none inputForm my-10'
            value={searchTerm} 
            onChange={handleSearchChange}
        />

        {
            filtered.map((persona) => {
                return (
                    <div key={persona.id} className='flex flex-col items-center justify-center gap-2'>
                        <p>{persona.nombre}</p>
                        <p>{persona.apellido}</p>
                        <p>{persona.email}</p>
                    </div>
                )
            })

        }



        
    </div>
  )
}

export default AdminPage