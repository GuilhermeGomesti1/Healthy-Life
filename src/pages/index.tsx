import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FaYoutube, FaInstagram, FaWhatsapp, FaFacebook, FaTwitter, FaShoppingCart } from 'react-icons/fa'
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
  title2gi1: string,
  bloco2title: string;
  bloco2content: string;
  bloco2banner: string;
  bloco3banner: string;
  bloco3: string;
  bloco3content: string;
  bloco4banner: string;
  bloco4: string;
  bloco4content: string;
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
        <title>Gislene Oliveira | Home </title>
      </Head>

      <main className={styles.container}>





        <div className={styles.area1}>
          <div className={styles.containerHeader}>

            <section className={styles.ctaText}>
              <h1>{content.title}</h1>
              <br />
              <span > {content.
                titleContent}  </span>

              <h2>{content.title2gi1}</h2>


              <ActiveLink legacyBehavior href="/sobre" activeClassName='sobre' >
                <a href="/sobre">
                  <br />
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

          <div className={styles.ebooks}>
            <div className={styles.ebookscontent}>

              <img src={content.bloco3banner} alt="Conteudo " />





              <section>
                <h2>
                  {content.bloco3}
                </h2>
                <span>
                  {content.bloco3content}
                </span>

                <ActiveLink legacyBehavior href="/ebooks" activeClassName='ebooks' >
                  <a href="/ebooks">
                    <button>
                      Ver tudo
                    </button>
                  </a>
                </ActiveLink>
              </section>
            </div>
          </div>

        </div>


     

        <div className={styles.area4}>
          <div className={styles.nextLevelContent}>
            <h2>

              "Honre sua <span className='styles.alunos'> saúde </span> com uma nutrição gentil." </h2>

            <div className={styles.imagelinks}>









              <a href="https://www.youtube.com/@nutravia_terra8284" target="_blank">
                <FaYoutube size={40} />

              </a>

              <a href="https://www.instagram.com/gislenejm/?igshid=YmMyMTA2M2Y=" target="_blank">
                <FaInstagram size={40} />

              </a>

              <a href="https://www.facebook.com/gislene.oliveira.7712" target="_blank">
                <FaFacebook size={40} />

              </a>

              <a href="https://api.whatsapp.com/send/?phone=5531984091588&text=Contato&type=phone_number&app_absent=0" target="_blank">
                <FaWhatsapp size={40} />

              </a>

              <a href="https://twitter.com/gislenejm?s=11" target="_blank">
                <FaTwitter size={40} />
              </a>

              <a href="https://hotmart.com/pt-br/marketplace/produtos/receitas-de-cafe-da-manha-praticas-e-saudaveis/H76773796C" target="_blank">
                <FaShoppingCart size={40} />
              </a>
               
              

            </div>






        



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
    title, sub_title, link_action, imagetop, title2gi1, bloco2, bloco2content, bloco_2_baner, bloco3banner, bloco_3, bloco3content, footer
  } = response.results[0].data;

  const content = {

    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    imagetop: imagetop.url,
    title2gi1: RichText.asText(title2gi1),
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


