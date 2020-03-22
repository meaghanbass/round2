import Layout from "../../../components/Layout";
import Admin from "../../../components/Auth/Admin";
import BlogRead from "../../../components/CRUD/BlogRead";
import Link from "next/link";

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <h2 className="text-center">Manage Blogs</h2>
                <div className="row">
                    <div className="col-12">
                    <BlogRead />
                    </div>
                </div>
            </Admin>
        </Layout>
    )
};

export default Blog;