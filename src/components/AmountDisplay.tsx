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
/*
  evaluación lógica AND:
  Si label tiene un valor truthy (texto, string no vacío), entonces React renderiza lo que está después del &&.
  Si label es undefined, null, '' (string vacío), 0, false, entonces NO renderiza nada.

  label = "Presupuesto"  --> muestra "Presupuesto: "
  label = "Disponible"   --> muestra "Disponible: "
  label = "" (string vacío)  --> NO muestra nada
  label = undefined  --> NO muestra nada

*/