import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {
  // * Requerimos estado inicial para validar formulario y si pasa la validacion, escribimos en nuestro useReducer:
  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudget() // * useReducer retornaba [state, dispatch], pero el customHook retorna {state, dispatch}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name)
    // console.log(e.target.id)
    // console.log(e.target.valueAsNumber)
    setBudget(+e.target.value) // * Equivalente a e.target.valueAsNumber
  }

  // ! Metodo 2.- Se usa cuando unicamente el usuario esta escribiendo
  const isValid = useMemo(() => {
    // console.log(budget) // * SI borramos el numero (queda string) marca NaN
    // console.log(isNaN(budget)) // * 20, 40 -> False, porque SI es numero | '' -> TRUE porque NO es numero
    return isNaN(budget) || budget <= 0
  }, [budget]) // * Cada que budget cambie, queremos revisar esta funcion

  // ! Método 3.- Envio de Formulario 
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log('Añadir o Definir Presupuesto')

    // TODO - Usamos el dispach
    dispatch({type: 'add-budget', payload: {budget}})
  }
  
  return (
    <form action="" className="space-y-5" onSubmit={ handleSubmit }>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
          Definir Presupuesto
        </label>

        <input
          id="budgetID"
          type="number"
          className="w-full bg-white border border-gray-300 p-2"
          placeholder="Define tu presupuesto"
          name="budget" 
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value='Definir Presupuesto'
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        disabled={isValid}
        />
    </form>
  )
}
