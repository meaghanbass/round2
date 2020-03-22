import Layout from "../../../components/Layout";
import Private from "../../../components/Auth/Private";
import BlogCreate from "../../../components/CRUD/BlogCreate";
import Link from "next/link";

const Blog = () => {
    return (
        <Layout>
            <Private>
                <h2 className="text-center">Create New Blog</h2>
                <div className="row">
                    <div className="col-12">
                    <BlogCreate />
                    </div>
                </div>
            </Private>
        </Layout>
    )
};

export default Blog;