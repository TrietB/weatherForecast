import React, {useState, useEffect} from 'react'
import './App.css'

const api = {
  base: 'https://api.openweathermap.org/data/2.5/' ,
  key: '2b8590eb0f9fc5f0fb54573ceafa1517'
}
const encodedParams = new URLSearchParams();
encodedParams.append("apiKey", "<REQUIRED>");
encodedParams.append("resolution", "<REQUIRED>");
encodedParams.append("locationKey", "hanoi");

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '62f0429e6emsh6291a9cbb38dcebp12164djsn86b9d1314a5e',
		'X-RapidAPI-Host': 'AccuWeatherstefan-skliarovV1.p.rapidapi.com'
	},
	body: encodedParams
};

function App() {
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchCity, setSearchCity] = useState('')
  const [weatherInfo, setWeatherInfo] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

const handleSubmit = (e) =>{
    e.preventDefault()
    setSearchCity(searchInput)
}

useEffect(() => {
  const fetchWeatherData = async () =>{
    if(!searchCity) return
    setLoading(true)
    try {
      const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`
      const response = await fetch(url)
      const data = await response.json()



  fetch('https://accuweatherstefan-skliarovv1.p.rapidapi.com/getImagesByLocationKey', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
      if(response.ok){
        console.log(data)
        setWeatherInfo(`${data.name}, ${data.sys.country} ${data.weather[0].main}: ${data.weather[0].description}, Tempurature: ${data.main.temp} `)
        setErrorMessage('')
      }else{
      setErrorMessage(data.message)
      console.log(data.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }

    setLoading(false)
  }
  fetchWeatherData()
}, [searchCity])


  return (
    <>
    <form id='input-form' onSubmit={handleSubmit} >
        <input id='user-input' type='text' placeholder='City Name' onChange={(e)=> setSearchInput(e.target.value)} ></input>
        <button id='search-btn'>Search</button>
    </form>
    {loading? (<div>Loading...</div>):(<>{errorMessage ? (<div style={{color:"red"}}>{errorMessage}</div>):(<div id='weather-info'>{weatherInfo}</div>)}</>)}
      
    </>
  )
}

export default App