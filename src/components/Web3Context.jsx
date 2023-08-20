import PropTypes from 'prop-types'; // Importa PropTypes para solucionar el error de la prop children
import Web3 from 'web3'
import { createContext, useState, useEffect } from 'react'

export const Web3Context = createContext()

export const Web3Provider = ({children}) => {

    const [web3, setWeb3] = useState(null)
    const [provider, setProvider] = useState(null)
    const [connectedWallet, setConnectedWallet] = useState(null)

    useEffect(() => {
        const resp = new Web3("wss://moonbeam-alpha.api.onfinality.io/public-ws");
        resp.eth.net.isListening()
            .then(() => setWeb3(resp))
            .catch(() => setWeb3(null))
    }, [])

    useEffect(() => {
        if(window.ethereum){ 
            setProvider(window.ethereum)
        }
    }, [])

    const updateConnectedWallet = (walletConnected) => {
        setConnectedWallet(walletConnected)
    }

    const contextValue = {
        web3,
        provider,
        updateConnectedWallet,
        connectedWallet
    }

    return (
        <Web3Context.Provider value={contextValue}>
            {children}
        </Web3Context.Provider>
    )
}

// Especifica el tipo de 'children' utilizando PropTypes
Web3Provider.propTypes = {
    children: PropTypes.node.isRequired
};