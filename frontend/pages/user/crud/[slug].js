import Layout from "../../../components/Layout";
import Private from "../../../components/Auth/Private";
import BlogUpdate from "../../../components/CRUD/BlogUpdate";
import Link from "next/link";

const Blog = () => {
    return (
        <Layout>
            <Private>
                <h2 className="text-center">Update Blog</h2>
                <div className="row">
                    <div className="col-12">
                        <BlogUpdate />
                    </div>
                </div>
            </Private>
        </Layout>
    )
};

export default Blog;