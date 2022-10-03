import { memo, PropsWithChildren } from "react"
import Header from "../Organisms/Header"

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Header />
            <main className="min-h-[calc(100vh-10rem)] flex items-center">
                {children}
            </main>
        </div>
    )
}

export default memo(Layout);