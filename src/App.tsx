import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseList from "./components/ExpenseList"
import ExpenseModal from "./components/ExpenseModal"
import { useBudget } from "./hooks/useBudget"
import { useEffect, useMemo } from "react"


function App() {
  const { state } = useBudget() // * STATE -> Para acceder a los datos | DISPATCH -> Para escribir en el STATE
  // console.log(state.budget)

  const isValidBudget = useMemo(() => state.budget > 0 , [state.budget])

  // ! Almacenamiento en LocalStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses)) // * convertimos el array de 'expenses' en una cadena de texto para poder guardarlo en localStorage
    localStorage.setItem('budget', state.budget.toString())
  }, [state]) // * Escuchamos por 'state.expenses' para que se dispare la accion cada que se agregen o editen GASTOS en el STATE.

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-bold text-4xl text-white">Planificador de Gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {
          isValidBudget ? <BudgetTracker />  : <BudgetForm /> 
        }
      </div>

      {
        isValidBudget && ( // ! TERNARIO CUANDO ES TRUE LA CONDICION
          <main className="max-w-3xl mx-auto py-10">
            {/* Gastos y Filtrados por dia */}
            <ExpenseList />
            <ExpenseModal /> 
          </main> 
      ) 
      }
    </>
  )
}

export default App
