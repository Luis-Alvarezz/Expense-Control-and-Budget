import { formatCurrency } from "../helpers/helper"

type AmountDisplayProps = {
  label?: string, // ! Con '?' Indicamos que es valor OPCIONAL !!!!
  amount: number | string
}

export default function AmountDisplay({label, amount} : AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {/* {label}: {''} */}
      { label && `${label}: `}
      <span className="font-black text-black">{formatCurrency ( Number(amount) )}</span>
    </p>
  )
}
