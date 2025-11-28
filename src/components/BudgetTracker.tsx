import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"


export default function BudgetTracker() {
  const { state, totalExpenses, reminingBudget, dispatch } = useBudget()

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2) // * + Para convertir de STRING a NUMERO |  MAX 2 Decimales
  console.log(percentage)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        {/* <img src="/grafico.jpg" alt="Gráficos de gastos" /> */}
        <CircularProgressbar 
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#DC2626' : '#3B82F6', // * Color a lo que se ha utilizado
            trailColor: '#F5F5F5', // * Color que NO se ha utilizado
            textSize: 8,
            textColor: percentage === 100 ? '#DC2626' : '#3B82F6',
          })}
          text={`${percentage}% Gastado`}
        />

      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => dispatch({type: 'reset-app'})}
        >
          Reset App
        </button>

        <AmountDisplay 
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay 
          label="Disponible"
          amount={reminingBudget}
        />

        <AmountDisplay 
          label="Gastado"
          amount={totalExpenses}
        />
      </div>
    </div>
  )
}
