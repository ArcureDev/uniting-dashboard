import {PropsWithChildren, useState} from "react";
import {ThemeContext, ThemeType} from "../providers/context.tsx";


export default function Theme(props: Readonly<PropsWithChildren>) {
    const [theme, setTheme] = useState<ThemeType>('DARK');

    function getOtherTheme(): ThemeType {
        return theme === 'DARK' ? 'LIGHT' : 'DARK';
    }

    return (
        <ThemeContext.Provider value={theme}>
            <button type="button" onClick={() => setTheme(getOtherTheme)}>Passer en thème {getOtherTheme()}</button>
            {props.children}
        </ThemeContext.Provider>
    )
}