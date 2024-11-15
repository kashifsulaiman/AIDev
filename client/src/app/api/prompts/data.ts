export const prompts = [
  {
    id: 1,

    title: 'Help launch my personal blog',

    description:
      'Design a user-friendly, visually appealing single-page blog application using Tailwind CSS. The layout should be intuitive, with a focus on readability and aesthetics, featuring a vibrant color palette that enhances the user experience.!',

    template: 'blog_app',

    apiKey: 'generate-blog-code',
    question: ` Title: Single-Page Blog App Component Design
Objective: Design a user-friendly, visually appealing single-page blog application using Tailwind CSS. The layout should be intuitive, focusing on readability and aesthetics, with a vibrant color palette that enhances the user experience.

Requirements:
Layout
Design a responsive single-page layout with sections for a header, main blog content, sidebar, and footer.
Use a mobile-first design strategy to ensure a smooth experience on both desktop and mobile devices.
Header
Navigation Bar: Create a navigation bar with links to sections like Home, About, Categories, and Contact.
Logo and Search Bar: Include a logo on the left side and a search bar on the right for easy content access.
Styling: Use a black background but avoid the fixed class to keep it simple.
Hero Section
Hero Content: Design the hero section with a captivating title (e.g., "Welcome to My Blog") and a short introduction about the blog's purpose.
Call-to-Action: Add a call-to-action button (e.g., "Read More") that scrolls down to the main blog content, and use a gradient background color for visual appeal.
Background Color: Apply a dark grey background color to the hero section to enhance contrast and make the content stand out.
Blog Post Preview Section
Layout: Use a grid or flexbox layout for blog post previews, displaying each preview with an image, title, date, and a brief excerpt.
Read More Button: Include a Read More button for each post that links to the full article.
Hover Effects: Use Tailwind CSS utility classes to add hover effects and visual separation between posts.
Card Styling: Incorporate flex layout within the card list to enhance responsiveness and structure.
Sidebar
Content Sections: Add sections for Recent Posts, Popular Posts, and Categories, using distinct cards or lists with icons.
Subscription Form: Include a subscription form for users to sign up for newsletters or updates.
Blog Post Detail Section
Post Content: Create a dedicated section to display full blog posts, including the title, author, publication date, content, and tags.
Comments Section: Incorporate a comments section at the end of each post for user engagement.
Typography: Ensure clear, readable typography with sufficient line spacing and font size.
Footer
Content: Add links to social media, an About section, and copyright information.
Sitemap: Consider including a sitemap for better navigation and user experience.
Styling: Use contrasting colors for visibility, with a dark grey background color for consistency and accessibility.
Color Palette
Palette Choices: Use a vibrant and harmonious color palette that reflects the blogs theme, with soft blues, warm oranges, and neutral tones.
Readability: Ensure the color choices enhance readability and create a welcoming atmosphere.
Accessibility
Guidelines: Follow WCAG guidelines to make all components accessible.
Semantic HTML: Use semantic HTML and ARIA roles where applicable to enhance usability for users with disabilities.
Additional Features
Tagging System: Implement a tagging system for blog posts to facilitate easy navigation between related content.
Social Sharing: Include a feature for users to share posts on social media directly from the blog. add background black in footer header also add white background color and text color black to hero section also add multiple blog cards make it responsive `,
  },

  {
    id: 2,

    title: 'Create a simple Chatbot',

    description:
      'Create a user-friendly chatbot application using Tailwind CSS that features an appealing design with a predominantly black text color scheme.',

    template: 'chatbot_app',

    apiKey: 'generate-chatbot-code',
    question: `Title: Complete Chatbot UI Component Design with Enhanced Input and Send Button in Tailwind CSS

Objective: Create a fully functional, polished chatbot application component in React using Tailwind CSS, with a refined input/question box and a visible, styled “Send” button to ensure the UI looks complete and user-friendly.

Requirements:

Overall Layout:

Maintain a responsive layout with a fixed height of 80vh.
Organize the layout with a sidebar, header, message section, and an input area with a "Send" button.
Header and Message Section:

Retain the fixed header at the top with a black background and white title text ("Chatbot Assistant").
The message section should have a light grey background (bg-gray-100) and scrollable behavior (overflow-y-scroll) with a height of 70vh.
Style user messages and chatbot responses in distinct, rounded speech bubbles with different colors (e.g., user in light blue bg-blue-200, chatbot in light green bg-green-200), using adequate padding and black text.
Input/Question Box and Send Button:

Create a visually appealing input area at the bottom of the chat, fixed to the bottom of the message section.
Design the input field as a rounded, slightly elevated box (using classes like rounded-lg, shadow-md, p-3, and bg-white) to make it stand out.
Place a clearly visible, rounded “Send” button to the right of the input box:
Use an icon or label for "Send" with a color scheme that complements the input area (e.g., bg-blue-500 with white text).
Add hover effects (hover:bg-blue-600) for interactivity and an approachable feel.
Align the input and "Send" button side-by-side using a flex layout for clean positioning and alignment within the input area.
Color Palette and Accessibility:

Use soft, neutral colors, ensuring the light grey background in the chat area and predominantly black text for readability.
Apply Tailwinds accessibility classes (like focus:ring) for keyboard navigation and include semantic HTML elements.
Additional Features:

Include a loading spinner or subtle animation when the chatbot is processing a request.
Add a thumbs-up/thumbs-down feedback button for users to rate the chat experience.
Notes: Use Tailwind CSS classes exclusively for styling, keeping inline styles minimal to ensure flexibility for customization.
do not make side bar also shorten the height of chat area it show scroll so less some height.

`,
  },

  {
    id: 3,

    title: 'Build an energy saving calculator',

    description:
      'Develop a user-friendly energy-saving calculator that allows users to add and manage multiple appliances using Tailwind CSS. The design should be intuitive, visually appealing.',

    template: 'calculator_app',

    apiKey: 'generate-energy-calculator-code',
    question: `Title: Multi-Appliance Energy Saving Calculator Component Design
Objective: Design an intuitive, visually appealing "Multi-Appliance Energy Saving Calculator" component from scratch. This calculator should be user-friendly, responsive, and developed using Tailwind CSS to clearly communicate potential energy savings in an engaging and cohesive style.

Design Requirements:
1. Overall Layout and Component Design
Responsive Layout: Craft a single-page responsive design that optimizes viewing on both desktop and mobile.
Section Organization: Structure the layout into distinct sections for Appliance Input, Calculation Results, and Energy-Saving Tips.
2. Header
Title & Tagline: Display the component title prominently in bold, paired with a brief tagline inviting users to explore savings (e.g., "Calculate your energy savings by adding multiple appliances!").
Styling: Set the header background to a solid black with light, contrasting text for easy readability.
3. Appliance Input Section
Input Field Design: Design an input form where users can add multiple appliances.
Fields Required: Appliance Name (text), Energy Consumption (watts), Hours Used Per Day, Cost Per kWh.
Field Styling: Use light grey borders around input fields to define the area, maintaining a clean and simple look.
Add Appliance Button: Style an Add Appliance button in blue, visually distinct and prominent for easy identification.
Input Section Layout: Arrange each set of input fields within a visually distinct card format, with ample padding and spacing for clarity.
4. Calculation Button
Placement and Design: Place a prominent Calculate Savings button below the appliance inputs. Style this button in bold black to make it stand out as the main action.
5. Results Table Section
Table or List Design: Implement a clear, organized table or list to display results, showing each appliances energy consumption and total savings.
Data Visualization: Include simple visual elements like a bar or pie chart for an engaging representation of data.
6. Tips and Recommendations Section
Content Styling: Display personalized energy-saving tips using cards or bullet points. Style each tip card with borders or light backgrounds to ensure clarity and distinction.
7. Color Palette
Harmonious Colors: Use a palette of fresh greens and blues to convey sustainability, with a light background and black text for readability.
Background Color: Ensure a cohesive background color throughout the component, aligning with the sustainable theme.
8. Accessibility
Design for Accessibility: Follow WCAG guidelines to ensure usability for all users, including semantic HTML elements and ARIA roles for screen readers.
9. Additional Features
Reset Button: Include a Reset button to clear all input fields, enhancing user control.
Save/Email Functionality: Enable users to save or email their results for future reference.`,
  },

  {
    id: 4,

    title: 'Establish Online Booking Management',

    description:
      'Develop a user-friendly hotel booking application using Tailwind CSS, featuring a visually appealing design that maintains predominantly black text throughout.',

    template: 'booking_app',

    apiKey: 'generate-booking-code',
    question: `
Title: Hotel Booking App Component Design

Objective: Develop a user-friendly hotel booking application using Tailwind CSS, featuring a visually appealing design that maintains predominantly black text throughout. The app should facilitate easy navigation and provide a seamless booking experience for users.

Requirements:

Layout:

The app should have a responsive single-page layout that adapts well to both desktop and mobile devices.
Utilize a clean, grid-based structure to organize content effectively, ensuring easy access to essential features.

Header:
Design a prominent header that includes the apps logo on the left and navigation links on the right (e.g., Home, Destinations, About Us, Contact).
Implement a search bar in the header for users to quickly search for hotels by location and date.
Use header color as black and header font as white

Hero Section:
Create a hero section below header with a dummy image related to travel or hospitality, overlaid with a welcoming tagline (e.g., Find Your Perfect Stay).
Include a search form within the hero section, allowing users to enter their destination, check-in/check-out dates, and number of guests.
Use rounded input fields and buttons styled with Tailwind CSS for a modern look.

Featured Hotels Section:
Design a grid layout to showcase featured hotels with dummy images, names, star ratings, and a brief description.
Each hotel card should include a View Details button that leads to more information about the hotel.
Ensure that the card backgrounds are subtle to allow the dummy images to stand out while maintaining a black text color for descriptions.

Booking Details Section:
Create a section where users can view booking details after selecting a hotel.
Include options for room selection, additional services (e.g., breakfast, airport shuttle), and a summary of costs.
Ensure this section is visually organized with clear headings and call-to-action buttons for Proceed to Payment.

Footer:
Add a footer that includes links to important pages such as FAQs, Terms and Conditions, and Privacy Policy.
Consider incorporating social media icons for user engagement while ensuring icon and text remains predominantly white section black background for clarity.

Color Palette:
Suggest a harmonious color palette with soft tones for backgrounds (e.g., light grays or whites) and vibrant accents for buttons and highlights, ensuring that black text is readable against all colors.
Use consistent colors throughout the app for buttons, links, and headings to maintain a cohesive look.

Accessibility:
Ensure all components follow accessibility guidelines (WCAG) to cater to a diverse user base.
Use semantic HTML elements and ARIA roles to enhance usability for individuals with disabilities.

Additional Features:
Include a user authentication system for booking management, enabling users to create accounts and view their past bookings.
Consider implementing a review system where users can leave feedback on their hotel experiences.
    `,
  },

  {
    id: 5,

    title: 'Build a Fitness App',

    description:
      'Create a user-friendly, visually appealing single-page fitness application using Tailwind CSS. The design should be intuitive and engaging, featuring a color palette that promotes a sense of health and vitality.',

    template: 'fitness_app',

    apiKey: 'generate-fitness-code',
    question: `Title: Single-Page Fitness App Component Design

Objective: Create a user-friendly, visually appealing single-page fitness application using Tailwind CSS. The design should be intuitive and engaging, featuring a color palette that promotes a sense of health and vitality.

Requirements:

Layout:

The app should be a responsive single-page layout with sections for a header, main content area, and footer.
Use a mobile-first design approach to ensure a seamless experience across devices.

Header:

Include a navigation bar with links to different sections such as Home, Workouts, Nutrition, and Contact.
Feature a prominent logo on the left side and a call-to-action button (e.g., Get Started or Join Now) on the right.
The header background colour should be black.
Keep navbar position absolute. do not use fixed class

Hero Section:

Create a hero section with a motivational tagline (e.g., Achieve Your Fitness Goals) and a visually dummy background image related to fitness.
Include a brief description of the app's features and benefits, followed by a call-to-action button leading to the workout section.

Workout Section:
Design a grid layout to showcase various workout categories (e.g., Cardio, Strength, Flexibility).
Each category should have an dummy image, title, brief description, and a button linking to detailed workouts.
Use Tailwind CSS utility classes for spacing, alignment, and hover effects.

Nutrition Section:
Incorporate a visually appealing card layout to highlight healthy recipes or meal plans.
Each card should include a dummy image, title, a short description, and a button for more details.
Consider using icons to represent different food groups or meal types.

Testimonials:
Add a testimonial section featuring quotes from users about their fitness journey with the app.
Use a slider or carousel component for dynamic display.
Ensure a clean, easy-to-read font and design that enhances user engagement.

Footer:
Create a footer with links to social media profiles, a newsletter signup form, and copyright information.
Use contrasting colors to ensure readability and accessibility.

Color Palette:
Suggest a color palette that conveys health and energy, such as greens, blues, and oranges.
Ensure the colors are harmonious and visually appealing while maintaining good contrast for text readability.

Accessibility:
Ensure all components follow accessibility guidelines (WCAG) to make the app usable for everyone.
Use semantic HTML elements and ARIA roles where appropriate.

Additional Features:
Include functionality for users to track their workouts and nutrition goals.
Consider integrating a calendar or progress tracker component for user engagement.`,
  },
];
