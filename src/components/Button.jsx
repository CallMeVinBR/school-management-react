import React from "react";

export default function Button({ e, htmlValue, txt, htmlClass = null, type = null, htmlType, disabled = false }) {
  var finalClass = 'w-fit min-w-[100px] cursor-pointer rounded-[10px] border p-2 text-center shadow transition-all';

  if (type == "primary") {
    finalClass = `${finalClass} bg-yellow-200 border-yellow-500 text-yellow-900 font-medium hover:bg-yellow-400`;
  } 
  else if (type == "critical") {
    finalClass = `${finalClass} bg-red-500 border-red-500 text-white hover:bg-red-700 hover:text-white`;
  }
  else if (type == "page") {
    finalClass = `${finalClass} font-semibold border-yellow-400`;
  }
  else {
    finalClass = `${finalClass} text-yellow-600 font-medium`;
  }

  // botoes com renderizacao condicional
  if (htmlClass) {
    finalClass = `${finalClass} ${htmlClass}`
  }

  return (
    <button onClick={e} value={htmlValue} className={finalClass} type={htmlType} disabled={disabled}>
      {txt}
    </button>
  );
}
