import React, {useState, useEffect} from 'react';
import './Card.css';
import search from '../assets/images/search.jpg';
import question from '../assets/images/question_mark.jpg';
import devmission from '../assets/images/devmission.png';
import codeforsanfrancisco from '../assets/images/code4sf.png';
import hackthehood from '../assets/images/hackthehood.png';

import CardItem from './CardItem';
import NonprofitDataService from "../services/nonprofit.service";

function Cards() {

    const [nonprofits, setNonprofits] = useState([]);
    const [sectorArray, setSectorArray] = useState([])
    let tempSectorArray = [];
    let value = false;

    const getToken = () => {
      const tokenString = localStorage.getItem('token');
      return tokenString
    };

    const getImage = (param) => {
      param = param.replace(/\s/g, '').toLowerCase()
      if (param === "devmission") return devmission;
      if (param === "codeforsanfrancisco") return codeforsanfrancisco;
      if (param === "hackthehood") return hackthehood;
    }

    useEffect(() => {
        NonprofitDataService.getAll()
        .then(response => {
            setNonprofits(response.data);
            console.log(response.data)
            response.data.forEach((nonprofit) => {
              let nonprofit_id = nonprofit.nonprofit_id;
              NonprofitDataService.getAllSector(nonprofit_id)
              .then(response => {
                setSectorArray([ ...tempSectorArray, ...response.data ])
                tempSectorArray.push(response.data[0]);
                
              })
              .catch(e => {
                console.log(e)
              })
            })     
            value = true;
      })
        .catch(e => {
        console.log(e);
        });
    }, [value]);

    // // Had this to replace having to use inline map for label, will come back to it
    // const getSectors = (sectors) => {
    //   const items = sectors.map((sector, idx) => {
    //     return <li key={idx}>{sector.sector_name}</li>;
    //   });
    //   console.log(items)
    //   return items
    // }
    // console.log(nonprofits, "NONPROFITS")
    // console.log(sectorArray, "TESTTTTTTTTt")

  return (
    <div className='cards'>
      <h1>Nonprofits</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
              <CardItem
                src={search}
                name="Search for nonprofits"
                text='Search for a specific nonprofit by name'
                label="Search Nonprofits"
                path='/search-nonprofits'
              />
              <CardItem
                src={question}
                name="Find a random nonprofit"
                text='Randomly find a nonprofit'
                label="Random Nonprofit"
                path='/random-nonprofit'
              />
          </ul>
        { getToken() ? (
              <>
              <h1> Nonprofits near you </h1>
              <ul className='cards__items'>
              {
                sectorArray.map((user, index) => (
                    // console.log(user.nonprofit_name),
                    <CardItem 
                        src={getImage(user.nonprofit_name)}
                        name={user.nonprofit_name}
                        text={user.description}
                        label={user.sectors.map(function(name,index){return name.sector_name.replace(/['"]+/g, '')} )}
                        path={`/nonprofits/${user.nonprofit_id}/profile`}
                        state={user}
                    />
                  ))
                  
              }
              </ul>
              </>
        ) : ( 
          <>
          <h1> Popular nonprofits </h1>
          <ul className='cards__items'>
          {
            sectorArray.map((user, index) => (
                <CardItem 
                    src={getImage(user.nonprofit_name)}
                    name={user.nonprofit_name}
                    text={user.description}
                    label={user.sectors.map(function(name,index){return name.sector_name.replace(/['"]+/g, '')} )}
                    path={`/nonprofits/${user.nonprofit_id}/profile`}
                    state={user}
                />
              ))
              
          }
          </ul>
          </>
        )}

        </div>
      </div>
    </div>
  );
}

export default Cards;