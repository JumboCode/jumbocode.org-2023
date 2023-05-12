'use client';

import React, { useState } from 'react';

import classNames from 'classnames';
import classNamesBinder from 'classnames/bind';
import styles from './EmailSignup.module.scss';
const cx = classNamesBinder.bind(styles);

export default function EmailSignup({
  className = undefined,
  onSubmit = undefined,
}: {
  onSubmit?: (email: string) => any;
} & Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'>) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className={classNames(cx('base'), className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(email);
        fetch('/api/email-signup', {
          method: 'post',
          body: JSON.stringify({ email }),
          headers: { 'Content-Type': 'application/json' },
        }).then(() => setSubmitted(true));
      }}
    >
      {/* TODO: bell icon */}
      <h2>Stay in the loop</h2>
      <p>Get notifications when roles become available</p>

      <label>
        Email Address

        {!submitted ? (
          <>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="submit" value="Notify me" />
          </>
        ) : (
          <div className={cx('confirmation')}>You’re all set!</div>
        )}
      </label>
    </form>
  );
}
