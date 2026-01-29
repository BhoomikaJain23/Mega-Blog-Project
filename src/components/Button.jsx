import React from "react";

function Button({
  children,
  type = 'button',
  bgColor = 'bg-slate-800/70',
  textColor = 'text-slate-100',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-5 py-2.5 rounded-lg font-semibold ${bgColor} ${textColor} hover:bg-slate-700/80 transition transform active:scale-95 ${className} neon-glow`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;