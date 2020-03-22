import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from "next/router";
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME } from "../../config";
import moment from "moment";
import renderHTML from 'react-render-html';
import PreviewCardSm from "../../components/Blog/PreviewCardSm";
import DisqusThread from "../../components/DisqusThread";

const SingleBlog = ({blog, query}) => {
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({blog}).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        })
    }

    useEffect(() => {
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>{blog.title} | {APP_NAME}</title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/png" />
            {/* <meta property="og:app_id" content={`${APP_NAME}`} /> */}
        </Head>
    );

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    const showRelatedBlogs = () => {
        return related.map((blog, i) => (
            <PreviewCardSm key={i} blog={blog} />
        ));
    };

    const showComments = () => {
        return (
            <div>
                <DisqusThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`} />
            </div>
        );
    };

    return (
        <>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container">
                            <section>
                                <div className="row">
                                    <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid featured-image" />
                                </div>
                            </section>

                            <section>
                                <h1>{blog.title}</h1>
                                <p className="lead">
                                    Written by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link> | Published {moment(blog.updatedAt).fromNow()}
                                </p>
                                <div>
                                    <p>
                                        {showBlogCategories(blog)}
                                        {showBlogTags(blog)}
                                    </p>
                                </div>
                            </section>
                        </div>

                        <div>
                            <section>
                                <div>{renderHTML(blog.body)}</div>
                            </section>
                        </div>

                        <div>
                            <h4>Related blogs:</h4>
                            <div className="row">{showRelatedBlogs()}</div>
                        </div>

                        <hr />

                        <div>
                            <h4>Comments:</h4>
                            {showComments()}
                        </div>
                    </article>
                </main>
            </Layout>
        </>
    )
};

SingleBlog.getInitialProps = ({query}) => {
    return singleBlog(query.slug).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            return {blog: data, query}
        }
    });
};

export default SingleBlog;