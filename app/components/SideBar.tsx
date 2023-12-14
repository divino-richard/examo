import Link from 'next/link'
import React from 'react'

function SideBar() {
    const navItems = [
        {
            name: 'Dashboard',
            link: '/',
        },
        {
            name: 'Courses',
            link: '/course',
        },
    ];
    return (
        <div className='bg-white h-screen w-60 p-5'>
            <div className='mb-5'> 
                <Link href='/'>
                    <h1 className='text-blue-700 font-bold text-lg text'>Examo</h1>
                </Link>
            </div>
            <ul>
                {navItems.map(navItem => (
                    <Link key={navItem.link} href={navItem.link}>
                        <li className='text-zinc-500 hover:text-blue-700'>{navItem.name}</li>
                    </Link>
                ))}
            </ul>
        </div>        
    )
}

export default SideBar
