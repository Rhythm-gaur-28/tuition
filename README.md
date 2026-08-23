# Maths Tuition Website

> A production web platform for a CBSE mathematics tuition service, designed to showcase courses, provide enquiry channels, and convert prospective students into enquiries.

**Production Freelance Project** · **Live and Deployed**

## Overview

This project is a production website developed for **Maths Tuition by Vimmy Ma'am**, a CBSE mathematics tuition service for students in Classes 10, 11, and 12.

The website was designed to provide a clear digital presence for the tuition service while simplifying the student enquiry process. Prospective students can explore the available tuition offerings, choose between online and offline learning modes, contact the tutor through WhatsApp, or submit an enquiry directly through the website.

The application is built using Node.js and Express with EJS for server-side rendering and includes backend validation, anti-spam measures, rate limiting, and automated email notifications.

## Live Website

[Visit the live website](https://www.mathsmantra553.com/)

---

## Key Features

### Service-Focused Landing Page

* Responsive website designed for desktop and mobile users
* Clear presentation of mathematics tuition offerings
* CBSE-focused information for Classes 10, 11, and 12
* Information about online and offline learning modes
* Clear calls to action for prospective students

### Student Enquiry System

The website includes a server-side enquiry form that collects:

* Student or parent name
* Phone number
* Student class
* Preferred learning mode
* Enquiry message

Submitted enquiries are validated before being processed and delivered directly through email.

### Automated Email Notifications

A successful enquiry triggers an automated email notification containing:

* Name
* Phone number
* Selected class
* Preferred learning mode
* Enquiry message

The email content is formatted as a structured HTML notification to make enquiries easy to review and respond to.

### WhatsApp Integration

The application dynamically generates a WhatsApp enquiry link, allowing prospective students or parents to initiate a conversation directly from the website.

### Server-Side Validation

The enquiry workflow validates:

* Required fields
* Name format
* Indian 10-digit phone numbers
* Allowed class values
* Online or offline learning mode
* Message length
* Invalid characters and HTML input
* URLs and links within enquiry messages

### Anti-Spam Protection

The enquiry form includes multiple layers of protection against automated or malicious submissions:

* Honeypot field detection
* Minimum form completion time validation
* Link detection in messages
* Input validation
* HTML sanitization through output escaping

### Rate Limiting

The `/contact` endpoint is protected using `express-rate-limit`.

The current configuration limits repeated enquiry attempts within a defined time window, helping reduce spam and abuse.

---

## Application Architecture

The project follows a lightweight MVC-inspired server-side architecture.

```text
                    ┌─────────────────┐
                    │      User       │
                    │ Browser / Mobile│
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Express.js    │
                    │     Server      │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │                             │
              ▼                             ▼
       ┌──────────────┐              ┌──────────────┐
       │    Routes    │              │ Static Assets│
       │              │              │ HTML/CSS/JS  │
       └──────┬───────┘              └──────────────┘
              │
              ▼
       ┌──────────────┐
       │ Controllers  │
       │ Validation + │
       │ Form Logic   │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │ Email Utility│
       │  Nodemailer  │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │ Email Inbox  │
       │ New Enquiry  │
       └──────────────┘
```

---

## Enquiry Processing Flow

```text
User Submits Enquiry
          │
          ▼
Required Field Validation
          │
          ▼
Anti-Spam Checks
          │
          ├── Honeypot Validation
          ├── Form Completion Time Check
          └── Rate Limiting
          │
          ▼
Input Validation
          │
          ├── Name
          ├── Phone Number
          ├── Class
          ├── Learning Mode
          └── Message
          │
          ▼
Generate Structured Email
          │
          ▼
Send via Nodemailer
          │
          ▼
Show Success / Error Feedback
```

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Frontend

* EJS
* HTML
* CSS
* JavaScript

### Email

* Nodemailer
* Gmail SMTP

### Security & Request Protection

* express-rate-limit
* dotenv
* Server-side input validation
* Honeypot spam protection
* Submission timing validation

### Deployment

* Vercel

---

## Project Structure

```text
tuition/
│
├── controllers/
│   └── mainController.js
│
├── routes/
│   └── mainRoutes.js
│
├── utils/
│   └── mailer.js
│
├── views/
│   └── EJS templates
│
├── public/
│   ├── css/
│   ├── javascript/
│   └── images/
│
├── server.js
├── package.json
├── vercel.json
└── .gitignore
```

---

## Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* A Gmail account or compatible SMTP configuration

### Clone the Repository

```bash
git clone https://github.com/Rhythm-gaur-28/tuition.git
cd tuition
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
EMAIL_TO=recipient_email_address

WHATSAPP_NUMBER=your_whatsapp_number

PORT=3000
NODE_ENV=development
```

> Use an application-specific password or secure SMTP credentials rather than storing account passwords directly in the project.

### Run Locally

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

## Security Considerations

The contact workflow includes several measures to reduce invalid and malicious submissions:

* Server-side validation for all required fields
* Phone number format validation
* Whitelisted class and learning mode values
* Message length restrictions
* Link detection
* Basic HTML input rejection
* Honeypot bot detection
* Submission timing checks
* Rate limiting on the contact endpoint
* Environment variables for sensitive configuration

---

## Screenshots

<img width="1920" height="7585" alt="image" src="https://github.com/user-attachments/assets/7d1c42af-953c-41ad-bb48-b596ac45fe0b" />


* Homepage
* Course or tuition information section
* Online/offline learning options
* Enquiry form
* Mobile responsive view

---

## My Role

This project was developed as a freelance production website.

My work included:

* Translating business requirements into a web application
* Designing and implementing the user-facing website
* Building the Express.js backend
* Creating the enquiry workflow
* Implementing server-side validation and anti-spam protection
* Integrating automated email notifications
* Adding WhatsApp enquiry functionality
* Configuring the application for deployment

---

## Future Improvements

Potential future enhancements include:

* Admin dashboard for managing enquiries
* Database-backed enquiry management
* Email acknowledgement for users
* Analytics integration
* SEO enhancements
* CAPTCHA or additional bot protection
* Automated follow-up workflows
* CMS support for updating course information

---

## Author

**Rhythm Gaur**

* GitHub: [Rhythm Gaur on GitHub](https://github.com/Rhythm-gaur-28?utm_source=chatgpt.com)

---

## License

This repository is shared for portfolio and demonstration purposes.
