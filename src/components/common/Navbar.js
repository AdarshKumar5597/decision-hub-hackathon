import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbarlinks'

const Navbar = () => {
    const location = useLocation()
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <div className={`flex h-14 items-center justify-center rounded-xl shadow-md bg-green-500 transition-all duration-200`}>

            <nav className="hidden md:block">
                <ul className="flex gap-x-11 text-white items-center">
                    {NavbarLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link?.path}>
                                <p
                                    className={`${matchRoute(link?.path)
                                            ? "text-yellow-300 bg-green-800 shadow-green-300 shadow-sm"
                                            : "text-white"
                                        } flex items-center justify-center w-[5rem] h-[2.5rem] rounded-md transition-all duration-200`}
                                >
                                    {link.title}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

        </div>
    )
}

export default Navbar