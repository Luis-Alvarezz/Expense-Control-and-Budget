export type Expense = {
  id: string, // * Se genera el ID hasta que se genere el GASTO.
  expenseName: string,
  amount: string, // * string para que aparezca PlaceHolder pero se almacena como INT en el Componente
  category: string,
  date: Value
}

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

// ! Gasto temporal:
export type DraftExpense = Omit<Expense, 'id'>

export type Category = {
  id: string,
  name: string,
  icon: string
}