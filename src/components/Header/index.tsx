import styles from './styles.module.scss'
import Image from 'next/image';
import logo from '../../../public/images/logo.jpeg'
import { ActiveLink } from '../ActiveLink';
import { FaYoutube, FaInstagram, FaWhatsapp, FaFacebook, FaTwitter, FaShoppingCart } from 'react-icons/fa'


export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>


           <div className={styles.logo}>    
            <ActiveLink legacyBehavior href="/" activeClassName={styles.active} >
              
           
                <a>
                    <Image src={logo} alt="Logo" />
                </a> 
                
                

                </ActiveLink>

                </div> 

                <nav>
                    <ActiveLink legacyBehavior href="/" activeClassName={styles.active} >
                        <a>Home</a>
                    </ActiveLink>

                    <ActiveLink legacyBehavior href="/posts" activeClassName={styles.active}>
                        <a>Dicas</a>
                    </ActiveLink>

                    <ActiveLink legacyBehavior href="/ebooks" activeClassName={styles.active}>
                        <a>E-books</a>
                    </ActiveLink>
                   
                    <ActiveLink legacyBehavior href="/sobre" activeClassName={styles.active}>
                        <a>Sobre mim</a>
                    </ActiveLink>

                   

                </nav>
                    <a className={styles.readyButton} type="button" href="https://hotmart.com/pt-br/marketplace/produtos/receitas-de-cafe-da-manha-praticas-e-saudaveis/H76773796C" target="_blank">  Produtos &nbsp;
                    <FaShoppingCart size={25} /></a>
                </div>
        </header>
        
    )
    
}