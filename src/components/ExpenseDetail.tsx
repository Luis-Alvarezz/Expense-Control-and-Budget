import { formatDate } from "../helpers/helper"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"

type ExpenseDetailProps = {
  expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  return (
    <div className="bh-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
      <div>

      </div>

      <div>
        <p> { expense.expenseName }</p>
        <p className="text-slate-600 text-sm"> { formatDate(expense.date!.toString()) } </p>
        {/* Con '!' Indicamos que ese valor VA A EXISTIR */}
      </div>

      <AmountDisplay
        amount={expense.amount}
      />
    </div>
  )
}
