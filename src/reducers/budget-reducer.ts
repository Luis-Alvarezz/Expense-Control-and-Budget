// * Si fuera mas grande (mas secciones) seria buena idea dividirlo en varias secciones, pero aqui tendremos todo.

// ! 1.- Métodos o Acciones para 
export type BudgetActions = 
 { type: 'add-budget', payload: {budget: number}}

//  ! 2.- STATE
export type BudgetState = {
  budget: number
}

// ! 3.- STATE INICIAL para cada Presupuesto o Budget
export const initialState: BudgetState = {
  budget: 0,
  // auth: true // * Ejemplo al mostrar el console.log del state del CustomHook
}

// ! 4.- Reducer:
export const budgetReducer = ( state: BudgetState = initialState, action: BudgetActions  ) => {
  if (action.type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget // * Colocamos directamente porque ya validamos en su Componente
    }
  }

  return state;
}