import React from "react";
import Link from "next/link";
import styles from '@styles/Menu.module.scss';
import { signIn, signOut, useSession } from "next-auth/react";

const MenuUser = () => {

    const { data: session } = useSession();

    if(session == null){
        return (
            <div className={styles.MenuUser}>
                <ul>
                    <li onClick={()=> signIn()}>Sign In</li>
                    <li><Link href="/register">Register</Link></li>    
                </ul>
            </div>
        );
    } else {
        return (
            <div className={styles.MenuUser}>
                <ul>
                    <li onClick={()=> signOut()}>Sing Out</li>
                </ul>
            </div>
        );
    }

    /*
    return (
        <div className={styles.MenuUser}>
            <ul>
                <li><Link href="/login">Sign In</Link></li>
                <li><Link href="">Sing Out</Link></li>
                <li><Link href="/register">Register</Link></li>
                
            </ul>
        </div>
    );
    */
}

export default MenuUser;