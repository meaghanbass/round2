import Layout from "../components/Layout";
import { withRouter } from "next/router";
import SignInComponent from "../components/Auth/SignInComponent";

const SignIn = ({router}) => {
    const showRedirectMessage = () => {
        if (router.query.message) {
            return <div className="alert" style={{borderColor: `#5e64fe`, background: `#e6e7ff`}}>{router.query.message}</div>;
        } else {
            return;
        }
    };

    return (
        <Layout>
            <h3 className="text-center">Sign in</h3>
            <div className="row">
                <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
            </div>
            <SignInComponent />
        </Layout>
    );
};

export default withRouter(SignIn);