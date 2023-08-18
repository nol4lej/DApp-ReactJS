// import MetaMaskSDK from "@metamask/sdk";
import { useState, useEffect, useContext } from "react"
import { Web3Context } from "../../utils/Web3Context"

const ConnectWallet = () => {

    const web3 = useContext(Web3Context)

    const [provider, setProvider] = useState(null)
    const [buttonText, setButtonText] = useState("")
    const [walletAddress, setWalletAddress] = useState("")
    const [balance, setBalance] = useState("")

    useEffect(() => {
        if(window.ethereum){ 
            setProvider(window.ethereum)
        }
    }, [])

    const connectWallet = async () => {
        if(!provider){
            window.open("https://metamask.io/download/", "_blank")
            return
        }
        try {
            const resp = await provider.request({method: 'eth_requestAccounts'})
            setWalletAddress(resp[0])
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
            setButtonText("Disconnect")
        } else {
            setButtonText("Connect Wallet")
        }
    }, [walletAddress, provider])

    const disconnectWallet = () => {
        setWalletAddress(null)
        setBalance(null)
        return
    }

    return (
        <section>
            {/* SI WALLET ADDRESS ? WALLET CONTAINER : SINO, CONNECT BUTTON */}
            { walletAddress ? (
                <div className="wallet__container">
                    <div className="wallet__balance__container">
                        <p className="wallet__balance">{balance}</p>
                    </div>
                    <div className="wallet__address__container">
                        <p className="wallet__adress">{walletAddress}</p>
                        <button className="wallet__logout" onClick={disconnectWallet}>{buttonText}</button>
                    </div>
                </div>
            ) : ( <button onClick={connectWallet}>{buttonText}</button> ) }
        </section>
    )
}

export default ConnectWallet