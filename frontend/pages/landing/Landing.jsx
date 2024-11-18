import React from 'react'
import './Landing.css'

const Landing = () => {
  return (
    <div>
       
  <section className="hero">
        <h1>Welcome to Ticket Ease</h1>
        <h1>Revolutionize Your Support System</h1>
        <p>Efficient, reliable, and user-friendly ticketing system for your business.</p>
        <a href="#features">Explore Features</a>
    </section>
    <div className='land-details'>
        <div className="land-left">
            <h1>Customer Support</h1>
            <p>A great customer support system is the backbone of any successful business. It ensures that your customers feel valued and heard, leading to increased satisfaction and loyalty. Our customer support platform provides a seamless and efficient way to manage inquiries, resolve issues, and deliver personalized support. With features like ticket management, real-time updates, and multi-channel communication, we help businesses provide quick and effective solutions to their customers. Whether you’re handling customer queries, tracking performance, or analyzing data, our system simplifies it all, so you can focus on what matters most delivering exceptional service.</p>
        </div>
        <div className="land-right">
            <img src="https://otrs.com/wp-content/uploads/Customer-Support-Team.jpg" alt="" />
        </div>
    </div>
    <section id="features" className="features">
        <div className="feature">
            <i className="fa-solid fa-ticket"></i>
            <h3>Effortless Ticket Management</h3>
            <p>Streamline your workflow with organized ticket handling and real-time updates.</p>
        </div>
        <div className="feature">
            <i className="fa-solid fa-users"></i>
            <h3>Multi-Role Access</h3>
            <p>Assign custom roles to agents, customers, and admins for seamless interaction.</p>
        </div>
        <div className="feature">
            <i className="fa-solid fa-chart-line"></i>
            <h3>Analytics & Insights</h3>
            <p>Track performance metrics and improve response time with detailed analytics.</p>
        </div>
    </section>
    <section id="pricing" className='land-price-container'>
    <h2>Our Pricing Plans</h2>
    <p>Choose a plan that fits your business needs.</p>
    <div className='land-price-main' >
        <div className="land-price">
            <h3>Basic Plan</h3>
            <p>₹499/month</p>
            <ul>
                <li>✔ Single Agent Access</li>
                <li>✔ Email Support</li>
                <li>✔ Basic Analytics</li>
            </ul>
            {/* <a href="#" style="display: inline-block; margin-top: 20px; padding: 10px 30px; background: #4a90e2; color: #fff; text-decoration: none; border-radius: 5px; transition: background 0.3s;">Choose Plan</a> */}
        </div>
        <div className="land-price">
            <h3>Pro Plan</h3>
            <p >₹999/month</p>
            <ul >
                <li>✔ Multi-Agent Access</li>
                <li>✔ Priority Email & Chat Support</li>
                <li>✔ Advanced Analytics</li>
            </ul>
            {/* <a href="#" style="display: inline-block; margin-top: 20px; padding: 10px 30px; background: #4a90e2; color: #fff; text-decoration: none; border-radius: 5px; transition: background 0.3s;">Choose Plan</a> */}
        </div>
        <div className='land-price'>
            <h3>Enterprise Plan</h3>
            <p >₹2499/month</p>
            <ul >
                <li>✔ Unlimited Agent Access</li>
                <li>✔ 24/7 Support</li>
                <li>✔ Custom Analytics & Insights</li>
            </ul>
            {/* <a href="#" style="display: inline-block; margin-top: 20px; padding: 10px 30px; background: #4a90e2; color: #fff; text-decoration: none; border-radius: 5px; transition: background 0.3s;">Choose Plan</a> */}
        </div>
    </div>
</section>

    <section id="cta" className="cta">
        <h2>Ready to Elevate Your Customer Experience?</h2>
        <p>Join thousands of businesses improving their support systems today.</p>
        <a href="/login">Get Started</a>
    </section>

    <footer id="footer">
        <p>&copy; 2024 TechEase. Built with ❤️ by our team.</p>
    </footer>
    </div>
  )
}

export default Landing
