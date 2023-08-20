import { useContext, useEffect, useState } from "react"
import { Web3Context } from "../Web3Context"
import "./ChainData.css"

const ChainData = () => {
    const { web3 } = useContext(Web3Context)

    const [ chainConnection, setChainConnection ] = useState(false)

    useEffect(() => {
        if(web3){
            setChainConnection(true)
        }
    }, [web3])

    return (
        <section className="chaindata__container">
            {chainConnection ? (
                <h2>Connected Moonbase Alpha</h2>
            ) : (
                <h2>Connecting Chain...</h2>
            )}
        </section>
    )
}

export default ChainData