import renderHTML from 'react-render-html';
import moment from 'moment';
import Link from 'next/link';
import { API } from '../../config';

const PreviewCardSm = ({blog}) => {

    return (
        <div className="card col-md-4">
            <section>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <img
                            className="img img-fluid"
                            style={{ maxHeight: 'auto', width: '100%' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                    </a>
                </Link>
            </section>

            <div className="card-body">
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>
                            <h5 className="card-title text-center">{blog.title}</h5>
                        </a>
                    </Link>
                    <p className="card-text">{renderHTML(blog.excerpt)}</p>
                </section>
            </div>

            <div className="card-body">
                Posted {moment(blog.updatedAt).fromNow()} by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link>
            </div>
        </div>
    );
};

export default PreviewCardSm;