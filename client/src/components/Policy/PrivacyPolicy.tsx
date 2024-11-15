import Policy from '@/components/Policy/Policy';
import React from 'react';

const PrivacyPolicy = () => {
  const policies = [
    {
      heading: 'Introduction',
      text: (
        <>
          Welcome to <strong>AIDEV</strong>. We are committed to protecting your
          personal information and your right to privacy. If you have any
          questions or concerns about this privacy policy or our practices with
          regard to your personal information, please contact us at [contact
          email].
        </>
      ),
    },
    {
      heading: 'Information We Collect',
      text: 'We collect personal information that you provide to us, including:',
      bullets: [
        <>
          <strong>Personal Information Provided by You:</strong> Name, email
          address, phone number, mailing address, payment information, and other
          similar information.
        </>,
        <>
          <strong>Automatically Collected Information:</strong> IP address,
          browser type, device information, usage data, and other similar
          information when you visit our website.
        </>,
      ],
    },
    {
      heading: 'How We Use Your Information',
      text: 'We use the information we collect in the following ways:',
      bullets: [
        'To provide, operate, and maintain our services.',
        'To improve, personalize, and expand our website.',
        'To communicate with you, either directly or through one of our partners.',
        'To send you promotional materials, updates, and other marketing communications (with your consent).',
        'To prevent fraudulent activity and ensure compliance with our policies.',
      ],
    },
    {
      heading: 'Sharing Your Information',
      text: 'We do not share your personal information with third parties except in the following situations:',
      bullets: [
        <>
          <strong>Service Providers:</strong> We may share information with
          third-party vendors who provide services on our behalf, such as
          payment processing, data analysis, email delivery, and hosting.
        </>,
        <>
          <strong>Legal Requirements:</strong> We may disclose your information
          if required by law, such as in response to a court order or legal
          process.
        </>,
      ],
    },
    {
      heading: 'Cookies and Tracking Technologies',
      text: 'We use cookies and similar tracking technologies to track the activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.',
    },
    {
      heading: 'Your Privacy Rights',
      text: 'Depending on your location, you may have the following rights regarding your personal information:',
      bullets: [
        'The right to access, update, or delete the information we have on you.',
        'The right to object to or restrict the processing of your information.',
        'The right to data portability.',
        'The right to withdraw consent at any time if we are relying on your consent to process your personal information.',
      ],
      textBottom: (
        <>
          To exercise these rights, please contact us at{' '}
          <a href="mailto:aidev@gmail.com">
            <strong>aidev@gmail.com</strong>
          </a>
          .
        </>
      ),
    },

    {
      heading: 'Security',
      text: 'We take reasonable measures to protect your personal information, but no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.',
    },
    {
      heading: 'Changes to This Privacy Policy',
      text: 'We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. Please review this policy periodically for any changes.',
    },
    {
      heading: 'Contact Us',
      text: 'If you have any questions about this privacy policy, please contact us:',
    },
  ];

  return (
    <div className="mx-6 mb-[90px] max-w-[1064px] md:mx-8 lg:mx-4 2xl:mx-auto">
      {policies.map((policy, index) => (
        <Policy
          key={index}
          heading={policy.heading}
          text={policy.text}
          index={index + 1}
          isBullet={Array.isArray(policy.bullets)}
          bullets={policy.bullets || []}
          textBottom={policy.textBottom}
        />
      ))}
    </div>
  );
};

export default PrivacyPolicy;
