import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import dicas from "../../../public/images/dicas.png"
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

// https://png-pixel.com
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

type Post = {
  slug: string;
  title: string;
  cover: string;
  description: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
  page: string;
  totalPage: string;
}

export default function Posts({

  
  posts: postsBlog,
  page,
  totalPage,
}: PostsProps) {
  const [currentPage, setCurrentPage] = useState(Number(page));

  const [posts, setPosts] = useState(postsBlog || []);

  //Buscar novos posts
  async function reqPost(pageNumber: number) {
    const prismic = getPrismicClient();

    const response = await prismic.query(
      [Prismic.Predicates.at("document.type", "post")],
      {
        orderings: "[document.last_publication_date desc]",
        fetch: ["post.title", "post.description", "post.cover"],
        pageSize: 3,
        page: String(pageNumber),
      }
    );
    return response;
  }

  async function navigatePage(pageNumber: number) {
    const response = await reqPost(pageNumber);

    if (response.results.length === 0) {
      return;
    }

    const getPosts = response.results.map((post) => {
      return {
        slug: post.uid,
        title: RichText.asText(post.data.title),
        description:
          post.data.description.find((content) => content.type === "paragraph")
            ?.text ?? "",

        cover: post.data.cover.url,
        updatedAt: new Date(post.last_publication_date).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ),
      };
    });

    setCurrentPage(pageNumber);
    setPosts(getPosts);
  }


  useEffect(() => {

    if (typeof window !== 'undefined') {
      // O código abaixo será executado apenas no navegador
      import('scrollreveal').then((ScrollRevealModule) => {
        const ScrollReveal = ScrollRevealModule.default || ScrollRevealModule;

        const sr = ScrollReveal({
          duration: 1000,
          reset: false,
          // Outras opções de configuração aqui
        });

        sr.reveal('.animated-item', {
          origin: 'bottom',
          distance: '20px',
          easing: 'ease-in-out',
        });
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title> Gislene Oliveira | Dicas e receitas</title>
      </Head>
      <div>
            <Image
              className={`${styles.dicas} animated-item`}
                src={dicas}
                alt="foto home mobile"
                width={530}
                height={325}
                loading="lazy"
                placeholder="blur"
              />
            </div>
      <div className={styles.containerPost}>    
        <main className={styles.container}>
          
          <div  className={styles.posts}>   

            {posts.map((post) => (
              <Link key={post.slug} legacyBehavior href={`/posts/${post.slug}`}>
                <a key={post.slug}>
                  <Image className=" animated-item"
                    src={post.cover}
                    alt={post.title}
                    width={420}
                    height={282}
                    quality={100}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPceQ4AAkYBiUQ8i/IAAAAASUVORK5CYII="
                  />

                  <strong className=" animated-item">{post.title}</strong>
                  <time className=" animated-item">{post.updatedAt}</time>
                  <p className=" animated-item">{post.description}</p>
                </a>
              </Link>
            ))}
           
          </div>
        </main>

      </div>
       <div  className={styles.buttonNavigate}>  
              {Number(currentPage) >= 2 && (
                <div>
                   {/* <button title="Voltar Tudo" onClick={() => navigatePage(1)}>
                    <FiChevronsLeft size={25} color="#fff" />
              </button>   */}

                  <button className={styles.bvoltar} title="Voltar" onClick={() => navigatePage(Number(currentPage - 1))}>
                    <FaArrowLeft size={40} color="#fff"  />
                  </button>
                </div>
              )}

              {Number(currentPage) < Number(totalPage) && (
                <div>
                  <button title=" Próxima" onClick={() => navigatePage(Number(currentPage + 1))}>
                  <FaArrowRight size={40} color="#fff" />
                  </button>

                { /* <button title="Última" onClick={() => navigatePage(Number(totalPage))}>
                    <FiChevronsRight size={25} color="#fff" />
              </button>  */ }
                </div>
              )}
            </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.Predicates.at("document.type", "post")],
    {
      orderings: "[document.last_publication_date desc]",
      fetch: ["post.title", "post.description", "post.cover"],
      pageSize: 3,
    }
  );

  // console.log(JSON.stringify(response, null,2))
  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description:
        post.data.description.find((content) => content.type === "paragraph")
          ?.text ?? "",

      cover: post.data.cover.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });
  return {
    props: {
      posts,
      page: response.page,
      totalPage: response.total_pages,
    },
    revalidate: 60 * 1, //atualiza a cada 30 minutos
  };
};
