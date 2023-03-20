import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/home.module.scss';
import { ActiveLink } from '../components/ActiveLink';
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

type Content = {

  title: string;
  titleContent: string;
  linkAction: string;
  imagetop: string,
  bloco2title: string;
  bloco2content: string;
  bloco2banner: string;
  bloco3banner: string;
  bloco3: string;
  bloco3content: string;
  footer: string;

}

interface ContentProps {
  content: Content
}
export default function Home({ content }: ContentProps) {
  //console.log(content)
  ; return (
    <>
      <Head>
        <title>Vida saudável</title>
      </Head>

      <main className={styles.container}>
        
        <div className={styles.apresentacao}>
        <Image src={""} alt="fotologo" />
        </div>

        
        
        <div className={styles.area1}>
          <div className={styles.containerHeader}>

            <section className={styles.ctaText}>
              <h1>{content.title}</h1>
              <span > {content.titleContent}  </span>
             
             
              <ActiveLink legacyBehavior href="/sobre" activeClassName='sobre' >
                <a href="/sobre">
                  <button>
                    Sobre mim
                  </button>
                </a>
              </ActiveLink>


            </section>

            <img src={content.imagetop} alt='Conteúdos' />

          </div>



        </div>

        <div className={styles.area2}>
          <div className={styles.sectionContent}>


            <section>
              <h2>
                {content.bloco2title}
              </h2>
              <span>
                {content.bloco2content}
              </span> <br></br>
              <ActiveLink legacyBehavior href="/posts" activeClassName='posts' >
                <a href="/posts">
                  <button>
                    Confira aqui!
                  </button>
                </a>
              </ActiveLink>
            </section>

            
            
            <ActiveLink legacyBehavior href="/posts" activeClassName='' >
              
            <a href="/posts">
              <img src={content.bloco2banner} alt="Conteudo " />
            </a>
            
            </ActiveLink>
           


          </div>
          
        </div>


        <div className={styles.area3}>


          <div className={styles.sectionContent}>
          
          
            <img src={content.bloco3banner} alt="Conteudo " />




            <section>
              <h2>
                {content.bloco3}
              </h2>
              <span>
                {content.bloco3content}
              </span>
            </section>


          </div>
        </div>


        <div className={styles.area4}>
          <div className={styles.nextLevelContent}>
            <img src={content.footer} alt="tecnologias" />
            <h2>
              Mais de <span className='styles.alunos'>15 mil</span> ja levaram sua carreira ao proxímo nivel</h2>
            <span>
              E você vai perder a chande de ser saudavel de uma vez por todas?
            </span>
            <a href={content.linkAction}>
              <button>Conhecer agora!</button>
            </a>




          </div>

        </div>

      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])
  //console.log(response.results[0].data);

  const {
    title, sub_title, link_action, imagetop, bloco2, bloco2content, bloco_2_baner, bloco3banner, bloco_3, bloco3content, footer
  } = response.results[0].data;

  const content = {

    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    imagetop: imagetop.url,
    linkAction: link_action.url,
    bloco2title: RichText.asText(bloco2),
    bloco2content: RichText.asText(bloco2content),
    bloco2banner: bloco_2_baner.url,
    bloco3banner: bloco3banner.url,
    bloco3: RichText.asText(bloco_3),
    bloco3content: RichText.asText(bloco3content),

    footer: footer.url


  };
  return {
    props: {
      content
    },
    revalidate: 60 * 2 // a cada 2 minutos
  }
}


