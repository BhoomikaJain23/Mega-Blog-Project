import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId()
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-2 pl-1 text-slate-300 font-medium" htmlFor={id}>{label}</label>}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`px-4 py-2.5 rounded-lg bg-slate-800/40 border border-slate-700 placeholder-slate-400 text-slate-100 outline-none focus:ring-2 focus:ring-sky-400/40 transition ${className}`}
        {...props}
      />
    </div>
  )
})

export default Input