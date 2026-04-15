import { useState, useEffect } from "react";

export function Toggle( props ) {
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", "mytheme");
    }, []);
    const [isChecked, setIsChecked] = useState(true)

    return (
        <div className="flex items-center gap-3 p-4">
            <input
                type="checkbox"
                className="toggle border-gray-300 bg-[#CCCCCC] 
             checked:bg-azulBase checked:border-azulBase"
                style={{
                    '--chkbg': 'white',  // color de la bolita
                    '--chkfg': 'white',  // para íconos si hubiera
                    '--input-color': 'white', // contenido interno
                }}
            />
            <span>{props.children}</span>
        </div>

    )
}

export default Toggle;