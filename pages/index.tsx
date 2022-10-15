import type {NextPage} from 'next'
import Link from "next/link";


const Home: NextPage = () => {
  return (
    <div>
      <Link href={'/tanDemo'}>Tanstack Viruall</Link><br/>
      <Link href={'/virtuDemo'}>Virtuoso</Link><br/>
      <Link href={'/windowDemo'}>React Window</Link><br/>
    </div>
  )
}

export default Home
