import Layout from "../../../components/Layout";
import Admin from "../../../components/Auth/Admin";
import Link from "next/link";
import Category from "../../../components/CRUD/Category";
import Tag from "../../../components/CRUD/Tag";

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <h2>Manage Categories and Tags</h2>
                <div className="row">
                    <div className="col-md-6 border">
                        <Category />
                    </div>
                    <div className="col-md-6 border">
                        <Tag />
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default CategoryTag;