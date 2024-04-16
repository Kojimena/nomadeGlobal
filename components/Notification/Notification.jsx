import React,{ useState, useEffect }  from 'react'

const Notification = ({message, onCancel, counterTime, timerAction}) => {
    const [counter, setCounter] = useState(timerAction)

    useEffect(() => {
        if (counter > 0) {
        const timer = setTimeout(() => setCounter(counter - 1), 1000)
        return () => clearTimeout(timer);
        } else {
        onCancel()
        }
    }, [counter, onCancel])

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-start items-start p-10'>
            <div className='bg-white p-8 rounded-md w-full relative'>
            <div className='flex justify-between w-full items-center'>
                <div className='flex justify-center w-full flex-col gap-2'>
                    <p className='font-montserrat font-bold text-center text-darkBlue'>{message}</p>
                    { counterTime && <p className='font-montserrat text-center text-darkBlue'>Serás redirigido en {counter} segundos</p>}
                </div>
                <button className='font-montserrat bg-darkBlue px-2 py-1 rounded-full text-white absolute right-2 top-2' onClick={onCancel}>X</button>
            </div>
        </div>
    </div>
  )
}

export default Notification