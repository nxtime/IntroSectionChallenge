import { useLayoutEffect, useState } from 'react'
import Layout from './components/Templates/Layout'
import { motion } from 'framer-motion';

function App() {
    const [width, setWidth] = useState<number | null>(null);

    useLayoutEffect(() => {
        const updateSize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    return (
        <Layout>
            <div className="flex flex-col-reverse md:flex-row max-w-[70rem] mx-auto md:px-8">
                <motion.div
                    className={`w-full h-auto justify-center flex flex-col gap-4 md:gap-12 ${width! < 768 ? 'z-[-1]' : 'z-[-1]'}`}
                    initial={{
                        x: '-100%',
                        opacity: 0,
                    }}
                    animate={{
                        x: '0%',
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.3
                    }}
                >
                    <h1 className="text-center md:text-start text-4xl md:text-[4rem] leading-[3rem] font-bold">Make {width! > 768 && <br />} remote work</h1>
                    <p className="text-center mx-auto md:m-0 max-w-sm md:text-justify">
                        Get your team in sync, no matter your location. Streamline processes,
                        create team rituals, and watch productivity soar.
                    </p>
                    <button
                        className="py-3 px-5 font-bold bg-black text-white self-center md:self-start rounded-xl transition-all drop-shadow hover:drop-shadow-xl "
                    >
                        Learn more
                    </button>
                    <div className="mt-8 md:m-0 flex gap-4 [&>*]:w-20 [&>*]:self-center max-w-screen overflow-hidden justify-evenly">
                        <img src="/images/client-databiz.svg" alt="Client Databiz" />
                        <img src="/images/client-audiophile.svg" alt="Client AudioPhile" />
                        <img src="/images/client-meet.svg" alt="Client Meet" />
                        <img src="/images/client-maker.svg" alt="Client Maker" />
                    </div>
                </motion.div>
                <motion.img
                    className="mb-8 md:w-1/2 max-h-[calc(100vh-10rem)] z-[-1] md:z-0"
                    src={width! < 768 ? "/images/image-hero-mobile.png" : "/images/image-hero-desktop.png"}
                    alt="Hero Image of a guy holding a laptop"
                    initial={{
                        x: '100%',
                        opacity: 0,
                    }}
                    animate={{
                        x: '0%',
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.6
                    }}
                />
            </div>
        </Layout>
    )
}

export default App
