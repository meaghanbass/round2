import renderHTML from 'react-render-html';
import moment from 'moment';
import Link from 'next/link';
import { API } from '../../config';

const PreviewCardLg = ({blog}) => {

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

    return (
        <>
            <div className="lead pb-4">
                <header>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>
                            <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
                        </a>
                    </Link>
                </header>
                <section>
                    <p className="mark ml-1 pt-2 pb-2">
                        Written by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link> | Published {moment(blog.updatedAt).fromNow()}
                    </p>
                </section>
                <section>
                    <p>{showBlogCategories(blog)}</p>
                    <p>{showBlogTags(blog)}</p>
                </section>

                <div className="row">
                    <div className="col-md-4">
                        <section>
                            <img className="img img-fluid" style={{maxWidth: `150px`, maxHeight: `150px`}} src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
                        </section>
                    </div>
                    <div className="col-md-8">
                        <section>
                            <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="btn btn-primary pt-2">Read more</a>
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
};

export default PreviewCardLg;