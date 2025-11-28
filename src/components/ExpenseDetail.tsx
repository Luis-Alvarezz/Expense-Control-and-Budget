import { useMemo } from "react"
import { formatDate } from "../helpers/helper"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list" // * LeadingActions -> Acciones que vienen de un costado | TrailingActions -> Acciones que vienen del otro lado
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
  expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

  const { dispatch } = useBudget()

  const categoryinfo = useMemo(() => categories.filter( category => category.id === expense.category)[0] , [expense]) // * Cada que haya nuevos gastos, se ejecuta el useMemo | Posicion [0] porque filter retorna un ARREGLo

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({ type: 'get-expenseById', payload: {id: expense.id} }) }>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  ) // * Al ser componentes, se ponen () y NO {} para darlo por implicito 
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => dispatch({ type: 'delete-expense', payload: {id: expense.id} }) } destructive={true} >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  ) // * Al ser componentes, se ponen () y NO {} para darlo por implicito 

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30} // * PROP OBLOGATORIO - Para los pixeles que queremos que se recorra para disparar estas acciones
        leadingActions={leadingActions()} // * Arrastrar de Izq a Der
        trailingActions={trailingActions()} // * Arrastrar de Der a Izq
      >
        <div className="bh-white shadow-lg p-5 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img 
              src={`/icono_${categoryinfo.icon}.svg`} 
              alt="Icono Gasto Componente ExpenseDetails"
              className="w-20"
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500"> {categoryinfo.name} </p>
            <p> { expense.expenseName }</p>
            <p className="text-slate-600 text-sm"> { formatDate(expense.date!.toString()) } </p>
            {/* Con '!' Indicamos que ese valor VA A EXISTIR */}
          </div>

          <AmountDisplay
            amount={expense.amount}
          />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
