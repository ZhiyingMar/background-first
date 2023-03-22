import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "./Login.css";
const Login = (props: any) => {
    const [validated, setValidated] = useState(false);
    const handleLogin=(event:any)=>{
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        const data={
            username:form.formUsername.value,
            password:form.formPassword.value
        }
        console.log(data);
      
        setValidated(true);
    }
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">登录</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>用户名</Form.Label>
            <Form.Control  type="text" placeholder="请输入用户名" required />
            <Form.Control.Feedback type="invalid">请输入用户名!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>密码</Form.Label>
            <Form.Control  type="password" placeholder="请输入密码" required />
            <Form.Control.Feedback type="invalid">请输入密码!</Form.Control.Feedback>
          </Form.Group>
          <br />
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              登录
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Login;
