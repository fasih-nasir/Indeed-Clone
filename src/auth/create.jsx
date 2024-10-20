import React, { useState } from 'react';
import '../App.css';
import "./auth.css"
import logo from '../assets/logo.png';

import { auth, createUserWithEmailAndPassword } from '../auth/config'; // Firebase config
import { message, Button, Form, Input } from 'antd';
import { db } from '../auth/config'; // Firebase Firestore config
import { doc, setDoc } from 'firebase/firestore'; // Firestore methods

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Ant Design's form instance

  const onFinish = async (values) => {
    // console.log(values); // Debug: Ensure values are captured correctly
    const { name, email, contact, password } = values;
    setLoading(true);

    try {
      // Firebase Signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user information in Firestore database
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        contact: contact,
      });

      // Show success message and reset the form fields
      message.success('Account created successfully!', 3);
      form.resetFields();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex flex-column'>
      <div className="row px-5">
        <a className="navbar-brand col-2" href="/">
          <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '100px' }} />
        </a>
      </div>
      <div style={{ maxWidth: '400px', margin: '25px auto' }} className='authdiv col-6'>
        <h1 className='text-center '>Sign Up</h1>
        <Form
          form={form}
          name="signupForm"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="contact"
            rules={[{ required: true, message: 'Please input your contact number!' }]}
          >
            <Input placeholder="Contact Number" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <div className='col-12 d-flex justify-content-center'>
            <Form.Item className="form-item col-4">
              <Button type="primary" htmlType="submit" loading={loading} block>
                Sign Up
              </Button>
            </Form.Item>
          </div>

          <div className='col-12 d-flex justify-content-center'>
            <p>
              Already have an account?{' '}
              <a href="/auth/login" className="link-primary">
                Sign In
              </a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
