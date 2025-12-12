import { Link, NavLink } from 'react-router-dom';
// import { Fragment } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../../src/assets/babu.png';
import image from '../../src/assets/zahid.jpg'
import './Navbar.css';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/about', current: false },
  { name: 'Projects', href: '/project', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {

  return (
    <Disclosure as="nav" className="navbar bg-gray-800/[.06]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-3">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <Link to="/" className="flex-shrink-0 flex items-center justify-start">
                <img
                  className="h-8 w-auto hover:opacity-75 transition-opacity"
                  src={Logo}
                  alt="My Company"
                />
              </Link>

              <div className="hidden sm:flex sm:ml-6">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      // activeClassName="active"
                      className={classNames(
                        'text-gray-300 rounded-md px-3 py-2 text-sm font-medium',
                        'transition-colors hover:text-green-400'
                      )}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>

                <Menu as="div" className="relative ml-3">
                  <div>

                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">

                      <Link to="/profile">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-9 w-9 rounded-full"
                          src={image}
                          alt="Zahid"
                        />
                      </Link>

                    </Menu.Button>
                  </div>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
              <div className="bg-#272727 w-full h-full max-w-md rounded-lg shadow-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  {/* Logo */}
                  <div className="flex items-center">
                    {/* <img src={Logo} alt="Logo" className="h-8 w-auto mr-2" /> */}
                    <Link to="/profile">
                      <img
                        className="h-9 w-9 rounded-full"
                        src={image}
                        alt="Zahid"
                      />
                    </Link>

                  </div>
                  {/* Close button */}
                  <Disclosure.Button className="text-gray-1500 hover:text-gray-700 focus:outline-none">
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    <span className="sr-only">Close menu</span>
                  </Disclosure.Button>
                </div>

                <div className="sm:hidden flex flex-col mt-60 text-center">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      // activeClassName="active"
                      className={classNames(
                        'text-gray-300 rounded-md px-3 py-2 text-3xl font-medium',
                        'hover:text-green-400'
                      )}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )
      }
    </Disclosure>
  );
}







