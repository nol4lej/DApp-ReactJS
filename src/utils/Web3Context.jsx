import PropTypes from 'prop-types'; // Importa PropTypes para solucionar el error de la prop children
import Web3 from 'web3'
import { createContext, useState, useEffect } from 'react'

export const Web3Context = createContext()

export const Web3Provider = ({children}) => {

    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        const resp = new Web3("wss://moonbeam-alpha.api.onfinality.io/public-ws");
        setWeb3(resp)
    }, [])

    return (
        <Web3Context.Provider value={web3}>
            {children}
        </Web3Context.Provider>
    )
}

// Especifica el tipo de 'children' utilizando PropTypes
Web3Provider.propTypes = {
    children: PropTypes.node.isRequired
};