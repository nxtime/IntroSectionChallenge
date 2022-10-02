import { memo, useState } from "react"

const Link = ({ children, link = '#', submenu }: any) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <li className="flex flex-col gap-4 relative">
            <button
                className="flex gap-4 text-gray-500 hover:text-gray-900 active:text-gray-900"
                onClick={() => setIsActive((prev: boolean) => !prev)}
            >
                <a
                    href={link}
                >
                    {children}
                </a>
                {
                    submenu !== undefined
                    && <img className="self-center" src={`/images/icon-arrow-${isActive ? 'up' : 'down'}.svg`} alt="Down Arrow" />
                }
            </button>
            {
                (submenu !== undefined && isActive)
                && (
                    <>
                        <ul
                            className={`md:absolute md:min-w-[10rem] md:top-auto md:right-0 ml-6 md:m-0 md:mt-8 flex flex-col gap-4 md:drop-shadow-2xl md:p-6 md:rounded-xl md:bg-white`}
                        >
                            {submenu.map(({ icon, name, link = '' }: any) => (
                                <li className="flex gap-2 text-gray-500 hover:text-gray-900 active:text-gray-900">
                                    {
                                        icon !== undefined
                                        && <img className="self-center" src={'/images/' + icon} alt={name} />
                                    }
                                    <a
                                        href={link}
                                        className="block w-full"
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                )
            }
        </li>
    )
}

const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false);
    return (
        <header className="w-full px-6 gap-8 h-16 flex items-center z-10">
            <img className="w-30" src="/images/logo.svg" alt="Logo Snap" />
            <button
                className="block ml-auto md:hidden"
                onClick={() => setActiveMenu(true)}
            >
                <img src="/images/icon-menu.svg" alt="Menu Icon" />
            </button>
            <nav
                className={`
                ${!activeMenu ? 'hidden md:flex' : ''} 
                fixed md:relative w-full top-0 
                right-0 h-screen md:h-full flex bg-black/70 md:bg-transparent
                md:items-center
                `}
            >
                <div className="w-2/5 h-full md:hidden" onClick={() => setActiveMenu(false)} />
                <div className={`ml-auto md:m-0 w-3/5 md:w-full md:flex h-full p-6 md:p-0 gap-4 bg-white`}>
                    <button
                        className="block ml-auto mb-8 md:hidden"
                        onClick={() => setActiveMenu(false)}
                    >
                        <img src="/images/icon-close-menu.svg" alt="Menu Icon" />
                    </button>
                    <ul className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-center">
                        <Link submenu={[
                            {
                                name: "Todo List",
                                icon: "icon-todo.svg",
                                link: '#',
                            },
                            {
                                name: "Calendar",
                                icon: "icon-calendar.svg",
                                link: '#',
                            },
                            {
                                name: "Reminders",
                                icon: "icon-reminders.svg",
                                link: '#',
                            },
                            {
                                name: "Planning",
                                icon: "icon-planning.svg",
                                link: '#',
                            },
                        ]}
                        >
                            Features
                        </Link>
                        <Link
                            submenu={[
                                {
                                    name: 'History',
                                    link: '#'
                                },
                                {
                                    name: 'Our Team',
                                    link: '#'
                                },
                                {
                                    name: 'Blog',
                                    link: '#'
                                },
                            ]}
                        >
                            Company
                        </Link>
                        <Link>Careers</Link>
                        <Link>About</Link>
                    </ul>
                    <div className="mt-10 md:m-0 flex flex-col items-center md:flex-row gap-2 md:ml-auto">
                        <button className="py-2 h-fit px-6">Login</button>
                        <button className="border h-fit border-gray-900 rounded-2xl py-2 px-6">Register</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default memo(Header);