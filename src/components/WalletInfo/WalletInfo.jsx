import { useContext } from "react"
import {Web3Context} from "../Web3Context"
import { AiFillInfoCircle } from "react-icons/ai"
import "./WalletInfo.css"

const WalletInfo = () => {

    const {connectedWallet} = useContext(Web3Context)

    return (
        <div className="info">
            {connectedWallet ? (
                <div className="info__conntected">
                    <h3 className="info__conntected__title">Get tokens</h3>
                    <p className="info__connected__info">
                        To start testing on Moonbase Alpha, you can get DEV tokens from the
                        <a href="https://faucet.moonbeam.network/" target="_blank" rel="noreferrer" className="info__connected__link"> Moonbase Alpha Faucet</a>
                    </p>
                </div>
                
            ) : (
                <p className="info__disconnect">
                    <i className="info__icon">
                        <AiFillInfoCircle />
                    </i>
                    Connect your wallet to interact
                </p>
            )}
        </div>
    )
}

export default WalletInfo