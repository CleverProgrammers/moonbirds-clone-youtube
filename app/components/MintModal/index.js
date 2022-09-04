import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAppContext } from '../../context/context'

const styles = {
  wrapper: `bg-[#212121] text-white flex flex-col p-[1.4rem] h-[20rem] w-[26rem] rounded-[1rem]`,
  title: `text-2xl font-bold mb-[2.4rem]`,
  description: `text-sm`,
  input: `w-full h-[2.4rem] rounded-[0.5rem] p-[1rem] my-[2rem] text-[#fff] outline-none border-none`,
  button: `rounded-[0.5rem] border border-gray-100 bg-transparent px-8 py-3 font-semibold text-gray-100 transition-all hover:bg-gray-100 hover:text-[#1d1d1d]`,
}

const index = () => {
  const [ipfsUri, setIpfsUri] = useState('')
  const { mintNft } = useAppContext()
  const router = useRouter()

  const handleMintClick = async () => {
    if (!ipfsUri) return

    await mintNft(ipfsUri)

    setIpfsUri('')
    router.push('/')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Mint your MoonBird NFT</div>

      <div className={styles.description}>
        Paste your pinned IPFS NFT Metadata URI:
      </div>
      <input
        className={styles.input}
        value={ipfsUri}
        onChange={event => setIpfsUri(event.target.value)}
      />
      <button className={styles.button}  onClick={handleMintClick}>Mint my NFT</button>
    </div>
  )
}
export default index
