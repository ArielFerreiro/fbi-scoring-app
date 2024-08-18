import { Routes, Route, Navigate } from "react-router-dom"
import { MainMenu, MainPage } from "../pages";

export const ScorerRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainMenu />}/>
        <Route path='/score' element={<MainPage />}/>
        <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  )
}
