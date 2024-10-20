import React, { useState } from 'react';
import '../App.css';
import { auth, signInWithEmailAndPassword } from '../auth/config'; // Firebase config
import { message, Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Update path according to your structure

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Ant Design's form instance

  // Form submit handler for login
  const onFinish = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      // Firebase Login
      await signInWithEmailAndPassword(auth, email, password);
      message.success('Successfully logged in!', 3);
      form.resetFields(); // Clear input fields after success
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // JSX for the form
  return (
    <div className="container-fluid">
      {/* Logo in the top-right */}
      <div className="row ">
        <a className="navbar-brand col-2 px-5" href="/">
          <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '100px' }} />
        </a>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 d-flex justify-content-center">
          <div style={{  margin: '100px auto' }} className='authdiv col-4 p-4'>
            <h1 className='text-center'>Login</h1>
            <Form
              form={form} // Linking form instance
              name="loginForm"
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item className="form-item">
                <Button type="primary" htmlType="submit" loading={loading} block>
                  Login
                </Button>
              </Form.Item>
            </Form>

            {/* Sign-up link */}
            <div className="col-12 d-flex justify-content-center mt-3">
              <p>
                Don't have an account?{' '}
                <Link to="/auth/create" className="link-primary">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
