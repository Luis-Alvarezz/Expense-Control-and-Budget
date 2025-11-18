type ErrorMessageProps = {
  children: React.ReactNode // ! ReactNode permite renderizar strings pero tambien componentes dentro de otros componentes 
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
      { children }
    </p>
  )
}
