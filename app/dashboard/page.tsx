"use client"
import { Button } from '@/components/ui/button'
import { logout } from '../actions/auth'
import { useRouter } from 'next/navigation';



const DashboardPage = () => {

  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();
    if (res?.success) {
      router.push("/login");
    }
  };
 
  return (
    <div>
      <Button onClick={() => handleLogout()}>logout</Button>
    </div>
  )
}

export default DashboardPage