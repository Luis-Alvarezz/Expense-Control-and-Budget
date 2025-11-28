// * Si fuera mas grande (mas secciones) seria buena idea dividirlo en varias secciones, pero aqui tendremos todo.
import type { DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from "uuid"

// ! 1.- Métodos o Acciones para 
export type BudgetActions = 
 { type: 'add-budget', payload: {budget: number} } |
 { type: 'show-modal' } |
 { type: 'close-modal' } |
 { type: 'add-expense', payload: { expense: DraftExpense} } | // * El ID se genera en el reducer
 { type: 'delete-expense', payload: { id: Expense['id']} } |
 { type: 'get-expenseById', payload: { id: Expense['id'] } } |
 { type: 'update-expense', payload: { expense: Expense} } |
 { type: 'reset-app' }

 //  ! 2.- TYPE
 export type BudgetState = {
   budget: number
   modal: boolean
   expenses: Expense[],
   editingId: Expense['id']
  }
  
//  ! 5. Almacenar Expense en LocalStorage
const localStorageExpenses = () : Expense[] => {
  const expenses = localStorage.getItem('expenses') // * Obtenemos la variable 'key'
  return expenses ? JSON.parse(expenses) : [] // * Si tenemos expenses, los parseamos a un array de Objetos, sino devolvemos un arreglo vacio
}

const initialBudget = () : number => {
  const localStorageBudget = localStorage.getItem('budget')
  return localStorageBudget ? Number(localStorageBudget) : 0 // * O tambien +localStorageBudget : 0
}

// ! 3.- STATE INICIAL para cada Presupuesto o Budget
export const initialState: BudgetState = {
  budget: initialBudget() || 0,
  // auth: true // * Ejemplo al mostrar el console.log del state del CustomHook
  modal: false,
  expenses: localStorageExpenses() || [],
  editingId: ''
}

const createExpense = (draftExpense: DraftExpense) : Expense => {
  return {
    ...draftExpense,
    id: uuidv4()
  }
}

// ! 4.- Reducer:
export const budgetReducer = ( state: BudgetState = initialState, action: BudgetActions  ) => {
  if (action.type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget // * Colocamos directamente porque ya validamos en su Componente
    }
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true
    }
  }

  if (action.type === 'close-modal') {
    return {
    ...state,
    modal: false,
    editingId: ''
    }
  }

  if (action.type === 'add-expense') {
    const expense = createExpense( action.payload.expense)
    
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false // * CERRAR MODAL
    }
  }

  if (action.type === 'delete-expense') {
    const items = state.expenses.filter( expense => expense.id !== action.payload.id)

    return {
      ...state,
      expenses: items
    }
  }

  if (action.type === 'get-expenseById') {
    // console.log('Actualizando...')

    return {
      ...state,
      editingId: action.payload.id,
      modal: true
    }
  }

  if (action.type === 'update-expense') {
    // console.log('Actualizando...')
    return {
      ...state,
      expenses: state.expenses.map( expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
      modal: false,
      editingId: ''
    }
  }

  if (action.type === 'reset-app') {
    return {
      ...state,
      budget: 0,
      expenses: [],
    }
  }

  return state;
}