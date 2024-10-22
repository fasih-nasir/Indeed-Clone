# JobConnect Plateform INDDED

A platform where two users connect—one posts a job, and the other applies, initiating a conversation directly through WhatsApp. JobConnect is designed to simplify job posting and hiring by facilitating direct communication between employers and candidates.

![image](https://github.com/user-attachments/assets/3b42e27a-5389-4c76-a655-8b4d9ea2151e)

## Features

- **User Authentication:** Sign up and log in using email and password.
- **Post Jobs:** Employers can create job posts after signing up.
- **Apply Now Feature:** Job seekers can apply to job posts, which directs them to WhatsApp for immediate communication.
- **Dashboard View:** Job posts are displayed on the dashboard for easy viewing and navigation.

## Pages

### 1. **Home Page**
   - Landing page with an introduction to the platform.
   - Simple navigation to sign up, log in, and view job posts.

### 2. **Sign-Up Page**
   - Allows new users (employers and job seekers) to register.
   - Uses Firebase Authentication for secure account creation.

### 3. **Sign-In Page**
   - Enables users to log in with their credentials to access the dashboard and post jobs.
   
### 4. **Dashboard**
   - Displays job posts created by employers.
   - Job seekers can view available jobs and apply directly through the "Apply Now" button, which redirects to WhatsApp.
   
### 5. **Post Job Page**
   - Employers can create and post job listings, specifying details like job title, description, and requirements.

   - ![image](https://github.com/user-attachments/assets/bdeb57c5-e19f-4b6a-8892-4c6dff7db29e)


### 6. **Job Details Page**
   - Displays detailed information about the job listing.
   - "Apply Now" button leads directly to WhatsApp for easy communication between the employer and the candidate.

![image](https://github.com/user-attachments/assets/7f15518b-21cc-49ec-9040-904d323732c5)


## Technologies Used

- **React** for the front-end.
- **Firebase Authentication** for user login and registration.
- **Firebase Firestore** for storing job posts and user data.
- **WhatsApp API** for direct communication between users.
