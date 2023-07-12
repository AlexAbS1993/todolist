import { TaskListContainer } from "./components/Task/TaskUI";
import classes from './App.module.css'
import { LightThemeVars, DarkThemeVars } from "./variables/themeVars";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState({name: 'dark', theme: DarkThemeVars})
  return <div className={classes.layout_container}
      style={theme.theme}
  >
    <button 
    onClick={() => {
      setTheme((prev) => prev.name === "dark" ? 
      {name: "ligth", theme: LightThemeVars} : 
      {name: "dark", theme: DarkThemeVars})
    }}
    >
      МЕНЯЕМ ТЕМУ
    </button>
    <TaskListContainer />
  </div>;
}

export default App;
