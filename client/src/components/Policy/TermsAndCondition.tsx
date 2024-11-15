import Policy from '@/components/Policy/Policy';
import React from 'react';

const TermsAndCondition = () => {
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
      heading: 'Use of the Service',
      text: (
        <>
          <strong>Eligibility:</strong> You must be at least [age] years old to
          use our Service. By using the Service, you warrant that you are of
          legal age and have the capacity to enter into this agreement.
          <br />
          <strong>Account Registration:</strong> To access certain features, you
          may need to create an account. You agree to provide accurate and
          complete information when registering and to keep your account
          information up to date.
        </>
      ),
      bullets: [
        'Personal Information Provided by You: Name, email address, phone number, mailing address, payment information, and other similar information.',
        'Automatically Collected Information: IP address, browser type, device information, usage data, and other similar information when you visit our website.',
      ],
    },
    {
      heading: 'User Obligations',
      text: (
        <>
          <strong>Acceptable Use:</strong> You agree not to use the Service in
          any way that is unlawful, harmful, or prohibited by these Terms. This
          includes but is not limited to:
        </>
      ),
      bullets: [
        "Engaging in any conduct that could harm the website or interfere with other users' access.",
        'Using the Service to send spam, unauthorized advertisements, or other solicitations.',
        'Attempting to gain unauthorized access to other systems or networks connected to the Service.',
      ],
    },
    {
      heading: 'Intellectual Property',
      text: (
        <>
          <strong>Ownership:</strong> All content, materials, and intellectual
          property on the Service are owned by [Your Company Name] or its
          licensors. You may not use, reproduce, or distribute any part of the
          Service without express written permission from us.
          <br />
          <strong>User-Generated Content:</strong> By submitting content (text,
          images, videos, etc.) to our Service, you grant [Your Company Name] a
          non-exclusive, royalty-free, worldwide license to use, display,
          reproduce, and distribute your content for the purpose of operating
          and promoting the Service.
        </>
      ),
    },
    {
      heading: 'Purchases and Payments',
      text: (
        <>
          We use cookies and similar tracking technologies to track the activity
          on our website and store certain information. You can instruct your
          browser to refuse all cookies or to indicate when a cookie is being
          sent.
          <br />
          <strong>Pricing:</strong> All prices displayed on our website are
          subject to change without notice. We reserve the right to modify or
          discontinue any product or service at any time.
          <br />
          <strong>Refund Policy:</strong> [Your refund policy here. E.g.,
          &quot;Refunds may be provided under certain conditions as outlined in
          our Refund Policy.&quot;]
        </>
      ),
    },
    {
      heading: 'Limitation of Liability',
      text: 'To the maximum extent permitted by law, [Your Company Name] shall not be liable for any damages, including, without limitation, direct, indirect, incidental, special, or consequential damages, resulting from the use or inability to use the Service.',
    },
    {
      heading: 'Termination',
      text: 'We may terminate or suspend your access to the Service at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.',
    },
    {
      heading: 'Changes to These Terms',
      text: "We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least [30 days'] notice prior to any new terms taking effect. By continuing to use the Service after those revisions become effective, you agree to be bound by the revised Terms.",
    },
    {
      heading: 'Governing Law',
      text: 'These Terms shall be governed by and construed in accordance with the laws of [State/Province], [Country], without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in [Jurisdiction].',
    },
  ];

  return (
    <div className="mx-4 mb-12 max-w-[1064px] 2xl:mx-auto">
      {policies.map(({ heading, text, bullets }, index) => (
        <Policy
          key={index}
          heading={heading}
          text={text}
          index={index + 1}
          isBullet={Boolean(bullets)}
          bullets={bullets}
        />
      ))}
    </div>
  );
};

export default TermsAndCondition;
