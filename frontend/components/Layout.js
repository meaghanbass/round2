import Container from "react-bootstrap/Container";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <Container style={{minHeight: `100vh`}}>
                {children}
            </Container>
            <Footer />
        </>
    );
};

export default Layout;