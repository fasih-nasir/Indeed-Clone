import React, { useState } from 'react';
import '../App.css';
import './auth.css';
import logo from '../assets/logo.png';

import { auth, createUserWithEmailAndPassword } from '../auth/config'; // Firebase config
import { message, Button, Form, Input, Upload } from 'antd';
import { db, storage } from '../auth/config'; // Firebase Firestore & Storage config
import { doc, setDoc } from 'firebase/firestore'; // Firestore methods
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage methods
import { PlusOutlined } from '@ant-design/icons'; // Ant Design's upload icon
import { UploadOutlined } from '@ant-design/icons';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Ant Design's form instance
  const [imageFile, setImageFile] = useState(null); // State to hold uploaded image

  // Handle file change for profile picture
  const handleFileChange = (file) => {
    setImageFile(file);
  };

  const onFinish = async (values) => {
    const { name, email, contact, password } = values;
    setLoading(true);

    try {
      // Firebase Signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let imageUrl = null;

      if (imageFile) {
        // Create a reference to the storage bucket location
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, imageFile);
        // Get the file's download URL
        imageUrl = await getDownloadURL(storageRef);
      }

      // Store user information in Firestore database along with profile picture URL
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        contact: contact,
        profilePicture: imageUrl, // Save profile picture URL
      });

      // Show success message and reset the form fields
      message.success('Account created successfully!', 3);
      form.resetFields();
      setImageFile(null); // Clear image after upload
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

 
          {/* Profile Picture Upload */}
<div className='d-flex flex-row col-8 mx-auto justify-content-between align-items-center'>
<p>Profile Pic</p>
          <Form.Item>
            <Upload
              beforeUpload={(file) => {
                handleFileChange(file);
                return false; // Prevent automatic upload
              }}
              listType="picture-card"
              showUploadList={false}
            >
              {imageFile ? (
                <img src={URL.createObjectURL(imageFile)} alt="profile" style={{ width: '100%' }} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          </div>
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
