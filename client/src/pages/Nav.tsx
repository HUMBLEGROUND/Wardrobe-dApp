import "../styles/Nav.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

function OffcanvasExample() {
  return (
    <>
      {["xxl"].map(expand => (
        <Navbar expand={expand} className="mb-3 nav_wrapper">
          <Container fluid>
            <Navbar.Brand href="/" className="nav_title">
              옷장 🚪
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-5 nav_gap">
                  <Nav.Link href="/create">옷등록</Nav.Link>
                  <Nav.Link href="/delete">옷삭제</Nav.Link>
                  <Nav.Link href="/read">옷조회</Nav.Link>
                  <Nav.Link href="/transfer">옷판매</Nav.Link>
                  <Nav.Link href="/update">옷등록수정</Nav.Link>
                  <Button href="/users" className="btn btn-success nav_btn">
                    옷장등록
                  </Button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;
