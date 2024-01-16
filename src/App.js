import { Navigate, Route, Routes } from "react-router-dom"
import { useLocation } from "react-router-dom"
import "./App.css"
// import RuleCreate from "./components/RuleCreate"
// import DebugRule from "./components/DebugRule"
// import ModifyRule from "./components/ModifyRule"
// import TestRule from "./components/TestRule"
// import DbFileRule from "./components/DbFileRule"
import Container from "./pages/auth/container.js"
import RulesList from "./pages/RulesList.js"
import RuleCreate from "./components/RuleCreate.js"
import DebugRule from "./components/DebugRule.js"
import ModifyRule from "./components/ModifyRule.js"
import TestRule from "./components/TestRule.js"
import DbFileRule from "./components/DbFileRule.js"
import Chatbot from "./pages/Chatbot.js"
import { useSelector } from "react-redux"
import Navbar from "./components/common/Navbar.js"

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
          <div className="bg-[#111526] w-[90vw] md:h-[95vh] h-[76vh] my-5 rounded-xl mx-5">
          <Routes>
            <Route path="/" element={<RulesList />} />
            <Route path="/create" element={<RuleCreate />} />
            <Route path="/debug" element={<DebugRule />} />
            <Route path="/modify" element={<ModifyRule />} />
            <Route path="/test" element={<TestRule />} />
            <Route path="/dbfilerule" element={<DbFileRule />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
