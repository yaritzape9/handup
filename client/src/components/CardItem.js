
import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
    {console.log(props.src)}
      <li className='cards__item'>
        <Link className='cards__item__link' 
            to={props.path}
            state={props.state}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Nonprofit Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h4 className='cards__item__text'>Nonprofit Name: {props.name}</h4>
            <h5 className='cards__item__text'>Description: {props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;