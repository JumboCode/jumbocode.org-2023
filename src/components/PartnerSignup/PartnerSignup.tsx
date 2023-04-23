'use client';

import React, { useState } from 'react';

import classNames from 'classnames';
import classNamesBinder from 'classnames/bind';
import styles from './PartnerSignup.module.scss';
const cx = classNamesBinder.bind(styles);

export default function PartnerSignup({
  className = undefined,
  onSubmit = undefined,
}: {
  onSubmit?: (email: string) => any;
} & Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'>) {
  const [submitted, setSubmitted] = useState(false);

  // Form state
  // the form has name, email, phone number, website, and comment
  const [organizationName, setOrganizationName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [comment, setComment] = useState('');

  return (
    <div className={classNames(cx('base'), className)}>
      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit(email);
            fetch('/partner-signup', {
              method: 'post',
              body: JSON.stringify(website.length > 0 ? {
                organizationName,
                name,
                email,
                phoneNumber,
                website,
                comment,
              } : {
                organizationName,
                name,
                email,
                phoneNumber,
                comment,
              }),
              headers: { 'Content-Type': 'application/json' },
            }).then(() => setSubmitted(true));
          }}
        >
          <label>
            Organization Name
            <input
              type="text"
              name="organizationName"
              placeholder="Enter your name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
            />
          </label>
          <label>
            Primary Contact Name
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email Address
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Phone Number
            <input
              type="tel"
              name="phone-number"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Website
            <input
              type="url"
              name="website"
              placeholder="Enter your website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              onBlur={() => {
                if (website && !website.startsWith('http')) {
                  setWebsite(`https://${website}`);
                }
              }}
            />
          </label>
          <label>
            Additional Comments
            <textarea
              name="comment"
              placeholder="Anything else you'd like to share?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <input type="submit" value="Connect with us" />
        </form>
      ) : (
        <div className={cx('confirmation')}>You’re all set!</div>
      )}
    </div>
  );
}
