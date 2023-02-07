import Image from 'next/image'
import { useAppContext } from '../../context/context'

const styles = {
  wrapper:
    'bg-animate flex-1 rounded-3xl flex lg:flex-col items-center relative absolute inset-0 flex snap-x items-center gap-4 overflow-x-scroll px-[1rem] py-[1rem]',
  imageContainer:
    'relative h-[200px] w-[200px] flex-shrink-0 snap-center lg:h-[400px] lg:w-[400px]',
  nftImage: `rounded-[1rem] object-cover`,
}

const NFTDisplay = () => {
  const { nftData } = useAppContext()

  const nfts = ['/3574.png', '/4697.png', '/5344.png', '/8294.png', '/8976.png']

  return (
    <div className={styles.wrapper}>
      {nftData.map((nft, index) => (
        <div key={index} className={styles.imageContainer}>
          <Image className={styles.nftImage} src={nft.image} layout='fill' />
        </div>
      ))}
    </div>
  )
}

export default NFTDisplay
