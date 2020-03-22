import Layout from "../../../components/Layout";
import Admin from "../../../components/Auth/Admin";
import BlogUpdate from "../../../components/CRUD/BlogUpdate";
import Link from "next/link";

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <h2 className="text-center">Update Blog</h2>
                <div className="row">
                    <div className="col-12">
                        <BlogUpdate />
                    </div>
                </div>
            </Admin>
        </Layout>
    )
};

export default Blog;