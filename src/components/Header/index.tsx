import styles from './styles.module.scss'
import Image from 'next/image';
import logo from '../../../public/images/logo.jpeg'
import { ActiveLink } from '../ActiveLink';



export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                
            <ActiveLink legacyBehavior href="/" activeClassName={styles.active} >
                
                <a>
                    <Image src={logo} alt="Logo" />
                </a>

                </ActiveLink>

                <nav>
                    <ActiveLink legacyBehavior href="/" activeClassName={styles.active} >
                        <a>Home</a>
                    </ActiveLink>

                    <ActiveLink legacyBehavior href="/posts" activeClassName={styles.active}>
                        <a>Conteúdos</a>
                    </ActiveLink>
                   
                    <ActiveLink legacyBehavior href="/sobre" activeClassName={styles.active}>
                        <a>Sobre mim</a>
                    </ActiveLink>

                </nav>
                    <a className={styles.readyButton} type="button" href="https://sujeitoprogramador.com">Começar</a>
                </div>
        </header>
        
    )
    
}