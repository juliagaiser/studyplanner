import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function PopUpList({ title, children, onHide }) {
  return (
    <Modal
    show
    onHide={onHide}
    >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default PopUpList;
