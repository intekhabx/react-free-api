import { createFileRoute } from '@tanstack/react-router'
import { GetMyProfile } from '../components/Ecommerce/GetMyProfile'
import UpdateMyProfile from '../components/Ecommerce/UpdateMyProfile'

export const Route = createFileRoute('/eCommerce')({
  component: eCommerce,
})

function eCommerce() {
  return <div className="p-2">
    <GetMyProfile />
    <UpdateMyProfile />
  </div>
}