import { useRef, FC, createRef, RefObject, MutableRefObject } from 'react'
import itemStyles from './burger-item.module.css'
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { decreaseIngredientValue } from '../../../../services/slices/burger-ingredients-slice'
import {
  deleteChosenIngredient,
  sortChosenIngredients,
} from '../../../../services/slices/burger-constructor-slice'
import { TIngredient } from '../../../../services/types/data'

type TBurgerItemProps = {
  item: TIngredient & { index?: number }
  index: number
}

export const BurgerItem: FC<TBurgerItemProps> = ({ item, index }) => {
  const dispatch = useDispatch()

  const handleDelete = (item: TIngredient, index: number) => {
    dispatch(decreaseIngredientValue({ ingredient: item }))
    dispatch(deleteChosenIngredient({ index }))
  }

  const ref: MutableRefObject<HTMLLIElement | null> = useRef(null)

  const [, dropRef] = useDrop({
    accept: 'constructorItem',
    hover(item: TIngredient & { index: number }, monitor) {
      if (!ref.current) {
        return
      }

      if (!item.index) {
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
      const hoverClientY =
        clientOffset !== null ? clientOffset.y - hoverBoundingRect.top : 0

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      } else if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(sortChosenIngredients({ dragIndex, hoverIndex }))

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
