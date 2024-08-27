import { Navigate, Route, Routes } from "react-router-dom"

import { AuthRoutes } from './AuthRoutes';
import { ScorerRoutes } from './ScorerRoutes';
import { CheckingAuth } from  '../components';
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {

  const status = useCheckAuth();

  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (

    <Routes>

      {
        (status === 'authenticated')
          ? <Route path='/*' element={<ScorerRoutes />}/>
          : <Route path='/auth/*' element={<AuthRoutes />}/>
      }

      <Route path="/*" element={ <Navigate to='/auth/login' />} />

    </Routes>

  )
}