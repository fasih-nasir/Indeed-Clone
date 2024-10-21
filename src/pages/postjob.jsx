import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import moment from 'moment';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../auth/config'; // Ensure you have this import

const { Option } = Select;

function Postjob() {
  const [userEmail, setUserEmail] = useState('');
  const [userUID, setUserUID] = useState('');

  useEffect(() => {
    const user = auth.currentUser; // Get the current user
    console.log(user);

    if (user) {
      setUserEmail(user.email); // Set email
      setUserUID(user.uid); // Set UID
    } else {
      message.error('User not authenticated. Please log in.');
    }
  }, []); // Run once when the component mounts

  // Handle form submission
  const handleSubmit = async (values) => {
    console.log(values);

    const newJobPost = {
      ...values,
      email: userEmail, // Add email to job post
      uid: userUID, // Add UID to job post
      postedTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
      deadline: values.deadline ? values.deadline.format('MM/DD/YYYY') : null, // Convert deadline to string format
    };

    try {
      // Save the job post to Firestore
      await addDoc(collection(db, 'jobpost'), newJobPost);
      message.success('Job posted successfully!');
      form.resetFields();
    } catch (error) {
      console.error('Error adding document: ', error);
      message.error('Failed to post the job. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <h2 className="text-center">Post A Job</h2>
          <Form onFinish={handleSubmit} layout="vertical">
            {/* Username Field */}
            <Form.Item
              label="Username*"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>

            {/* Contact Number Field */}
            <Form.Item
              label="Contact Number*"
              name="contactNumber"
              rules={[{ required: true, message: 'Please input your contact number!' }]}
            >
              <Input placeholder="Enter your contact number" />
            </Form.Item>

            {/* Job Title Field */}
            <Form.Item
              label="Job Title*"
              name="jobTitle"
              rules={[{ required: true, message: 'Please input the job title!' }]}
            >
              <Select placeholder="Select Job Title">
                <Option value="front-dev">Front Dev</Option>
                <Option value="backend-dev">Backend Dev</Option>
                <Option value="software-engineer">Software Engineer</Option>
                <Option value="data-scientist">Data Scientist</Option>
                <Option value="project-manager">Project Manager</Option>
                <Option value="dev-ops-engineer">DevOps Engineer</Option>
                <Option value="ux-designer">UX Designer</Option>
                <Option value="qa-engineer">QA Engineer</Option>
              </Select>
            </Form.Item>

            {/* Job Category Field */}
            <Form.Item
              label="Job Category*"
              name="jobCategory"
              rules={[{ required: true, message: 'Please select a job category!' }]}
            >
              <Select placeholder="Select job category">
                <Option value="design">Design</Option>
                <Option value="development">Development</Option>
                <Option value="marketing">Marketing</Option>
              </Select>
            </Form.Item>

            {/* Vacancies Field */}
            <Form.Item
              label="Vacancies*"
              name="vacancies"
              rules={[{ required: true, message: 'Please input the number of vacancies!' }]}
            >
              <Input placeholder="07 Persons" />
            </Form.Item>

            {/* Salary Field */}
            <Form.Item
              label="Budget/Salary*"
              name="salary"
              rules={[{ required: true, message: 'Please input the salary!' }]}
            >
              <Input placeholder="Fixed Salary" />
            </Form.Item>

            {/* Job Type Field */}
            <Form.Item
              label="Job Type*"
              name="jobType"
              rules={[{ required: true, message: 'Please select a job type!' }]}
            >
              <Select placeholder="Select job type">
                <Option value="full-time">Full-time</Option>
                <Option value="part-time">Part-time</Option>
                <Option value="contract">Contract</Option>
              </Select>
            </Form.Item>

            {/* Experience Level Field */}
            <Form.Item
              label="Experience Level*"
              name="experienceLevel"
              rules={[{ required: true, message: 'Please select experience level!' }]}
            >
              <Select placeholder="Select experience level">
                <Option value="junior">Junior</Option>
                <Option value="mid">Mid</Option>
                <Option value="senior">Senior</Option>
              </Select>
            </Form.Item>

            {/* Job Tag Field */}
            <Form.Item
              label="Job Tag*"
              name="jobTag"
              rules={[{ required: true, message: 'Please input job tags!' }]}
            >
              <Input placeholder="e.g., UI, UX, Design" />
            </Form.Item>

            {/* Deadline Field */}
            <Form.Item
              label="Deadline*"
              name="deadline"
              rules={[{ required: true, message: 'Please select a deadline!' }]}
            >
              <DatePicker format="MM/DD/YYYY" />
            </Form.Item>

            {/* Job Description Field */}
            <Form.Item
              label="Job Description*"
              name="jobDescription"
              rules={[{ required: true, message: 'Please input the job description!' }]}
            >
              <Input.TextArea rows={4} placeholder="Describe the job..." />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Post Job
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Postjob;
