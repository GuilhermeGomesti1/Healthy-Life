import { GetServerSideProps } from 'next';
import styles from './post.module.scss';
import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'

import Head from 'next/head';
import Image from 'next/image';

interface EbookProps{
    ebook: {
        slug: string,
        titlebook:string,
        descriptionbook:string,
        coverbook:string,
        updatedAt:string,
    }
}

export default function Ebook({ebook}: EbookProps ){

      return(
        <>
         <Head> 
                <title>{ebook.titlebook}</title>
         </Head>
         <div className={styles.allpage}>
         <main className={styles.container}>
            <article className={styles.post}>
                <Image
                quality={100}
                src={ebook.coverbook} 
                width={720}
                height={410}
                alt={ebook.titlebook}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPceQ4AAkYBiUQ8i/IAAAAASUVORK5CYII="/>

                <h1>{ebook.titlebook}</h1>
                <time>{ebook.updatedAt}</time>
                <div className={styles.postContent} dangerouslySetInnerHTML={{ __html:ebook.descriptionbook}}></div>

            </article>
           



         </main>
         </div>
        </>
      
        
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => { 
    
    const { slug } = params;    
    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('ebook', String(slug), {});

    if(!response){
        return{
            redirect:{
                destination:'/ebooks',
                permanent:false
            }
        } 
    }

    const ebook = {
        slug: slug,
        titlebook: RichText.asText(response.data.titlebook),
        descriptionbook: RichText.asHtml(response.data.descriptionbook),
        coverbook: response.data.coverbook.url,
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
     }



    return{
        props:{
            ebook
        }
    }
}