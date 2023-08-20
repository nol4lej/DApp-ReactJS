import { useContext, useEffect, useState } from "react"
import { Web3Context } from "../Web3Context"
import "./ChainData.css"

const ChainData = () => {
    const { web3 } = useContext(Web3Context)

    const [ chainConnection, setChainConnection ] = useState(false)
    const [ lastBlock, setLastBlock ] = useState("")

    useEffect(() => {
        const newBlockSuscription = async () => {
            (await web3.eth.subscribe('newHeads'))
                .on('data', data => updateLastBlock(data))
        }

        const getLastBlock = async () => {
            try {
                const block = await web3.eth.getBlock('latest')
                updateLastBlock(block)
                newBlockSuscription()
                return
            } catch (error) {
                console.error(error)
            }
        }

        if(web3){
            setChainConnection(true)
            getLastBlock()
        }
    }, [web3])

    const updateLastBlock = (data) => {
        const {number, hash, miner, gasUsed} = data
        const blockData = {
            "Lastest Block": number.toString(),
            "Hash Block": hash,
            "Block Miner": miner,
            "Gas Used": gasUsed.toString()
        }
        setLastBlock(blockData)
    }

    return (
        <section className="chaindata__container">
            {chainConnection ? (
                <div className="chaindata__connected">
                    <div className="chaindata__title">
                        <h2>Connected Moonbase Alpha</h2>
                    </div>
                    <div className="chaindata__content">
                        {    
                            Object.entries(lastBlock).map(([key,value]) => (
                                <div className="chaindata__blockinfo" key={key}>
                                    <p className="chaindata__titleinfo">{key}</p>
                                    <span className="chaindata__result">{value}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <h2>Connecting Chain...</h2>
            )}
        </section>
    )
}

export default ChainData