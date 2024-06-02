'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const { data: session } = useSession();//getting the session data from the browser
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    //This is similar to what we use in useContext for state management and avoid prop drilling

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            // This function is typically used to dynamically display the available sign-in options to users.
            setProviders(response); //Getting the providers and storing in the state
        }
        setUpProviders(); //for calling the function using use Effect

    }, [])
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image 
                    src='assets/images/logo.svg'
                    alt='logo'
                    width={30}
                    height={30}
                    className='object-contain' />
                <p className='logo_text'>Prompt Lab</p>
            </Link>
           

            {/* Desktop navigation */}
            <div className="sm:flex hidden">
                {/* if any user in session display create post and SignOut */}
                {session?.user? (
                    <div className='flex gap-3 md:gap-5'
                    >
                        <Link className='black_btn' href="/create-prompt">
                            Create Post
                        </Link>
                        <button type='button' onClick={signOut} className='outline_btn'>
                            SignOut
                        </button>
                        <Link href='/profile'>
                            <Image src='assets/images/logo.svg' alt='profileimg' height={37} width={37} className='rounded-full'></Image>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* This method returns an array of the values of the enumerable properties of the providers object. For example, if providers is { a: 1, b: 2, c: 3 }, Object.values(providers) would return [1, 2, 3]. */}

                        {/* .In this case for every authentication provider like google,github show a button */}
                        {providers && Object.values(providers).map((provider) => (
                            <button type='button'
                                key={provider.name}
                                onClick={() => {
                                    signIn(provider.id);
                                }}
                                className='black_btn'>
                                    Sign in with {provider.name}
                            </button>
                        ))}
                    </>
                )}
            </div>
               
            <div className="sm:hidden flex relative">
                {session?.user?  (
                    <div className='flex'>
                        <Image
                            src='assets/images/logo.svg'
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown(!toggleDropdown)}
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className='mt-5 w-full black_btn'
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='black_btn'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>

                )}
            </div>
        
      
    </nav>
    )
}

export default Nav;
