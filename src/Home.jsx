import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { API_ID } from '../constants'

function Home() {
  const [data, setData] = useState({
    celcius: 0,
    name: 'Malappuram',
    humidity: 0,
    speed: 0,
    image: '/Images/cloudy.png'
  })

  const [name, setName] = useState('Malappuram')
  const [error, setError] = useState('')

useEffect(()=>{
  handleClick()
},[])

  const handleClick = () => {
    if (name.trim() !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_ID}&&units=metric`;
      axios.get(apiUrl).then(res => {
        console.log(res.data);
        let imagepath = '';
        if (res.data.weather[0].main == 'Clouds') {
          imagepath = '/Images/cloudy.png'
        } else if (res.data.weather[0].main == 'Clear' || 'Haze') {
          imagepath = '/Images/sunny.png'
        } else if (res.data.weather[0].main == 'Drizzle') {
          imagepath = '/Images/drizzle.png'
        } else if (res.data.weather[0].main == 'Mist') {
          imagepath = '/Images/mist.png'
        } else {
          imagepath = '/Images/cloudy.png'
        }

        setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagepath })
        setError('')
      
      }).catch(err => {
        if(err.response.status == 404){
          setError("Invalid City Name")
        }else{
          setError('')
        }
        console.log(err)
      })
    }
  }

  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
          <input type='text' placeholder='Enter City Name' onChange={(e) => setName(e.target.value)} />
          <button><img src='/Images/pngwing.com.png' onClick={handleClick} /></button>
        </div>
        <div className='error'>
          <p>{error}</p>
        </div>
        <div className='winfo'>
          <img className='img-2' src={data.image} alt='' />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img className='fog' src='/Images/fogflow.png' alt='' />
              <div className='humidity'>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img className='fog' src='/Images/favpng.png' alt='' />
              <div className='wind'>
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home