import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="payForm Pro: Modular RazorPay Integration"
        />
        <meta
          name="keywords"
          content="payForm pro, Tanveer,Razorpay Integration, Payment Processing, Entry Management, Payment Gateway Integration, Secure Payments"
        />
        <meta name="author" content="Tanveer H." />
        <meta
          property="og:title"
          content="payForm Pro: Modular RazorPay Integration by Tanveer"
        />
        <meta
          property="og:description"
          content="PayForm Pro: Simplify Your Payments with Effortless Form Integration and Razorpay. Securely payments, manage entries, and generate order seamlessly."
        />
        <meta property="og:image" content="./opengraph-image.png" />
        <meta property="og:url" content="https://tanveer-payformpro.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="payForm Pro: Modular RazorPay Integration by Tanveer H."
        />
        <meta
          name="twitter:description"
          content="PayForm Pro: Simplify Your Payments with Effortless Form Integration and Razorpay. Securely payments, manage entries, and generate order seamlessly."
        />
        <meta name="twitter:image" content="./opengraph-image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
