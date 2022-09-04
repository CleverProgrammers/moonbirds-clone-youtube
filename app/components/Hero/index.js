import Link from 'next/link'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import { useAppContext } from '../../context/context'
import { modalStyles } from '../../lib/ModalStyles'
import { MintModal } from '../index'

Modal.setAppElement('#__next')

const styles = {
  wrapper: 'flex w-full items-center justify-center pt-16 lg:pt-20',
  container: 'space-y-10',
  heroTitle: 'xl:pr-40 text-6xl font-bold',
  heroParagraph: 'xl:pr-40',
  heroCta: 'flex items-center space-x-10',
  mintButton:
    'rounded-xl border border-gray-100 bg-transparent px-8 py-4 font-semibold text-gray-100 transition-all hover:bg-gray-100 hover:text-[#1d1d1d]',
}

const Hero = () => {
  const { nftData } = useAppContext()
  const router = useRouter()

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>Moonbirds</h1>
        <p className={styles.heroParagraph}>
          A collection of 10,000 utility-enabled PFPs that feature a richly
          diverse and unique pool of rarity-powered traits. What's more, each
          Moonbird unlocks private club membership and additional benefits the
          longer you hold them. We call it nesting – because, obviously.
        </p>
        <div className={styles.heroCta}>
          <Link href='/?mint=1'>
            <button className={styles.mintButton}>Mint Your NFT 0.1 ETH</button>
          </Link>
          {!!nftData.length && <p>{nftData.length} minted already</p>}
        </div>
      </div>
      <Modal
        isOpen={!!router.query.mint}
        onRequestClose={() => router.push('/')}
        style={modalStyles}
      >
        <MintModal />
      </Modal>
    </main>
  )
}

export default Hero
