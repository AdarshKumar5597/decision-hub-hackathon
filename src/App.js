import { Navigate, Route, Routes } from "react-router-dom"
import { useLocation } from "react-router-dom"
import "./App.css"
import Container from "./pages/auth/container.js"
import RuleCreate from "./components/RuleCreate.js"
import TestRule from "./components/TestRule.js"
import DbFileRule from "./components/DbFileRule.js"
import Chatbot from "./pages/Chatbot.js"
import { useSelector } from "react-redux"
import Navbar from "./components/common/Navbar.js"
import RuleBuilder from "./pages/RuleBuilder.js"
import AddRuleParamsForm from "./components/forms/AddRuleParamsForm.js"

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
          <div className="bg-[#111526] w-[90vw] md:h-[calc(0.95*100vh)] rounded-xl mx-5">
            <Routes>
              <Route path="/" element={<RuleCreate />} />
              <Route path="/test" element={<TestRule />} />
              <Route path="/dbfilerule" element={<DbFileRule />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/rulebuilder" element={<RuleBuilder />} />
              <Route path="/addruleparams" element={<AddRuleParamsForm />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
