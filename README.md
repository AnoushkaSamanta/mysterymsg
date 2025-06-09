# Mystery Message 🕵️‍♂️

**An Anonymous Feedback App for Secure and Private Communication**

Mystery Message is a modern web application that enables users to receive anonymous feedback and messages through personalized links. Built with security and user experience in mind, it provides a safe space for honest communication without revealing sender identities.

## ✨ Features

### 🔐 **Secure Authentication**
- **OTP-based two-step authentication** for robust account security
- Secure user registration and login processes
- Protected user sessions with NextAuth integration

### 🔗 **Custom Anonymous Links**
- **Unique personalized links** for each user to receive anonymous messages
- **Toggle functionality** to enable or disable message reception
- Easy link sharing for collecting feedback

### 🛡️ **Input Validation & Security**
- **Zod schema validation** ensures data integrity and security
- Comprehensive form validation using React Hook Form
- Safe handling of user inputs and data sanitization

### 🤖 **AI-Powered Assistance**
- **Smart message suggestions** to help users craft thoughtful anonymous feedback
- AI integration for enhanced user experience
- Contextual content recommendations

### 📱 **Modern User Interface**
- Responsive design built with **Tailwind CSS**
- Clean and intuitive interface using **Shadcn UI components**
- Optimized for both desktop and mobile devices

## 🚀 Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Authentication:** NextAuth.js with OTP verification
- **Database:** MongoDB for data persistence
- **Validation:** Zod for schema validation
- **Forms:** React Hook Form for form management
- **UI Components:** Shadcn UI library
- **Email Service:** Resend for OTP delivery
- **AI Integration:** AI-powered message suggestions

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mystery-message.git
   cd mystery-message
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   RESEND_API_KEY=your_resend_api_key
   AI_API_KEY=your_ai_service_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Usage

1. **Sign Up**: Create an account using OTP verification
2. **Get Your Link**: Receive a unique anonymous messaging link
3. **Share Your Link**: Share with friends, colleagues, or on social media
4. **Receive Messages**: Get anonymous feedback through your personalized link
5. **Manage Settings**: Toggle message reception on/off as needed

## 🔧 Configuration

### Database Setup
Ensure your MongoDB database is properly configured with the necessary collections for users, messages, and sessions.

### Email Configuration
Configure Resend for OTP email delivery by adding your API key to the environment variables.

### AI Integration
Set up your preferred AI service API key for message suggestions functionality.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [MongoDB](https://www.mongodb.com/)

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub or reach out through the anonymous feedback link! 

---

![Screenshot 2025-06-09 102301](https://github.com/user-attachments/assets/e005c4fb-b4f2-4ad3-b0dd-f2542abfb462)

![Screenshot 2025-06-09 102503](https://github.com/user-attachments/assets/aebaa5a3-2421-427a-a767-c1b87722c921)


![Screenshot 2025-06-09 102503](https://github.com/user-attachments/assets/6f6b9bb5-23f6-48a3-b611-14b0c27fcb03)


![Screenshot 2025-06-09 102522](https://github.com/user-attachments/assets/0abe6935-08d9-4420-9edc-deb09d4868d9)


**Made with ❤️ for secure and anonymous communication**
