// components/PrivacyPolicy.jsx
import { Shield, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'

const PolicySection = ({ title, children }) => {
  return (
    <div className="mb-6 border-b border-gray-200 pb-2">
      <div className="py-3 text-left font-medium text-gray-900">
        <span className="text-lg">{title}</span>
      </div>
      <div className="mt-2 text-gray-600 space-y-4 pb-4">
        {children}
      </div>
    </div>
  )
}

const PrivacyPolicy = () => {
  const lastUpdated = "January 8, 2025"
  
  return (
    <>
      <Head>
        <title>Privacy Policy | NoFareHikes.net</title>
        <meta name="description" content="Learn about how NoFareHikes.net collects, uses, and protects your personal information." />
        <meta name="keywords" content="privacy policy, data protection, personal information, NoFareHikes" />
        <meta property="og:title" content="Privacy Policy | NoFareHikes.net" />
        <meta property="og:description" content="Learn about how NoFareHikes.net collects, uses, and protects your personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nofarehikes.net/privacy" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | NoFareHikes.net" />
        <meta name="twitter:description" content="Learn about how NoFareHikes.net collects, uses, and protects your personal information." />
      </Head>
      
      <div className="mx-auto py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated: {lastUpdated}
          </p>
        </div>
        
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-sm">
          <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center text-gray-700">
              <Shield className="h-5 w-5 mr-2 text-purple-600" />
              <h2 className="text-xl font-semibold">Privacy Policy</h2>
            </div>
            <div className="ml-auto flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Updated: {lastUpdated}
            </div>
          </div>
          
          <div className="privacy-content">
            <div className="mb-6">
              <p className="text-gray-600">
                Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit NoFareHikes.net.
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </div>
            
            <PolicySection title="1. Information We Collect">
              <p className="font-medium">We may collect information about you in a variety of ways including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  <span className="font-medium">Personal Data:</span> Voluntarily provided information which may include your name, email address, and preferences when you register on the site.
                </li>
                <li>
                  <span className="font-medium">Usage Data:</span> Information collected automatically when visiting our site, which may include IP address, browser type, pages visited, time spent on pages, and other usage statistics.
                </li>
                <li>
                  <span className="font-medium">Cookies:</span> We use cookies to enhance your experience on our site. These small files track, save, and store information about your interactions with and usage of the website.
                </li>
              </ul>
            </PolicySection>
            
            <PolicySection title="2. How We Use Your Information">
              <p>We may use the information we collect from you in the following ways:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>To personalize your experience and deliver content most relevant to you</li>
                <li>To improve our website to better serve you</li>
                <li>To send periodic emails regarding updates or other products and services</li>
                <li>To monitor and analyze usage and trends to improve your experience with the site</li>
                <li>To notify you about changes to our service</li>
              </ul>
            </PolicySection>
            
            <PolicySection title="3. Disclosure of Your Information">
              <p>We may share information we have collected about you in certain situations, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  <span className="font-medium">Business Transfers:</span> If we or our subsidiaries are involved in a merger, acquisition, or sale of assets, your information may be transferred.
                </li>
                <li>
                  <span className="font-medium">Third-Party Service Providers:</span> We may share your information with third parties that perform services for us or on our behalf, such as analytics.
                </li>
                <li>
                  <span className="font-medium">Legal Requirements:</span> We may disclose your information where required to comply with the law or legal process.
                </li>
              </ul>
            </PolicySection>
            
            <PolicySection title="4. Security of Your Information">
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. 
                While we have taken reasonable steps to secure the personal information you provide to us, please be aware 
                that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission 
                can be guaranteed against any interception or other type of misuse.
              </p>
            </PolicySection>
            
            <PolicySection title="5. Children's Privacy">
              <p>
                Our Service is not directed to anyone under the age of 13. We do not knowingly collect personal information 
                from children under 13. If we become aware that we have collected personal information from a child under 
                age 13 without verification of parental consent, we will take steps to remove that information from our servers.
              </p>
            </PolicySection>
            
            <PolicySection title="6. Your Choices">
              <p className="font-medium">You have the following data protection rights:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>The right to access, update or delete the information we have on you</li>
                <li>The right of rectification - to have your information corrected if it is inaccurate or incomplete</li>
                <li>The right to object to our processing of your personal data</li>
                <li>The right of restriction - to request that we restrict the processing of your personal information</li>
                <li>The right to data portability - to receive a copy of the information we have on you in a structured, machine-readable format</li>
              </ul>
            </PolicySection>
            
            <PolicySection title="7. Cookies and Tracking Technologies">
              <p>
                We may use cookies, web beacons, tracking pixels, and other tracking technologies to help customize the 
                Service and improve your experience. For more information about how we use cookies, please refer to our 
                Cookie Policy posted on the Site.
              </p>
              <p className="mt-2">
                Most web browsers are set to accept cookies by default. You can choose to set your browser to refuse 
                cookies, or to alert you when cookies are being sent. However, some parts of the site may not function 
                properly if you disable cookies.
              </p>
            </PolicySection>
            
            <PolicySection title="8. Third-Party Websites">
              <p>
                The Service may contain links to third-party websites and applications of interest that are not affiliated 
                with us. Once you use these links to leave our site, we have no control over the content and privacy practices 
                of these sites. We encourage you to read the privacy policy of every website you visit.
              </p>
            </PolicySection>
            
            <PolicySection title="9. Changes to This Privacy Policy">
              <p>
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new 
                privacy policy on this page and updating the "Last Updated" date at the top of this page. You are advised 
                to review this privacy policy periodically for any changes.
              </p>
            </PolicySection>
            
            <PolicySection title="10. Contact Us">
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2 font-medium">
                privacy@nofarehikes.net
              </p>
            </PolicySection>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm text-gray-500">
              By using NoFareHikes.net, you acknowledge that you have read and understood our 
              <Link href="/terms" className="text-purple-600 hover:underline"> Terms of Service</Link> and 
              Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
