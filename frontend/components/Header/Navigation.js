import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavLink from "react-bootstrap/NavLink";
import { APP_NAME } from "../../config";
import { signout, isAuth } from "../../actions/auth";
import Router from "next/router";
import NProgress from "nprogress";
import "../../node_modules/nprogress/nprogress.css";
import Search from "../Blog/Search";

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Navigation = () => {
    return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><Link href="/"><a style={{color: `hotpink`}}>{APP_NAME}</a></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Don't uncomment this section unless you've read the documentation below. */}
                    {/* <Nav className="ml-auto">
                        <Link href="/">Home</Link>
                        {!isAuth() && (
                            <>
                            <Link href="/signin">Signin</Link>
                            <Link href="/signup">Signup</Link>
                            </>
                        )}

                        {isAuth() && (
                            <Link onClick={() => signout(() => Router.replace(`/signin`))}>
                                Signout
                            </Link>
                        )}

                        {isAuth() && isAuth().role === 0 && (
                            <Link href="/user">
                                {`${isAuth().name}'s Dashboard`}
                            </Link>
                        )}

                        {isAuth() && isAuth().role === 1 && (
                            <Link href="/admin">
                                {`${isAuth().name}'s Dashboard`}
                            </Link>
                        )}
                    </Nav> */}

                    {/* PLEASE DON'T CHANGE THIS. There was a change in how Next.js handles links which impacts routing as well.
                    Refer to https://nextjs.org/docs/api-reference/next/router before you change anything. */}
                    

                    <Nav className="ml-auto align-items-center">
                        <Search />

                        <Link href="/"><a className="ml-2 btn" style={{border: `1px solid hotpink`, color: `hotpink`, background: `lavenderblush`}}>Home</a></Link>

                        <Link href="/blogs"><a className="ml-2 btn" style={{border: `1px solid hotpink`, color: `hotpink`, background: `lavenderblush`}}>Blogs</a></Link>
                        
                        <Link href="/contact"><a className="ml-2 btn" style={{border: `1px solid hotpink`, color: `hotpink`, background: `lavenderblush`}}>Contact</a></Link>

                        {!isAuth() && (
                        <>
                        <Link href="/signin"><a className="ml-2 btn" style={{border: `1px solid hotpink`, color: `hotpink`, background: `lavenderblush`}}>Sign In</a></Link>
                        <Link href="/signup"><a className="ml-2 btn" style={{border: `1px solid hotpink`, color: `hotpink`, background: `lavenderblush`}}>Sign Up</a></Link>
                        </>
                        )}

                        {isAuth() && (
                        <NavLink className="ml-2 btn" style={{border: `1px solid hotpink`, color: `hotpink`, padding: `.375rem .75rem`, background: `lavenderblush`}} onClick={() => signout(() => Router.replace(`/signin`))}>
                            Sign Out
                        </NavLink>
                        )}

                        {isAuth() && isAuth().role === 0 && (
                        <Link href="/user"><a className="ml-2 btn" style={{border: `1px solid hotpink`, color: `hotpink`, background: `lavenderblush`}}>
                            {`${isAuth().name}'s Dashboard`}
                            </a></Link>
                        )}

                        {isAuth() && isAuth().role === 1 && (
                        <Link href="/admin"><a className="ml-2 btn" style={{border: `1px solid hotpink`, color: `hotpink`, background: `lavenderblush`}}>
                            {`${isAuth().name}'s Dashboard`}
                            </a></Link>
                        )}

                        <Link href="/user/crud/blog"><a className="ml-2 btn" style={{border: `1px solid mediumorchid`, color: `mediumorchid`, background: `lavender`}}>Create Blog</a></Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    );
};

export default Navigation;