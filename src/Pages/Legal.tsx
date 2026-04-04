import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Legal = () => {
  const { hash } = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className={`min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto ${theme === "light" ? "text-gray-900" : "text-mg-dark-textPrimary"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-4xl md:text-5xl font-black text-center mb-16 ${theme === "light" ? "text-black" : "text-mg-white"}`}>
          Legal <span className="text-mg-gold">Information</span>
        </h1>

        <section id="terms" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-6 text-mg-gold border-b border-mg-gold/20 pb-2">Terms of Service</h2>
          <div className={`space-y-6 leading-relaxed text-justify ${theme === "light" ? "text-gray-700" : "text-mg-dark-textSecondary"}`}>
            <p>
              <strong>1. Acceptance of Terms</strong><br/>
              Welcome to Marketgod Academy. By accessing our website, purchasing our courses, subscribing to our signals, or using any of our services, you agree to be bound by these Terms of Service. These terms apply to all visitors, users, and others who access or use the Service. If you disagree with any part of the terms, then you may not access the Service.
            </p>
            <p>
              <strong>2. Educational Nature of Services</strong><br/>
              Marketgod Academy is strictly an educational platform. All content provided, including live sessions, video courses, trade ideas, and community discussions, is for informational and educational purposes only. <strong>We are not financial advisors</strong>, and nothing contained herein constitutes financial, investment, legal, or tax advice. You acknowledge that any trading decisions you make are solely your own responsibility.
            </p>
            <p>
              <strong>3. Intellectual Property Rights</strong><br/>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Marketgod Academy and its licensors. Our content is protected by copyright, trademark, and other laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.
            </p>
            <p>
              <strong>4. User Accounts & Security</strong><br/>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. Sharing your account credentials with others is strictly prohibited.
            </p>
            <p>
              <strong>5. Community Access & Telegram Groups</strong><br/>
              Upon purchasing our services, you will be provided with exclusive access links to our private Telegram groups. These links are intended solely for the purchaser. <strong>Sharing of these group links with non-members is strictly prohibited.</strong> Any user found sharing invite links or adding unauthorized members will face immediate removal from the group and termination of all services without refund.
            </p>
            <p>
              <strong>6. Payments & Refund Policy</strong><br/>
              All purchases made on Marketgod Academy, including mentorship programs and signal subscriptions, are final. Due to the immediate digital nature of the content and access to proprietary information, <strong>we do not offer refunds</strong> once access has been granted. Please ensure you understand the product before purchasing.
            </p>
            <p>
              <strong>7. Termination</strong><br/>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </div>
        </section>

        <section id="privacy" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-6 text-mg-gold border-b border-mg-gold/20 pb-2">Privacy Policy</h2>
          <div className={`space-y-6 leading-relaxed text-justify ${theme === "light" ? "text-gray-700" : "text-mg-dark-textSecondary"}`}>
            <p>
              <strong>1. Information Collection</strong><br/>
              We collect several different types of information for various purposes to provide and improve our Service to you. This includes Personal Data (such as email address, first name and last name, phone number) and Usage Data (how the Service is accessed and used).
            </p>
            <p>
              <strong>2. Use of Data</strong><br/>
              Marketgod Academy uses the collected data for various purposes: to provide and maintain the Service, to notify you about changes to our Service, to allow you to participate in interactive features when you choose to do so, to provide customer care and support, to provide analysis or valuable information so that we can improve the Service, and to monitor the usage of the Service.
            </p>
            <p>
              <strong>3. Cookies and Tracking</strong><br/>
              We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
            <p>
              <strong>4. Third-Party Disclosure</strong><br/>
              We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
            </p>
            <p>
              <strong>5. Data Security</strong><br/>
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </div>
        </section>

        <section id="disclaimer" className="mb-16 scroll-mt-32">
          <h2 className="text-2xl font-bold mb-6 text-red-500 border-b border-red-500/20 pb-2">Risk Disclaimer</h2>
          <div className={`p-6 border border-red-500/30 bg-red-500/5 rounded-lg space-y-6 leading-relaxed text-justify ${theme === "light" ? "text-gray-700" : "text-mg-dark-textSecondary"}`}>
            <p className={`font-bold ${theme === "light" ? "text-red-600" : "text-red-400"}`}>HIGH RISK INVESTMENT WARNING:</p>
            <p>
              Trading foreign exchange (Forex), cryptocurrencies, and contracts for differences (CFDs) on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade any such leveraged products, you should carefully consider your investment objectives, level of experience, and risk appetite.
            </p>
            <p>
              <strong>Possibility of Loss:</strong> The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with trading on margin and seek advice from an independent financial advisor if you have any doubts.
            </p>
            <p>
              <strong>No Financial Advice:</strong> Any opinions, news, research, analyses, prices, or other information contained on this website is provided as general market commentary and does not constitute investment advice. Marketgod Academy will not accept liability for any loss or damage, including without limitation to, any loss of profit, which may arise directly or indirectly from use of or reliance on such information.
            </p>
            <p className="text-xs opacity-70">
              <strong>Hypothetical Performance Disclosure:</strong><br/>
              HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN LIMITATIONS. UNLIKE AN ACTUAL PERFORMANCE RECORD, SIMULATED RESULTS DO NOT REPRESENT ACTUAL TRADING. ALSO, SINCE THE TRADES HAVE NOT BEEN EXECUTED, THE RESULTS MAY HAVE UNDER-OR-OVER COMPENSATED FOR THE IMPACT, IF ANY, OF CERTAIN MARKET FACTORS, SUCH AS LACK OF LIQUIDITY. SIMULATED TRADING PROGRAMS IN GENERAL ARE ALSO SUBJECT TO THE FACT THAT THEY ARE DESIGNED WITH THE BENEFIT OF HINDSIGHT. NO REPRESENTATION IS BEING MADE THAT ANY ACCOUNT WILL OR IS LIKELY TO ACHIEVE PROFIT OR LOSSES SIMILAR TO THOSE SHOWN.
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Legal;


