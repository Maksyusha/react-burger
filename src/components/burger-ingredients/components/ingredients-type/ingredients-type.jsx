import PropTypes from 'prop-types'
import { ingredientTypes } from '../../../../utils/types.js'
import typeStyles from './ingredients-type.module.css'
import { IngredientsItem } from './components/ingredients-item/ingredients-item.jsx'

function IngredientsType({ innerRef, data, title }) {
  return (
    <li ref={innerRef} className="mb-10">
      <h2
        className={`${typeStyles['ingredients-type__title']} text text_type_main-medium`}
      >
        {title}
      </h2>
      <ul className={`${typeStyles['ingredients-type__list']} pt-6 pr-4 pl-4`}>
        {data.map((item) => (
          <IngredientsItem data={item} key={item._id} />
        ))}
      </ul>
    </li>
  )
}

IngredientsType.propTypes = {
  innerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  data: PropTypes.arrayOf(ingredientTypes).isRequired,
  title: PropTypes.string.isRequired,
}

export { IngredientsType }
