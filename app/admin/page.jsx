"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { MdFilterAlt } from "react-icons/md"
import { IoLogOut } from "react-icons/io5"



const AdminPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [token , setToken] = useState('')
    const [activeFilter, setActiveFilter] = useState('all')
    const [currentData, setCurrentData] = useState([])
    const [filterData , setFilterData] = useState([])

    const router = useRouter()


    const handleUsers = async () => {
      const url = 'https://ngt-markalbrand56.koyeb.app/admin/users'
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        console.log(response.message)
        throw new Error('Error al descargar el documento')
      }

      const data = await response.json();
      setCurrentData(data.users)
      setFilterData(data.users)
      console.log(data)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)        
    }

    const filteredData = filterData.filter((person) => {
        return person.username.toLowerCase().includes(searchTerm.toLowerCase())
    }
    )

    const handleFilter = (role) => {
        const data = [...currentData]
        const filteredData = data.filter((person) => {
            return person.role === role
        }
        )
        setFilterData(filteredData) 
        setActiveFilter(role)
    }

    const handleAll = () => {
        setFilterData(currentData)
        setActiveFilter('all')
    }


    const handleClick = (username) => {
        router.push(`/admin-details/${username}`)
    }

    useEffect(() => {
        setToken(localStorage.getItem('userId'))

        token && handleUsers()

    }
    , [token])

    const handleLogout = () => {
        localStorage.removeItem('userId')
        router.push('/')
    }

      
  return (
    <div className='lg:p-20 p-10 w-full min-h-screen bg-white relative'>
        <IoLogOut className='text-4xl text-darkBlue absolute top-0 right-0 cursor-pointer m-6' onClick={handleLogout}/>
        <h2 className="text-4xl font-Ourland text-darkBlue py-4 lg:text-left text-center">Admin Panel</h2>
        <input
            type='text'
            placeholder='Buscar'
            className='w-2/3 rounded-md outline-none inputForm mt-10'
            value={searchTerm} 
            onChange={handleSearchChange}
        />
        <div className='flex lg:justify-end w-full py-4 justify-start'>
            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="dropSummary">Filtrar por rol:</div>
                <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-darkBlue">
                    <ul className="card-body text-white">
                        <li className={activeFilter === 'worker' ? 'bg-lightBlue rounded-md p-2' : ''} onClick={() => handleFilter('worker')}><a>Trabajadores</a></li>
                        <li className={activeFilter === 'company' ? 'bg-lightBlue rounded-md p-2' : ''} onClick={() => handleFilter('company')}><a>Empresas</a></li>
                        <li className={activeFilter === 'all' ? 'bg-lightBlue rounded-md p-2' : ''} onClick={handleAll}><a>Todos</a></li>
                    </ul>
                </div>
            </div>
        </div>
      <div className='flex flex-col gap-4'>
        {
            filteredData.map((person) => {
                return (
                    <button className='flex flex-col gap-4 border-lightBlue border-2 p-4 rounded-md relative hover:shadow-xl' key={person.username} onClick={() => handleClick(person.username)}>
                        <div className='absolute top-0 right-0 bg-lightBlue text-white p-2 rounded-xs font-montserrat'>{person.role === 'worker' ? 'Trabajador' : 'Empresa'}</div>
                        <h2 className='text-black font-bold'>Usuario: <span className='font-medium'>{person.username}</span></h2>
                        <h2 className='text-black font-bold'>Nombre: <span className='font-medium'>{person.name} {person.lastName}</span></h2>
                        {
                            person.program && <h2 className='text-black font-bold'>Programa de aplicación: <span className='font-medium'>{person.program}</span></h2>
                        }
                        <h2 className='text-black font-bold'>Email: <span className='font-medium'>{person.email}</span></h2>
                    </button>
                )
            }
            )
        }
        </div>
        
    </div>
  )
}

export default AdminPage