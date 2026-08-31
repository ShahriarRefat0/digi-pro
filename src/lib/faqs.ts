export type FAQCategory = "Products" | "Purchase" | "Licensing" | "Support";

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  "Products",
  "Purchase",
  "Licensing",
  "Support",
];

export const FAQS_DATA: FAQItem[] = [
  // Products FAQ
  {
    id: "prod-1",
    category: "Products",
    question: "What types of digital products do you offer?",
    answer:
      "We offer a range of digital resources including starter kits, website templates, UI kits, developer tools, e-commerce resources, design assets, and practical digital guides.",
  },
  {
    id: "prod-2",
    category: "Products",
    question: "Are the products ready to use?",
    answer:
      "Most products are designed to give you a strong starting point so you can customize them for your own project. Product-specific requirements and included features are listed on each product page.",
  },
  {
    id: "prod-3",
    category: "Products",
    question: "What technologies are your developer products built with?",
    answer:
      "Our developer-focused products may use technologies such as Next.js, React, TypeScript, Node.js, NestJS, MongoDB, Tailwind CSS, and other modern web technologies.",
  },
  {
    id: "prod-4",
    category: "Products",
    question: "Can I customize the products?",
    answer:
      "Yes. Our templates, starter kits, and developer resources are designed to be customized according to your project requirements.",
  },

  // Purchase FAQ
  {
    id: "purch-1",
    category: "Purchase",
    question: "How do I purchase a product?",
    answer:
      "Select a product, review its details, and use the Buy Now button to continue to the available external purchase page.",
  },
  {
    id: "purch-2",
    category: "Purchase",
    question: "Do you process payments directly on this website?",
    answer:
      "Currently, purchases are completed through the external purchase platform linked to the product.",
  },
  {
    id: "purch-3",
    category: "Purchase",
    question: "Where can I find the product price?",
    answer:
      "The current price is displayed on the product card and product details page.",
  },

  // Licensing FAQ
  {
    id: "lic-1",
    category: "Licensing",
    question: "Can I use a product for commercial projects?",
    answer:
      "Usage depends on the license provided with the specific product. Always review the license information on the product page before using it commercially.",
  },
  {
    id: "lic-2",
    category: "Licensing",
    question: "Can I use a product in multiple projects?",
    answer:
      "License terms can vary between products. Check the individual product license details for the allowed number of projects and usage conditions.",
  },
  {
    id: "lic-3",
    category: "Licensing",
    question: "Can I redistribute or resell the products?",
    answer:
      "Digital products are generally intended for use in your own projects and should not be redistributed or resold unless the specific license explicitly allows it.",
  },

  // Support FAQ
  {
    id: "sup-1",
    category: "Support",
    question: "Do you provide product support?",
    answer:
      "Support availability depends on the individual product. Check the product details for information about documentation, updates, and support.",
  },
  {
    id: "sup-2",
    category: "Support",
    question: "Will products receive updates?",
    answer:
      "Update policies may vary by product. The product page will indicate whether updates are included.",
  },
  {
    id: "sup-3",
    category: "Support",
    question: "What if I have a question before purchasing?",
    answer:
      "You can review the product documentation and details first. If you still need help, use the available contact or support option.",
  },
];
