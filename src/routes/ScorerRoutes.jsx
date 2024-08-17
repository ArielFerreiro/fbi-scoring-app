import { Routes, Route, Navigate } from "react-router-dom"
import { MainPage } from "../pages";

export const ScorerRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  )
}
