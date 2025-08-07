import React from 'react';
import './Subscriptions.css';
import { Check, X } from 'lucide-react'; // Importing icons for features

const PricingCard = ({ plan, price, description, features, isPopular }) => {
  return (
    <div className={`pricing-card ${isPopular ? 'popular' : ''}`}>
      {isPopular && <div className="popular-badge">Most Popular</div>}
      <h3 className="plan-name">{plan}</h3>
      <p className="plan-price">
        ${price}<span className="price-term">/month</span>
      </p>
      <p className="plan-description">{description}</p>
      <ul className="features-list">
        {features.map((feature, index) => (
          <li key={index} className="feature-item">
            {feature.included ? (
              <Check size={16} className="feature-icon check-icon" />
            ) : (
              <X size={16} className="feature-icon x-icon" />
            )}
            <span className="feature-text">{feature.text}</span>
          </li>
        ))}
      </ul>
      <a href="#" className="choose-plan-button">
        Choose Plan
      </a>
    </div>
  );
};

const Subscriptions = () => {
  const pricingPlans = [
    {
      plan: 'Basic',
      price: 9,
      description: 'Perfect for individuals and small teams getting started.',
      features: [
        { text: '5 GB of storage', included: true },
        { text: '3 user accounts', included: true },
        { text: 'Basic data analytics', included: true },
        { text: '24/7 email support', included: false },
        { text: 'Dedicated account manager', included: false },
      ],
      isPopular: false,
    },
    {
      plan: 'Pro',
      price: 29,
      description: 'For growing teams that need more power and collaboration.',
      features: [
        { text: '50 GB of storage', included: true },
        { text: '10 user accounts', included: true },
        { text: 'Advanced data analytics', included: true },
        { text: '24/7 email support', included: true },
        { text: 'Dedicated account manager', included: false },
      ],
      isPopular: true,
    },
    {
      plan: 'Enterprise',
      price: 99,
      description: 'The ultimate solution for large-scale operations and businesses.',
      features: [
        { text: 'Unlimited storage', included: true },
        { text: 'Unlimited user accounts', included: true },
        { text: 'Real-time data processing', included: true },
        { text: '24/7 priority support', included: true },
        { text: 'Dedicated account manager', included: true },
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="subscriptions-container">
      <header className="subscriptions-header">
        <h1 className="header-title">Flexible Pricing for Every Need</h1>
        <p className="header-subtitle">Choose the plan that's right for you and your team.</p>
      </header>
      <div className="pricing-cards-container">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
