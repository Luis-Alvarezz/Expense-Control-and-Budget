import { useMemo } from "react"
import { formatDate } from "../helpers/helper"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"

type ExpenseDetailProps = {
  expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

  const categoryinfo = useMemo(() => categories.filter( category => category.id === expense.category)[0] , [expense]) // * Cada que haya nuevos gastos, se ejecuta el useMemo | Posicion [0] porque filter retorna un ARREGLo

  
  return (
    <div className="bh-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
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
  )
}
