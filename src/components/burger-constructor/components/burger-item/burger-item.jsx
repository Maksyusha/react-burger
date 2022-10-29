import { useRef } from 'react'
import itemStyles from './burger-item.module.css'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { DECREASE_INGREDIENT_VALUE } from '../../../../services/actions/burger-ingredients'
import {
  DELETE_CHOSEN_INGREDIENT,
  SORT_CHOSEN_INGREDIENTS,
} from '../../../../services/actions/burger-constructor'

export function BurgerItem({ item, index }) {
  const dispatch = useDispatch()

  const handleDelete = (item, index) => {
    dispatch({ type: DECREASE_INGREDIENT_VALUE, ingredient: item })
    dispatch({ type: DELETE_CHOSEN_INGREDIENT, ingredient: item, index: index })
  }

  const ref = useRef(null)

  const [, dropRef] = useDrop({
    accept: 'constructorItem',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      } else if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch({
        type: SORT_CHOSEN_INGREDIENTS,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      })

      item.index = hoverIndex
    },
  })

  const [{ isDragging }, dragRef] = useDrag({
    type: 'constructorItem',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging && item.index !== index ? 0 : 1

  dragRef(dropRef(ref))

  return (
    <li
      ref={ref}
      className={`${itemStyles['burger-item']}`}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        thumbnail={item.image}
        text={item.name}
        price={item.price}
        handleClose={() => handleDelete(item, index)}
      />
    </li>
  )
}
