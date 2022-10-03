import { memo, useLayoutEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion";

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
            <AnimatePresence mode="wait">
                {
                    (submenu !== undefined && isActive)
                    && (
                        <motion.ul
                            className={`md:absolute md:min-w-[10rem] md:top-auto md:right-0 ml-6 md:m-0 md:mt-8 flex flex-col gap-4 md:drop-shadow-2xl md:p-6 md:rounded-xl md:bg-white`}
                            initial={{
                                scaleY: 0,
                                scaleX: 0.5,
                                originY: 0
                            }}
                            animate={{
                                scaleY: 1,
                                scaleX: 1,
                                origin: 'top',
                                opacity: 1,
                            }}
                            exit={{
                                scaleY: 0,
                                scaleX: 0.5,
                                origin: 'top',
                                opacity: 0,
                            }}
                        >
                            {submenu.map(({ icon, name, link = '' }: any) => (
                                <li
                                    className="flex gap-2 text-gray-500 hover:text-gray-900 active:text-gray-900"
                                    key={name}
                                >
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
                        </motion.ul>
                    )
                }
            </AnimatePresence>
        </li>
    )
}

const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false);

    const [width, setWidth] = useState<number | null>(null);

    useLayoutEffect(() => {
        const updateSize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    console.log(width, activeMenu);

    return (
        <motion.header
            className="w-full px-6 gap-8 h-16 flex items-center z-10 bg-white"
            initial={{
                y: '-100%',
                opacity: 0,
            }}
            animate={{
                y: '0%',
                opacity: 1,
            }}
            transition={{
                delay: 0.6
            }}
        >
            <img className="w-30" src="/images/logo.svg" alt="Logo Snap" />
            <button
                className="block ml-auto md:hidden"
                onClick={() => setActiveMenu(true)}
            >
                <img src="/images/icon-menu.svg" alt="Menu Icon" />
            </button>
            <AnimatePresence mode="wait">
                {
                    (((width! < 768 && activeMenu) || (width! > 768))
                        &&
                        <motion.nav
                            className={`
                    ${!activeMenu ? 'hidden md:flex' : ''} 
                    fixed md:relative w-full top-0 
                    right-0 h-screen md:h-full flex md:bg-transparent
                    md:items-center
                    `}
                        >
                            <motion.div
                                className="absolute bg-black/70 w-full h-full md:hidden"
                                onClick={() => setActiveMenu(false)}
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0
                                }}
                            />
                            <motion.div
                                className={`ml-auto md:m-0 w-3/5 md:w-full md:flex h-full p-6 md:p-0 gap-4 bg-white`}
                                initial={{
                                    x: '100%',
                                }}
                                animate={{
                                    x: '0%'
                                }}
                                exit={{
                                    x: '100%'
                                }}
                                transition={{
                                    type: "tween",
                                    duration: width! < 768 ? 0.2 : 0
                                }}
                            >
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
                            </motion.div>
                        </motion.nav>
                    )
                }
            </AnimatePresence>
        </motion.header >
    )
}

export default memo(Header);