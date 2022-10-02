import { memo, PropsWithChildren } from "react"
import Header from "../Organisms/Header"

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
        </div>
    )
}

export default memo(Layout);