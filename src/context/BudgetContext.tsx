import { useReducer, createContext } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

// ! 3.- Indicar el TYPE para unificar context y Provider
type BudgetContextProps = {
  // * Aqui se conecta el CONTEXT (la accion de tener el estado global) y PROVIDER (los datos que va a tener el CONTEXT)
  state: BudgetState
  dispatch: React.Dispatch<BudgetActions> // * GENERIC (<>) para indicar que es dinamico por las acciones
}

// ! 4. Type del PROVIDER para Children
type BudgetProviderProps = {
  children: React.ReactNode
}

// ! 1.- Crear el Provider (de donde vienen los datos [vienen del reducer])
export const BudgetProvider = ({children}: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)
  
  return (
    <BudgetContext.Provider
      value={{ // * El value siempre es OBJETO, en esta caso retornamos otro OBJETO
        state,
        dispatch
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

// ! 2.- Crear el Context
export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps) // * Opcion 1
// export const BudgetContext = createContext<BudgetContextProps>(null!) // * Opcion 2