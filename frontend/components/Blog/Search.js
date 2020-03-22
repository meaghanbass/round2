import renderHTML from 'react-render-html';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { listSearch } from "../../actions/blog";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const {search, results, searched, message} = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({search}).then(data => {
            setValues({...values, results: data, searched: true, message: `${data.length} blogs found`})
        });
        setShow(true); // TEST
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({...values, search: e.target.value, searched: false, results: []})
    };

    const searchedBlogs = (results = []) => {
        return (
            // <div>
            //     {message && <p>{message}</p>}

            //     {results.map((blog, i) => {
            //         return (
            //             <Modal.Dialog key={i}>
            //                 <Link href={`/blogs/${blog.slug}`}><a>{blog.title}</a></Link>
            //             </Modal.Dialog>
            //         );
            //     })}
            // </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>{message && <p>{message}</p>}</Modal.Header>
                <Modal.Body>
                    {results.map((blog, i) => {
                        return (
                            <div key={i}>
                                <Link href={`/blogs/${blog.slug}`}><a>{blog.title}</a></Link>
                            </div>
                        );
                    })}
                </Modal.Body>
            </Modal>
        );
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const searchForm = () => {
        return (
            <>
                {/* <Form inline>
                    <FormControl type="search" placeholder="Search Posts" className="mr-sm-2" onChange={handleChange} />
                    <Button onClick={searchSubmit} variant="none" style={{borderColor: `hotpink`, backgroundColor: `hotpink`}}>Search</Button>
                </Form>
                {searched && <div style={{position: `fixed`, top: `50px`, backgroundColor: `hotpink`, zIndex: `10000`, width: `100%`}}>{searchedBlogs(results)}</div>} */}

                <Form inline>
                    <FormControl type="search" placeholder="Search Posts" className="mr-sm-2" onChange={handleChange} />
                    <Button onClick={searchSubmit} variant="none" style={{borderColor: `hotpink`, backgroundColor: `hotpink`, color: `lavenderblush`}}>Search</Button>
                </Form>
                {searched && <div style={{position: `fixed`, zIndex: `10000`}}>{searchedBlogs(results)}</div>}
            </>
        );
    };

    return (
        // <p>Search form</p>
        <div>{searchForm()}</div>
    )
};

export default Search;