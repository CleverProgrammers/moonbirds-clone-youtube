import Head from 'next/head'
import { Header, NFTDisplay, Hero, Login } from '../components'
import { useAppContext } from '../context/context'

const Home = () => {
  const { currentWalletAddress } = useAppContext()

  const styles = {
    wrapper: 'flex h-[100vh] w-[100vw] bg-[#1d1d1d] text-gray-200',
    container:
      'flex flex-col lg:flex-row flex-1 p-5 pb-20 lg:p-10 space-y-10 lg:space-y-0',
    infoSection: 'lg:w-2/3 px-10',
    mobileDisplaySection: 'h-[300px] flex w-full lg:hidden lg:w-1/3 mt-4',
    desktopDisplaySection: 'hidden lg:flex flex-1 lg:w-1/3',
  }

  if (currentWalletAddress === '') {
    return <Login />
  } else {
    return (
      <div className={styles.wrapper}>
        <Head>
          <title>Home | Moonbirds NFT</title>
        </Head>

        <div className={styles.container}>
          <section className={styles.infoSection}>
            <Header />
            <div className={styles.mobileDisplaySection}>
              <NFTDisplay />
            </div>

            <Hero />
          </section>

          <section className={styles.desktopDisplaySection}>
            <NFTDisplay />
          </section>
        </div>
      </div>
    )
  }
}
export default Home
