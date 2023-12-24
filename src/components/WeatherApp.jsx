import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function WeatherApp() {

  const place = useSelector(state => state.place)
  const weather = useSelector(state => state.weather)
  const info = useSelector(state => state.info)
  const search = useSelector(state => state.search)

  const dispatch = useDispatch()

  function handleSearch(event){
    dispatch({type: "INPUT_PLACE", payload: event.target.value})
  }

  function handleSubmit(event){
    event.preventDefault()
    if(place===""){
      alert("Please enter the city!!!")
      return
    }
    dispatch({type: "SUBMIT"})
  }

  function handleReset(event){
    event.preventDefault()
    dispatch({type: "RESET"})
  }

  function celsius(temp){
    return Math.round(temp-273.15)
  }

  const api_key = "96c128f6e1ed8d3825c5d49dc4104a64"

  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${api_key}`

  React.useEffect(() => {

    const fetchWeather =  async() => {
      if(weather){
        const response = await fetch (api_url)
        const data = await response.json()
        // console.log(data)
        if(data.cod !== 200){
          dispatch({type: "RESET"})
          alert(data.message)
          return
        }
        dispatch({type: "SET_INFO_FROM_API", payload: data})
      }
    }

    fetchWeather()

    // cleanup function - used to ensure that we are working with latest state
    return () => {}   
  },[search]);

  

  return (
    <div>
      <div className="search-box">
        <input className='input-box' type='text' name='input-name' value={place} placeholder='Enter a city' onChange={handleSearch}></input> 
      </div>
      <div className="buttons">
        <button className='search-btn' type='submit' onClick={handleSubmit}>Search</button>  
        <button className='reset-btn' type='reset' onClick={handleReset}>Reset</button>  
      </div>
      {weather && 
        <div>
        {info ? 
          <div className="weather-details">
            <div className="place-details">
              <h4>Today</h4>
              <h1 className='place'>{info.name}, {info.sys.country}</h1>
              <img className='weather-img' src={`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`} alt="" />
            </div>
            <div className='weather-desc'>
              <h2>{celsius(info.main.temp)}°C</h2>
              <h4 className='description'>{info.weather[0].description} </h4>
            </div>
            <div className='weather-data'>
              <div>
                <h5 className='bold'>Wind Speed</h5>
                <p>{info.wind.speed} m/s</p>
              </div>
              <div>
                <h5 className='bold'>Humidity</h5>
                <p>{info.main.humidity}%</p>
              </div>
              <div>
                <h5 className='bold'>Pressure</h5>
                <p>{info.main.pressure} hPa</p>
              </div>
            </div>
            <div className="footer"> 
              <p>{'\u00a0'}</p>
            </div>
            
          </div>
          : 
          <h3></h3>
        }
      </div>
      
      }
    </div>
  )
}

