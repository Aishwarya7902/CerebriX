import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/dashboard"
import { SharedBrain } from "./pages/sharedBrain"
import { Landing } from "./pages/landing"
import { ProtectedRoute } from "./pages/protectedRoute"



function App() {


  return <BrowserRouter>

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/share/:shareId" element={<SharedBrain />} />
    </Routes>
  </BrowserRouter>
}

export default App
