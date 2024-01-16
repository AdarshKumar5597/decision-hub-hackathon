import React, { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";

const Chatbot = () => {


    const [value, setValue] = useState(null);
    const [message, setMessage] = useState(null);
    const [previousChats, setPreviousChats] = useState([]);
    const [currentTitle, setCurrentTitle] = useState(null);
    const createNewChat = () => {
        setMessage(null)
        setValue("")
        setCurrentTitle(null)
    }

    const getMessages = async () => {


        const options = {
            method: "POST",
            body: JSON.stringify({
                message: JSON.stringify({
                    "currentQuestion": value,
                    "previousChats": currentChat
                })
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await fetch("https://express-backend-cdlo.onrender.com/api/v1/rules/completions", options)
            const data = await response.json()
            console.log(data);
            setMessage(data.choices[0].message)

        } catch (error) {
            console.log(error)
        }
    }

    const handleClickToSetCurrentTitle = (title) => {
        setCurrentTitle(title)
        setMessage(null)
        setValue("")
    }

    useEffect(() => {
        console.log(currentTitle, value, message);
        if (!currentTitle && value && message) {
            setCurrentTitle(value);
        }
        else if (currentTitle && value && message) {
            setPreviousChats(prevChats => (
                [...prevChats,
                {
                    title: currentTitle,
                    role: "user",
                    content: value,
                },
                {
                    title: currentTitle,
                    role: message.role,
                    content: message.content
                }

                ]
            ))
        }
    }, [message, currentTitle])

    console.log(previousChats);

    const currentChat = previousChats.filter(prevChats => prevChats.title === currentTitle)
    const uniquetitles = Array.from(new Set(previousChats.map(prevChats => prevChats.title)))

    console.log(uniquetitles)

    return (
        <div className='app bg-[#212121da] flex my-5 w-[1080px] mx-auto'>
            <div className='side-bar bg-[#202123] h-[85vh] w-[244px] flex flex-col justify-between'>
                <button onClick={createNewChat} className='border border-solid border-white border-opacity-50 bg-transparent rounded-[5px] p-[10px] m-[10px]'>
                    + New Chat
                </button>
                <ul className='history p-[10px] m-[10px] h-[100%] max-h-[calc(85vh - 45px)] overflow-y-scroll scrollbar-hide'>
                    {
                        uniquetitles?.map((uniquetitle, index) => (
                            <li className='py-[15px] px-0' key={index} onClick={() => handleClickToSetCurrentTitle(uniquetitle)}>
                                {uniquetitle.slice(0, 15) + "..."}
                            </li>))
                    }
                </ul>

                <nav className=' border-t-[0.5px] border-white border-solid p-[10px] m-[10px]'>
                    <p>
                        Decision Hub Chatbot
                    </p>
                </nav>
            </div>
            <div className='main h-[85vh] w-[100%] flex flex-col justify-between items-center text-center pt-5'>
                {!currentTitle && <h1 className='text-3xl font-bold'>Chatbot</h1>}
                <ul className='feed flex flex-col gap-y-3 w-full overflow-y-scroll max-h-[70vh] scrollbar-hide p-10'>
                    {
                        currentChat.map((chatMessage, index) =>
                            <li key={index}
                                className={`flex gap-x-3 w-full ${chatMessage.role === 'user' ? " items-center justify-start" : " items-center justify-end"}`}>
                                <div className={`p-2 w-[70%] overflow-y-scroll scrollbar-hide max-h-[100px] flex ${chatMessage.role === 'user' ? "user-li" : "assistant-li rounded-md"}`}>
                                    <p className='role'>{chatMessage.role.charAt(0).toUpperCase()}{chatMessage.role.slice(1)} : &nbsp;{chatMessage.content}</p>
                                </div>
                            </li>)
                    }
                </ul>
                <div className='bottom-section w-[100%] h-[] flex flex-col justify-end items-center'>
                    <div className='input-container relative flex justify-center items-center w-[70%]'>
                        <input className='w-[100%] bg-black text-white rounded-[5px] py-[12px] px-[12px] outline-none' value={value} onChange={(e) => setValue(e.target.value)} />

                        <FaMagnifyingGlass id='submit' type='submit' onClick={getMessages} style={{ color: "white", position: "absolute", right: 15, top: 12, height: "25px", width: "25px", cursor: "pointer" }} />

                    </div>
                    <p className='info text-[rgba(255, 255, 255, 0.5)] p-[10px] text-[11px] w-[100%] max-w-[650px]'>xxxxxxxx xxxxxxxxxxx xxxxxxxxxx xxxxxxxxxxx xxxxxx xxxxxxxx xx x x  x xxxxxxxxx x xxxxxxxxxxxx xxxxxxxxxxx x  x xx xxxxxxxxxxxx xxxxxxxx </p>

                </div>
            </div>
        </div>
    )
}

export default Chatbot