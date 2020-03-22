import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const BlogRead = ({username}) => {

    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = () => {
        list(username).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setBlogs(data);
            }
        });
    };

    const deleteBlog = (slug) => {
        removeBlog(slug, token).then(data => {
            if(data.error) {
                console.loeg(data.error);
            } else {
                setMessage(data.message);
                loadBlogs();
            }
        });
    };

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Are you sure you want to delete?');
        if(answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = (blog) => {
        if(isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${blog.slug}`}><a className="ml-2 btn btn-sm" style={{color: `lavender`, background: `mediumorchid`}}>Update</a></Link>
            );
        } else if(isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/crud/${blog.slug}`}><a className="ml-2 btn btn-sm" style={{color: `lavender`, background: `mediumorchid`}}>Update</a></Link>
            );
        }
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="mt-5 col-md-12">
                    <h3>{blog.title}</h3>
                    <p>Written by: {blog.postedBy.name} | Published on: {moment(blog.updatedAt).fromNow()}</p>
                    <button className="btn btn-sm" onClick={() => deleteConfirm(blog.slug)} style={{backgroundColor: `hotpink`, color: `lavenderblush`}}>Delete</button>
                    {showUpdateButton(blog)}
                </div>
            )
        })
    }

    return (
        <>
            <div className="row">
                {message && <div className="alert alert-success">{message}</div>}
                {showAllBlogs()}
            </div>
        </>
    )
};

export default BlogRead;