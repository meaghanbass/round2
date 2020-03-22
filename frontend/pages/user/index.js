import Layout from "../../components/Layout";
import Private from "../../components/Auth/Private";
import Link from "next/link";

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <h2>User Dashboard</h2>
                <div className="row">
                    <div className="col-md-6 border">
                        <ul className="list-group">
                            <Link href="/user/crud/blog"><a>Create Blog</a></Link>
                        </ul>
                        <ul className="list-group">
                            <Link href="/user/crud/blogs"><a>Update & Delete Blogs</a></Link>
                        </ul>
                        <hr />
                        <ul className="list-group">
                            <Link href="/user/update"><a>Update Profile</a></Link>
                        </ul>
                    </div>
                    <div className="col-md-6 border">
                        right
                    </div>
                </div>
            </Private>
        </Layout>
    )
}

export default UserIndex;