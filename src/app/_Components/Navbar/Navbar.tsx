'use client';
import Link from "next/link"
import { usePathname } from "next/navigation";
import { MdOutlineFavorite } from "react-icons/md";


const Navbar = () => {
  const pathName = usePathname();
  return (
<div className="navbar bg-[#708871] text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       <li><Link href={'/'} className={`${pathName === '/' ? 'text-[#606676]' : ''}`}>Home</Link></li> 
       <li><Link href={'/search'} className={`${pathName === '/search' ? 'text-[#606676]' : ''}`}>Search</Link></li> 
      </ul>
    </div>
    <Link href='/' className="btn btn-ghost text-xl">StarWars</Link>
  </div>
  <div className="navbar-center hidden lg:flex text-[#FEF3E2]">
    <ul className="menu menu-horizontal px-1 text-xl">
    <li><Link href={'/'} className={`${pathName === '/' ? 'text-[#606676]' : ''}`}>Home</Link></li> 
    <li><Link href={'/search'} className={`${pathName === '/search' ? 'text-[#606676]' : ''}`}>Search</Link></li> 
    </ul>
  </div>
  <div className="navbar-end">
    <Link href={'/favorite'}><MdOutlineFavorite className="text-[#FEF3E2] text-3xl cursor-pointer"/></Link>
    <select className="select select-primary w-full max-w-[200px] outline-none border-none mx-5 bg-[#FEF3E2] text-black">
    <option disabled selected>Select A Language</option>
    <option value={'en'}>English</option>
    <option value={'de'}>Germany</option>
    <option value={'fr'}>French</option>
    <option value={'es'}>Spanish</option>
</select>
  </div>
</div>
  )
}

export default Navbar