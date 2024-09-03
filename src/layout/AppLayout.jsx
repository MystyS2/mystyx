import React, { useState } from 'react';
import logo from '../assets/logo2.jpg';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const searchByKeyword = (event) => {
        event.preventDefault();
        //url 바꿔주기
        navigate(`/movies?q=${keyword}`);
        //비우기
        setKeyword('');
    }
    return (
        <div data-theme="dracula" className='h-fit'>
            <div className="navbar bg-neutral text-white">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to='/movies'>Movies</Link></li>
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl"><img className="max-h-full" src={logo} alt='mystyx logo' /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to='/movies'>Movies</Link></li>
                    </ul>
                </div>
                <div className='navbar-end hidden lg:flex'>
                    <div className="flex-none gap-2">
                        <form className="join flex gap-1" onSubmit={searchByKeyword}>
                            <input type="text" placeholder="Search" value={keyword} onChange={(event) => setKeyword(event.target.value)}
                                className="join-item input input-bordered input-primary w-24 md:w-auto" />
                            <button type='submit' className="join-item btn btn-primary btn-square btn-outline">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                        transform="scale(1.4)" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn navbar-end w-fit lg:hidden absolute right-1" onClick={() => document.getElementById('my_modal_2').showModal()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                            transform="scale(1.4)" />
                    </svg>
                </button>
                <dialog id="my_modal_2" className="modal sm:hidden">
                    <form className="modal-box w-fit h-fit p-2 join flex gap-1 top-0 right-0 absolute" onSubmit={searchByKeyword}>
                        <input type="text" placeholder="Search" value={keyword} onChange={(event) => setKeyword(event.target.value)}
                            className="join-item input input-bordered input-primary w-24 md:w-auto" />
                        <button type='submit' className="join-item btn sm:hidden btn-primary btn-square btn-outline">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                    transform="scale(1.4)" />
                            </svg>
                        </button>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <Outlet />
        </div>

    )
}

export default AppLayout