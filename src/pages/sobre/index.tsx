import { GetStaticProps } from "next";

import Head from "next/head";
import styles from './styles.module.scss'
import { getPrismicClient } from "../../services/prismic";
import Prismic from '@prismicio/client';
import { RichText } from "prismic-dom";
import { FaYoutube, FaInstagram, FaWhatsapp, FaFacebook,FaTwitter } from 'react-icons/fa'

type Content ={
    title: string;
    description: string;
    title2:string;
    text2about:string;
    banner: string;
    facebook: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
    twitter:string;
    
}
interface ContentProps{
    content: Content

}

export default function Sobre({content}  : ContentProps){
    return(
       <>

    <div className={styles.sobremim}><Head>
        <title>Gislene OLiveira | Sobre mim</title>

       </Head>
       <main className={styles.container}>
        <div className={styles.containerHeader}>
            <section className={styles.ctaText}>
                <h1>{content.title}</h1>
                <p>{content.description}</p>
                
                <h2>{content.title2}</h2>
                <p>{content.text2about}</p>
        <div className={styles.icones}>   <a href={content.youtube} target="_blank">
                    <FaYoutube size={40}/>

                </a>

                <a href={content.instagram} target="_blank">
                    <FaInstagram size={40}/>

                </a>

                <a href={content.facebook} target="_blank">
                    <FaFacebook size={40}/>

                </a>

                <a href={content.whatsapp} target="_blank">
                    <FaWhatsapp size={40}/>

                </a>

                <a href={content.twitter} target="_blank">
                    <FaTwitter size={40}/>
                </a>
</div>
             
            </section>
            <img
            src={content.banner}
            alt="Sobre Gislene"
            
            />
            
        
        </div>

       </main></div>
       
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
        title2,
        text2about,
        banner,
        facebook,
        instagram,
        youtube,
        whatsapp,
        twitter
      

    } = response.results[0].data;

    const content = {
        title: RichText.asText(title),
        description: RichText.asText(description),
        title2: RichText.asText(title2),
        text2about: RichText.asText(text2about),
        banner: banner.url,
        facebook: facebook.url,
        instagram: instagram.url,
        youtube: youtube.url,
        whatsapp: whatsapp.url,
        twitter: twitter.url,
      
    };

   
  return{
    props:{
      content
    },
    revalidate: 60 * 1 //a cada 15 minutos
  }
}
