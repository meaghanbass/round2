import Layout from "../../../components/Layout";
import Admin from "../../../components/Auth/Admin";
import BlogCreate from "../../../components/CRUD/BlogCreate";
import Link from "next/link";

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <h2 className="text-center">Create New Blog</h2>
                <div className="row">
                    <div className="col-12">
                    <BlogCreate />
                    </div>
                </div>
            </Admin>
        </Layout>
    )
};

export default Blog;