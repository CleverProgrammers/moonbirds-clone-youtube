import { createContext, useState, useContext, useEffect } from 'react'
import Web3 from 'web3'
import moonBirdsContract from '../utils/moonBirdsContract'

let ethereum = null

if (typeof window !== 'undefined') {
  ethereum = window.ethereum
}

export const appContext = createContext()

export const AppProvider = ({ children }) => {
  const [web3Instance, setWeb3Instance] = useState()
  const [currentWalletAddress, setCurrentWalletAddress] = useState('')
  const [moonBirdsContractInstance, setMoonBirdsContractInstance] = useState()
  const [nftData, setNftData] = useState([])

  useEffect(() => {
    if (!moonBirdsContractInstance) return
    getUris()
  }, [moonBirdsContractInstance])

  const getUris = async () => {
    setNftData([])
    const URIs = await moonBirdsContractInstance.methods.getNftUris().call()
    console.log(URIs, '🔥')
    URIs.map(async uri => {
      const res = await fetch(`http://ipfs.io/ipfs/${uri}`)
      const data = await res.json()
      console.log(data)
      setNftData(prevState => [...prevState, data])
    })
  }

  const mintNft = async ipfsUri => {
    const mintRes = await moonBirdsContractInstance.methods
      .safeMint(ipfsUri)
      .send({
        from: currentWalletAddress,
        value: web3Instance.utils.toWei('0.0101', 'ether'),
        gas: 300000,
        gasPrice: null,
      })

    getUris()
  }

  const connectWalletHandler = async () => {
    if (!(typeof window === 'undefined' || typeof ethereum === 'undefined')) {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' })

        const web3 = new Web3(window.ethereum)
        setWeb3Instance(web3)

        const accounts = await web3.eth.getAccounts()
        setCurrentWalletAddress(accounts[0])

        setMoonBirdsContractInstance(moonBirdsContract(web3))

        ethereum.on('accountsChanged', async () => {
          setCurrentWalletAddress(accounts[0])
        })
      } catch (error) {
        console.error(error.message)
      }
    } else {
      alert('Please install MetaMask')
    }
  }

  const disconnectWalletHandler = () => {
    setCurrentWalletAddress('')
    setMoonBirdsContractInstance(null)
    setWeb3Instance(null)
  }

  return (
    <appContext.Provider
      value={{
        connectWalletHandler,
        disconnectWalletHandler,
        currentWalletAddress,
        mintNft,
        getUris,
        nftData,
      }}
    >
      {children}
    </appContext.Provider>
  )
}

export const useAppContext = () => useContext(appContext)
