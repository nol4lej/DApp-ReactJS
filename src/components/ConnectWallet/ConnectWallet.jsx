// import MetaMaskSDK from "@metamask/sdk";
import { useState, useEffect, useContext } from "react"
import { Web3Context } from "../Web3Context"
import "./ConnectWallet.css"
import { CgCloseR } from "react-icons/cg"
import { BiSolidWallet } from "react-icons/bi"
import MetaMaskIcon from "../../../public/metamask.png"

const ConnectWallet = () => {

    const { web3, provider, updateConnectedWallet } = useContext(Web3Context)

    const [buttonText, setButtonText] = useState("")
    const [walletAddress, setWalletAddress] = useState("")
    const [balance, setBalance] = useState("")

    const connectWallet = async () => {
        if(!provider){
            window.open("https://metamask.io/download/", "_blank")
            return
        }
        try {
            const resp = await provider.request({method: 'eth_requestAccounts'})
            setWalletAddress(resp[0])
            updateConnectedWallet(resp[0]) // acutalizo la wallet en el Web3Context
        } catch (error) {
            console.error(error.message)
        }
    }

    // reaciona al cambio de walletAddress y actualiza el balance de la wallet actual
    useEffect(() => {
        const getBalanceAccount = async (address) => {
            try {
                const res = await web3.eth.getBalance(address)
                const balance_legible = web3.utils.fromWei(res, 'ether'); //Conversion del resultado hexadecimal a numero entero y aplicar el factor de conversion (wei a ether). El resultado es de tipo string.
                const balance_float = parseFloat(balance_legible);
                const balanceFixed = balance_float.toFixed(4)
                setBalance(balanceFixed)
            } catch (error) {
                console.error('Error fetching balance:', error);
                return 'N/A';
            }
        }

        if(walletAddress){
            getBalanceAccount(walletAddress)
        }

    }, [walletAddress, web3])
    
    // reacciona a los cambios de wallets y actualiza el estado de wallet actual.
    useEffect(() => {
        if(provider){
            provider.on('accountsChanged', (acc) => {
                setWalletAddress(acc[0])
            });
        }
    }, [provider])

    useEffect(() => {
        if(!provider){
            setButtonText("Install MetaMask")
        } else if (walletAddress){
            setButtonText(<CgCloseR />)
        } else {
            setButtonText("Connect Wallet")
        }
    }, [walletAddress, provider])

    const disconnectWallet = () => {
        setWalletAddress(null)
        setBalance(null)
        updateConnectedWallet(null) // acutalizo la wallet en el Web3Context
        return
    }

    return (
        <section>
            {/* SI WALLET ADDRESS ? WALLET CONTAINER : SINO, CONNECT BUTTON */}
            { walletAddress ? (
                <div className="wallet__container">
                    <div className="wallet__balance__container">
                        <p className="wallet__balance">{balance} DEV</p>
                        <i className="wallet__balance__icon"><BiSolidWallet /></i>
                    </div>
                    <div className="wallet__address__container">
                        <p className="wallet__adress">{walletAddress.slice(0,6)+"..."+walletAddress.slice(0,4)}</p>
                        <button className="wallet__logout" onClick={disconnectWallet}>{buttonText}</button>
                    </div>
                </div>
            ) : ( <button className="wallet__connect" onClick={connectWallet}><img src={MetaMaskIcon} className="metamask__icon"></img>{buttonText}</button> ) }
        </section>
    )
}

export default ConnectWallet