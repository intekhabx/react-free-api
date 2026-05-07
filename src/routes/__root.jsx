import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { useEffect, useState } from 'react'


const RootLayout = () => {
  return (
  <>
    <div className="p-4 flex gap-4 text-white ">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/ecommerce" className="[&.active]:font-bold">
        eCommerce
      </Link>
      <Link to="/youtube" className="[&.active]:font-bold"> Youtube</Link>
      <Link to="/randomUsers" className="[&.active]:font-bold"> Random-Users</Link>
    </div>
    <hr />
    <Outlet />
  </>
)}

export const Route = createRootRoute({ component: RootLayout })