import { Route, Routes } from "react-router-dom"
import { useLocation } from "react-router-dom"
import "./App.css"
import Navbar from "./components/common/Navbar"
// import RuleCreate from "./components/RuleCreate"
// import DebugRule from "./components/DebugRule"
// import ModifyRule from "./components/ModifyRule"
// import TestRule from "./components/TestRule"
// import DbFileRule from "./components/DbFileRule"
import Container from "./pages/auth/container.js"
import Wrapper from "./components/Wrapper"

function App() {
  const location = useLocation()
  return (
    <div
      className={`bg-[url('https://i.postimg.cc/XqRvr2np/background.png')] bg-cover focus:bg-none bg-no-repeat bg-fixed h-[100vh] w-[100vw] mt-0 mx-0 overflow-hidden`}
    >
      {location.pathname === "/auth/register" ||
      location.pathname === "/auth/login" ? (
        <Routes>
          <Route path="/auth/register" element={<Container />} />
          <Route path="/auth/login" element={<Container />} />
        </Routes>
      ) : (
        <div className="flex md:flex-row flex-col justify-center items-center">
          <Navbar />
          <Routes>
            <Route path="/" element={<Wrapper />} />
            <Route path="/create" element={<Wrapper />} />
            <Route path="/debug" element={<Wrapper />} />
            <Route path="/modify" element={<Wrapper />} />
            <Route path="/test" element={<Wrapper />} />
            <Route path="/dbfilerule" element={<Wrapper />} />
            <Route path="/chatbot" element={<Wrapper />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
