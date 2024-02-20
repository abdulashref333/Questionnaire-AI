import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div>
        Hello, World
      </div>
      <ul>
        <li><Link href={'/users'}>Users</Link></li>
      </ul>
    </main>
  )
}
