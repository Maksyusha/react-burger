import PropTypes from 'prop-types'
import typeStyles from './ingredients-type.module.css';
import {IngredientsItem} from './components/ingredients-item/ingredients-item.jsx'



function IngredientsType(props) {
  return(
    <li ref={props.innerRef} className='mb-10' onClick={props.onClick}>
      <h2 className={`${typeStyles['ingredients-type__title']} text text_type_main-medium`}>{props.title}</h2>
      <ul className={`${typeStyles['ingredients-type__list']} pt-6 pr-4 pl-4`}>
        {props.data.map((item) => (<IngredientsItem data={item} key={item._id} onClick={props.onClick}/>))}
      </ul>
    </li>
  )
}



IngredientsItem.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.object
}



export {IngredientsType};
