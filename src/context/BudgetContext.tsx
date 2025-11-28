import { useReducer, createContext, useMemo } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

// ! 4. Type del PROVIDER para Children
type BudgetProviderProps = {
  children: React.ReactNode
}

// ! 3.- Indicar el TYPE para unificar context y Provider
type BudgetContextProps = {
  // * Aqui se conecta el CONTEXT (la accion de tener el estado global) y PROVIDER (los datos que va a tener el CONTEXT)
  state: BudgetState
  dispatch: React.Dispatch<BudgetActions> // * GENERIC (<>) para indicar que es dinamico por las acciones
  totalExpenses: number
  reminingBudget: number
}

// ! 2.- Crear el Context (La accion de tener el STATE GLOBAL)
// eslint-disable-next-line react-refresh/only-export-components
export const BudgetContext = createContext<BudgetContextProps>(null!) // * Opcion 2
// export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps) // * Opcion 1

// ! 1.- Crear el Provider (de donde vienen los datos [vienen del reducer])
export const BudgetProvider = ({children}: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)
  
  // ! Calcular el gasto usado y Disponible:
  const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => Number(expense.amount) + total, 0) , [state.expenses])
  const reminingBudget = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses])
  
  return (
    <BudgetContext.Provider
      value={{ // * El value siempre es OBJETO, en esta caso retornamos otro OBJETO
        state,
        dispatch,
        totalExpenses,
        reminingBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
