import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/user/login/LoginScreen.jsx'
import RegisterScreen from './screens/user/register/RegisterScreen.jsx'
import Home from './screens/home/Home.jsx'
import CreateWs from './screens/workspace/create/CreateWs.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'
import Profile from './screens/user/profile/Profile.jsx'
import Workspace from './screens/workspace/Workspace.jsx'

function App() {

  return (
    <div>
      <Routes>

        <Route path='/' element={<LoginScreen />} />
        <Route path='/login' element={<LoginScreen />} />

        <Route path='/register' element={<RegisterScreen />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/workspace/:workspace_id/channel/:channel_id/invite' element={<Workspace />} />
        </Route>

        <Route path='/home' element={<Home />} />

        <Route path='/workspace/new' element={<CreateWs />} />

        <Route path='workspace/:workspace_id/channel/:channel_id' element={<Workspace />} />

      </Routes>
    </div>
  )
}

export default App
