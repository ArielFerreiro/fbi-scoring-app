import { Routes, Route, Navigate } from "react-router-dom"
import { MainMenu, Training, Tournament } from "../pages";

export const ScorerRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainMenu />}/>
        <Route path='/training' element={<Training />}/>
        <Route path='/tournament' element={<Tournament />}/>
        <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  )
}
