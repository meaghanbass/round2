import Layout from "../components/Layout";
import SignUpComponent from "../components/Auth/SignUpComponent";

const SignUp = () => {
    return (
        <Layout>
            <h3 className="text-center">Sign up</h3>
            <SignUpComponent />
        </Layout>
    );
}

export default SignUp;