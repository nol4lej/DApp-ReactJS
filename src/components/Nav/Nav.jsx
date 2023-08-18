import ConnectWallet from "../ConnectWallet/ConnectWallet"
import "./nav.css"

const Nav = () => {
    return(
        <nav className="nav">
            <div className="nav__logo__container">
                Logo
            </div>
            <div className="nav__connect__container">
                <ConnectWallet />
            </div>
        </nav>
    )
}

export default Nav