import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {
  const { state } = useBudget()
  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]) // * Se ejecuta cuando cambian los gastos


  return (
    <div className="mt-10">
      {
        isEmpty ? <p className="text-red-600 text-2xl font-bold text-center">No hay gastos</p> : (
          <>
            <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
            {
              state.expenses.map( expense => (
                <ExpenseDetail 
                  key={expense.id}
                  expense={expense}
                />
              ))
            }
          </>
        )
      }
    </div>
  )
}
