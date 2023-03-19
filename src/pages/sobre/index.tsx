import { GetStaticProps } from "next";

import Head from "next/head";
import styles from './styles.module.scss'
import { getPrismicClient } from "../../services/prismic";
import Prismic from '@prismicio/client';
import { RichText } from "prismic-dom";
import { FaYoutube, FaInstagram, FaWhatsapp, FaFacebook} from 'react-icons/fa'

type Content ={
    title: string;
    description: string;
    banner: string;
    facebook: string;
    instagram: string;
    youtube: string;
    whatsapp: string
    
}
interface ContentProps{
    content: Content

}

export default function Sobre({content}  : ContentProps){
    return(
       <>
       <Head>
        <title>Sobre mim: Gislene OLiveira</title>

       </Head>
       <main className={styles.container}>
        <div className={styles.containerHeader}>
            <section className={styles.ctaText}>
                <h1>{content.title}</h1>
                <p>{content.description}</p>

                <a href={content.youtube}>
                    <FaYoutube size={40}/>

                </a>

                <a href={content.instagram}>
                    <FaInstagram size={40}/>

                </a>

                <a href={content.facebook}>
                    <FaFacebook size={40}/>

                </a>

                <a href={content.whatsapp}>
                    <FaWhatsapp size={40}/>

                </a>

            </section>
            <img
            src={content.banner}
            alt="Sobre Gislene"
            
            />
            
        
        </div>

       </main>
       </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
       Prismic.Predicates.at('document.type' ,'about') 
    ]) 

    const {     
        title,
        description,
        banner,
        facebook,
        instagram,
        youtube,
        whatsapp
      

    } = response.results[0].data;

    const content = {
        title: RichText.asText(title),
        description: RichText.asText(description),
        banner: banner.url,
        facebook: facebook.url,
        instagram: instagram.url,
        youtube: youtube.url,
        whatsapp: whatsapp.url
      
    };

   
  return{
    props:{
      content
    },
    revalidate: 60 * 15 //a cada 15 minutos
  }
}
