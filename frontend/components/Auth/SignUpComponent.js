import Form from "react-bootstrap/Form";
import {signup, isAuth, preSignup } from "../../actions/auth";
import {useState, useEffect} from "react";
import Router from "next/router";

const SignUpComponent = () => {

    const [values, setValues] = useState({
        name: 'meaghan',
        email: 'meaghan@gmail.com',
        password: 'password',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const {name, email, password, error, loading, message, showForm} = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        preSignup(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
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

    const signupForm = () => {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} onChange={handleChange('name')} type="text" placeholder="Name" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={handleChange('email')} type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={handleChange('password')} type="password" placeholder="Password" />
                </Form.Group>

                <div>
                    <button onClick={handleSubmit} className="btn btn-primary">Signup</button>
                </div>

            </Form>
        );
    };

    return (
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
            {/* {signupForm()} */}
        </>
    );
};

export default SignUpComponent;