import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
import Button from "react-bootstrap/Button";

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const CreateBlog = ({router}) => {

    const blogFromLS = () => {
        if(typeof window === 'undefined') {
            return false;
        }

        if(localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    };

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checkedCategory, setCheckedCategory] = useState([]); // Categories
    const [checkedTag, setCheckedTag] = useState([]); // Tags

    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    });

    const {error, sizeError, success, formData, title, hidePublishButton} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({...values, formData: new FormData()})
        initCategories()
        initTags()
    }, [router]);

    const initCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setCategories(data)
            }
        })
    };

    const initTags = () => {
        getTags().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setTags(data)
            }
        })
    };

    const publishBlog = (e) => {
        e.preventDefault();
        // console.log('ready to publish blog');
        createBlog(formData, token).then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, title: '', error: '', success: `A new blog titled "${data.title}" is created.`});
                setBody('');
                setCategories([]);
                setTags([]);
            }
        });
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value, formData, error: ''});
    };

    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
        if(typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e))
        }
    };

    const handleCategoriesToggle = (c) => () => {
        setValues({...values, error: ''})

        const clickedCategory = checkedCategory.indexOf(c)
        const all = [...checkedCategory]

        if(clickedCategory === -1) {
            all.push(c)
        } else {
            all.splice(clickedCategory, 1)
        }
        console.log("Categories Selected: " + all.length, all);

        // Show the number of items that are checked
        const categoryCount = document.getElementById("category-count");
        if (all.length > 0) {
            categoryCount.innerHTML = JSON.stringify(all.length);
        } else {
            categoryCount.innerHTML = '';
        }

        setCheckedCategory(all);
        formData.set('categories', all);
    }

    const handleTagsToggle = (t) => () => {
        setValues({...values, error: ''})

        const clickedTag = checkedTag.indexOf(t)
        const all = [...checkedTag]

        if(clickedTag === -1) {
            all.push(t)
        } else {
            all.splice(clickedTag, 1)
        }
        console.log("Tags Selected: " + all.length, all);

        // Show the number of items that are checked
        const tagCount = document.getElementById("tag-count");
        if (all.length > 0) {
            tagCount.innerHTML = JSON.stringify(all.length);
        } else {
            tagCount.innerHTML = '';
        }

        setCheckedTag(all);
        formData.set('tags', all);
    }

    const showCategories = () => {
        return (
            categories && categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleCategoriesToggle(c._id)} className="mr-2" type="checkbox"/>
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags && tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagsToggle(t._id)} className="mr-2" type="checkbox"/>
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const createBlogForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input className="form-control" type="text" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <ReactQuill modules={QuillModules} formats={QuillFormats} value={body} placeholder="type something" onChange={handleBody} />
                </div>

                <div>
                    <Button onClick={publishBlog}>
                        Publish
                    </Button>
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {createBlogForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group pb-2">
                        <h5>Featured Image</h5><hr />
                        <small className="text-muted">Max size 1MB</small>
                        <label className="btn btn-outline-info d-flex flex-column">
                            Upload Featured Image
                            <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                        </label>
                    </div>
                    <div>
                        <h5>Categories <span id="category-count"></span></h5><hr />
                        <ul style={{maxHeight: `100px`, overflowY: `scroll`}}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags <span id="tag-count"></span></h5><hr />
                        <ul style={{maxHeight: `200px`, overflowY: `scroll`}}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(CreateBlog);