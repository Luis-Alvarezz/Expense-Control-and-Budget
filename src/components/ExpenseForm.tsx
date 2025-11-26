import { useEffect, useState, type ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


// ! Formulario para controlar gastos
export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    // amount: 0,
    amount: '', // * string para que aparezca PlaceHolder pero se almacena como INT en el Componente
    expenseName: '',
    category: '',
    date: new Date()
  }
  )

  const [error, setError] = useState('')
  const { dispatch, state } = useBudget()
  
  // ! LLENAR EL FORMULARIO DEL GASTO SELECCIONADO.
  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId)[0]
      // * Regresamos de Global a Local:
      setExpense(editingExpense)
    }
  }, [state.editingId]) // * Dependencia 'editingId' para leer cada cambio de estado en ese campo

  // ! Escribir sobre el STATE sobre el campo 'Fecha de Gasto' Mediante Dependencia de Calendario
  const handleChangeDate = (value: Value) => {
    // console.log(value)
    setExpense({
      ...expense,
      date: value
    })
  }

  // ! Detectar si escribimos en el STATE campo 'amount' para convertirlo en Number y si no, dejarlo como string
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)  // * Retorna true si escribimos en el STATE campo 'amount'
    // console.log(isAmountField) // * Retorna true si escribimos en el STATE campo 'amount'
    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value
    })
  }

  // ! Enviar Formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // * 1.- Validar
    if (Object.values(expense).includes('')) {
      // console.log('error...')
      setError('Todos los campos son obligatorios')
      return
    }
    
    // console.log('Todo bien...')
    // ! Agregar o actualizar el gasto
    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense:  {id: state.editingId, ...expense } } })
      // * el expense que pasamos es del TYPE 'DraftExpense' es decir, sin ID. Debemos recuperarlo y eso
      // * viene del STATE el ID que estamos editando en 'editingId' y mantiene copia del STATE como resto del GASTO
    } else {
      // ! Agregar un nuevo gasto
      dispatch({ type: 'add-expense', payload: { expense }})
    }

    // ! Reiniciar el STATE
    setExpense({
      amount: '', // * string para que aparezca PlaceHolder pero se almacena como INT en el Componente
      expenseName: '',
      category: '',
      date: new Date()
    }) // * Se reinicia con exito porque tenemos los value={expense.STATE}
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500"> { state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto' }</legend>
      {error && <ErrorMessage> {error} </ErrorMessage>}
      {/* /* Similar al ternario, si existe algo en error, entonces renderiza <ErrorMessage> </ErrorMessage> */}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Nombre Gasto</label>
        <input type="text" id="expenseName" name="expenseName" placeholder="Añade el nombre del gasto" className="bg-slate-100 p-2" value={expense.expenseName} onChange={handleChange} />
        {/* id> Hacerlo accesible con el LABEL | name -> Escribir en el STATE */}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Cantidad</label>
        <input type="number" min="0" id="amount" name="amount" placeholder="Añade la cantidad del gasto: ej: 300 " className="bg-slate-100 p-2" value={expense.amount} onChange={handleChange} />
        {/* id> Hacerlo accesible con el LABEL | name -> Escribir en el STATE */}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">Categoria</label>
        <select id="category" name="category" className="bg-slate-100 p-2" value={expense.category} onChange={handleChange}>
          <option value="">-- Seleccione --</option>
          {
            categories.map(category => (
              <option key={category.id} value={category.id}> {category.name} </option>
            ))
          }
        </select>
        {/* id> Hacerlo accesible con el LABEL | name -> Escribir en el STATE */}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Fecha Gasto:</label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" type="submit" value={ state.editingId ? 'Actualizar Gasto' : 'Registrar Gasto'} />

    </form>
  )
}
