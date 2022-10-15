import type {NextPage} from 'next'
import Link from "next/link";


const Home: NextPage = () => {
  return (
    <div>
      <Link href={'/tanstack'}>Tanstack Viruall</Link><br/>
      <Link href={'/virtuosu'}>Virtuoso</Link><br/>
      <Link href={'/window'}>React Window</Link><br/>
    </div>
  )
}

export default Home
