import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { useMemo } from "react";
import type { BudgetState } from "../reducers/budget-reducer";

// ! Calcular el gasto Disponible (forma de CustomHoook Encapzsulado)
 function useReminingBudget(state: BudgetState, totalExpenses: number) {
  return useMemo(() => {
    return state.budget - totalExpenses
  }, [state.budget, totalExpenses] )
}

export default function BudgetTracker() {
  const { state } = useBudget()

  // ! Calcular el gasto usado:
  const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => Number(expense.amount) + total, 0) , [state.expenses])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="Gráficos de gastos" />

      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
        >
          Reset App
        </button>

        <AmountDisplay 
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay 
          label="Disponible"
          amount={useReminingBudget(state, totalExpenses)}
        />

        <AmountDisplay 
          label="Gastado"
          amount={totalExpenses}
        />
      </div>
    </div>
  )
}
