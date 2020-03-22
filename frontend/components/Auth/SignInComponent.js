import Form from "react-bootstrap/Form";
import { signin, authenticate, isAuth } from "../../actions/auth";
import { useState, useEffect } from "react";
import Router from "next/router";
import Link from 'next/link';

const SignInComponent = () => {

    const [values, setValues] = useState({
        email: 'meaghan@gmail.com',
        password: 'password',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const {email, password, error, loading, message, showForm} = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        signin(user).then(data => {
            // console.log('SIGNIN ERROR!!!!!!!!!!');
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // Save user token to cookie
                // Save user info to local storage
                // Authenticate user
                authenticate(data, () => {
                    if(isAuth() && isAuth().role === 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/user`);
                    }
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

    const signinForm = () => {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={handleChange('email')} type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={handleChange('password')} type="password" placeholder="Password" />
                </Form.Group>

                <div>
                    <button onClick={handleSubmit} className="btn" style={{borderColor: `hotpink`, backgroundColor: `hotpink`, color: `lavenderblush`}}>Sign In</button>
                </div>
            </Form>
        );
    };

    return (
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
            <br/>
            <Link href="/auth/password/forgot">
                <a className="" style={{fontSize: '10px', textDecoration: 'underline', float: 'right', color: 'mediumorchid'}}>Forgot password</a>
            </Link>
        </>
    );
};

export default SignInComponent;