import {createContext} from "react";
import {Gathering, Page} from "../utils/types.ts";

export type ThemeType = 'LIGHT' | 'DARK';

export const ThemeContext = createContext<ThemeType | null>(null);