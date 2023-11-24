import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

const api = "https://randomuser.me/api?results=5"

const Item = (
    {
        picture,
        name,
        country,
        postcode,
        phone,
    }
) => {
   return (
       <div className={"item"}>
         <div className={'item-image'}>
           <img src={picture} alt={'picture'}/>
         </div>
           <div className={'item-info'}>
               <h2>{name}</h2>
               <div className={'item-location'}>
                   <p>{country}</p>
                   <p>{postcode}</p>
               </div>
               <h3>{phone}</h3>
           </div>


       </div>
   )
}

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
      fetch(api).then(res => res.json()).
      then(data => {
          const formattedData = data.results.map(item => {
              const {picture: {medium: picture}, name: {first: name}, location: {country, postcode}, phone} = item
              return {
                  picture,
                  name,
                  country,
                  postcode,
                  phone
              }
          })
          setData(formattedData)
      });


  }, []);
  console.log(data)
  return (
    <div className="App">
        <div className={'data-container'}>
            {
                data.map(item =>
                    <Item
                        {...item}
                    />
                )
            }
        </div>
    </div>
  );
}

export default App;
