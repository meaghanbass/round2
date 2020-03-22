import Layout from "../../../components/Layout";
import Private from "../../../components/Auth/Private";
import BlogRead from "../../../components/CRUD/BlogRead";
import Link from "next/link";
import { isAuth } from "../../../actions/auth";

const Blog = () => {
    const username = isAuth() && isAuth().username;

    return (
        <Layout>
            <Private>
                <h2 className="text-center">Manage Blogs</h2>
                <div className="row">
                    <div className="col-12">
                        <BlogRead username={username} />
                    </div>
                </div>
            </Private>
        </Layout>
    )
};

export default Blog;