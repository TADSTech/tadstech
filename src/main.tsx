import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RootComponent from './helpers/nav_helper';

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
document.documentElement.classList.toggle("dark", initialTheme === "dark");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
);