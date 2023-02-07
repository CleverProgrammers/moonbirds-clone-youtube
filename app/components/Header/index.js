import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import Modal from 'react-modal'
import { useAppContext } from '../../context/context'
import { classNames } from '../../utils/classNames'
import { modalStyles } from '../../lib/ModalStyles'
import Logo from './Logo'
import { MintModal } from '../index'

Modal.setAppElement('#__next')

const styles = {
  wrapper: 'flex items-center space-x-10',
  container: 'flex flex-1 justify-between',
  navBar: 'flex items-center space-x-2',
  navItem:
    'cursor-pointer hover:text-[#1D1D1D] hover:bg-[#F2F2F2] transition duration-300 rounded-md px-4 py-2',
  menuBox: 'relative inline-block text-left',
  menuButton:
    'flex items-center rounded-full  text-white hover:text-gray-200 focus:outline-none',
  menuIcon: 'h-5 w-5',
  menuItems:
    'absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
  menuItemsContainer: 'py-1',
  menuItem: 'block w-full px-4 py-2 text-left text-sm',
  buttonActive: 'bg-gray-100 text-gray-900',
  buttonInactive: 'text-gray-700',
}

const transitions = {
  menuEnter: 'transition ease-out duration-100',
  menuEnterFrom: 'transform opacity-0 scale-95',
  menuEnterTo: 'transform opacity-100 scale-100',
  menuLeave: 'transition ease-in duration-75',
  menuLeaveFrom: 'transform opacity-100 scale-100',
  menuLeaveTo: 'transform opacity-0 scale-95',
}

const Header = ({ isAdmin, inAllowlist, joinAllowlist, downloadAllowlist }) => {
  const router = useRouter()
  const { disconnectWalletHandler, getUris } = useAppContext()

  return (
    <header className={styles.wrapper}>
      <Logo />

      <div className={styles.container}>
        <ul className={styles.navBar}>
          <li className={styles.navItem}>Products</li>
          <li className={styles.navItem}>Marketplace</li>
          <li className={styles.navItem}>Gallery</li>
          <Link href='/?mint=1'>
            <li className={styles.navItem}>Mint</li>
          </Link>
          <div className={styles.navItem} onClick={getUris}>
            Get URIs
          </div>
        </ul>

        <Menu as='div' className={styles.menuBox}>
          <div>
            <Menu.Button className={styles.menuButton}>
              <MenuIcon className={styles.menuIcon} />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter={transitions.menuEnter}
            enterFrom={transitions.menuEnterFrom}
            enterTo={transitions.menuEnterTo}
            leave={transitions.menuLeave}
            leaveFrom={transitions.leaveFrom}
            leaveTo={transitions.menuLeaveTo}
          >
            <Menu.Items className={styles.menuItems}>
              <div className={styles.menuItemsContainer}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={disconnectWalletHandler}
                      className={classNames(
                        active ? styles.buttonActive : styles.buttonInactive,
                        styles.menuItem,
                      )}
                    >
                      Disconnect
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <Modal
        isOpen={!!router.query.mint}
        onRequestClose={() => router.push('/')}
        style={modalStyles}
      >
        <MintModal />
      </Modal>
    </header>
  )
}

export default Header
