import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';


import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

// https://png-pixel.com
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight, FaCartArrowDown } from 'react-icons/fi';

type Ebook = {
    slug: string,
    titlebook: string,
    coverbook: string,
    descriptionbook: string,
    updatedAt: string,
}

interface EbooksProps {
    ebooks: Ebook[];
    page: string;
    totalPage: string
}

export default function Ebooks({ ebooks: ebooksBlog, page, totalPage }: EbooksProps) {

    const [currentPage, setCurrentPage] = useState(Number(page));

    const [ebooks, setEbooks] = useState(ebooksBlog || []);


    //Buscar novos posts
    async function reqEbook(pageNumber: number) {
        const prismic = getPrismicClient();

        const response = await prismic.query([
            Prismic.Predicates.at('document.type', 'ebook')
        ], {
            orderings: '[document.last_publication_date desc]',
            fetch: ['ebook.titlebook', 'ebook.descriptionbook', 'ebook.coverbook'],
            pageSize: 3,
            page: String(pageNumber)
        })
        return response;
    }

    async function navigatePage(pageNumber: number) {
        const response = await reqEbook(pageNumber);

        if (response.results.length === 0) {
            return;
        }

        const getEbooks = response.results.map(ebook => {
            return {

                slug: ebook.uid,
                titlebook: RichText.asText(ebook.data.titlebook),
                descriptionbook: ebook.data.descriptionbook.find(content => content.type === 'paragraph')?.text ?? '',

                coverbook: ebook.data.coverbook.url,
                updatedAt: new Date(ebook.last_publication_date).toLocaleDateString('pt-BR', {
                    day: "2-digit",
                    month: 'long',
                    year: 'numeric'
                })


            }
        })

        setCurrentPage(pageNumber)
        setEbooks(getEbooks);
    }

    return (
        <>
            <Head>
                <title> Blog Vida saudável</title>
            </Head>
            <div className={styles.containerPost}>   <main className={styles.container}>
                <div className={styles.posts}>
                    {ebooks.map(ebook => (<Link key={ebook.slug} legacyBehavior href={`/ebooks/${ebook.slug}`}>

                        <a key={ebook.slug}>

                            <div className={styles.imgbook}>
                                <Image src={ebook.coverbook} alt={ebook.titlebook}
                                    width={720}
                                    height={410}
                                    quality={100}
                                    placeholder="blur"
                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPceQ4AAkYBiUQ8i/IAAAAASUVORK5CYII="
                                />
                            </div>
                            <div className={styles.textbook}> <strong>{ebook.titlebook}</strong>

                                <p>{ebook.descriptionbook}
                                </p>
                                <time>{ebook.updatedAt}</time>
                            </div>
                        </a>

                    </Link>))}
                    <div className={styles.buttonNavigate}>
                        {Number(currentPage) >= 2 && (

                            <div>
                                <button onClick={() => navigatePage(1)}>
                                    <FiChevronsLeft size={25} color="#fff" />
                                </button>

                                <button onClick={() => navigatePage(Number(currentPage - 1))}>
                                    <FiChevronLeft size={25} color="#fff" />
                                </button>
                            </div>
                        )}



                        {Number(currentPage) < Number(totalPage) && (
                            <div>
                                <button onClick={() => navigatePage(Number(currentPage + 1))}>
                                    <FiChevronRight size={25} color="#fff" />
                                </button>

                                <button onClick={() => navigatePage(Number(totalPage))}>
                                    <FiChevronsRight size={25} color="#fff" />
                                </button>

                                <div>




                                </div>




                            </div>

                        )}

                    </div>




                </div>


            </main>

            </div>


        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'ebook')
    ], {
        orderings: '[document.last_publication_date desc]',
        fetch: ['ebook.titlebook', 'ebook.descriptionbook', 'ebook.coverbook'],
        pageSize: 3
    })

    // console.log(JSON.stringify(response, null,2))
    const ebooks = response.results.map(ebook => {
        return {

            slug: ebook.uid,
            titlebook: RichText.asText(ebook.data.titlebook),
            descriptionbook: ebook.data.descriptionbook.find(content => content.type === 'paragraph')?.text ?? '',

            coverbook: ebook.data.coverbook.url,
            updatedAt: new Date(ebook.last_publication_date).toLocaleDateString('pt-BR', {
                day: "2-digit",
                month: 'long',
                year: 'numeric'
            })


        }
    }
    )
    return {
        props: {
            ebooks,
            page: response.page,
            totalPage: response.total_pages
        },
        revalidate: 60 * 30 //atualiza a cada 30 minutos
    }
}