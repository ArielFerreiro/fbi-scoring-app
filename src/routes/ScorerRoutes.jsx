import { Routes, Route, Navigate } from "react-router-dom"
import { MainMenu, MainPage, Tournament } from "../pages";

export const ScorerRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainMenu />}/>
        <Route path='/score' element={<MainPage />}/>
        <Route path='/tournament' element={<Tournament />}/>
        <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  )
}
