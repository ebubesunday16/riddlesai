// components/TermsOfService.jsx
import { FileText, Clock, ArrowLeft } from 'lucide-react'
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

const TermsOfService = () => {
  const lastUpdated = "January 13, 2025"
  
  return (
    <>
      <Head>
        <title>Terms of Service | NoFareHikes.net</title>
        <meta name="description" content="Read our Terms of Service to understand the rules and guidelines for using NoFareHikes.net." />
        <meta name="keywords" content="terms of service, legal terms, user agreement, NoFareHikes" />
        <meta property="og:title" content="Terms of Service | NoFareHikes.net" />
        <meta property="og:description" content="Read our Terms of Service to understand the rules and guidelines for using NoFareHikes.net." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nofarehikes.net/terms" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | NoFareHikes.net" />
        <meta name="twitter:description" content="Read our Terms of Service to understand the rules and guidelines for using NoFareHikes.net." />
      </Head>
      
      <div className=" mx-auto py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">
            Last updated: {lastUpdated}
          </p>
        </div>
        
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-sm">
          <div className="flex items-center mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center text-gray-700">
              <FileText className="h-5 w-5 mr-2 text-purple-600" />
              <h2 className="text-xl font-semibold">Terms of Service</h2>
            </div>
            <div className="ml-auto flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Updated: {lastUpdated}
            </div>
          </div>
          
          <div className="terms-content">
            <div className="mb-6">
              <p className="text-gray-600">
                Welcome to NoFareHikes.net. These Terms of Service govern your use of our website. 
                By accessing or using our service, you agree to be bound by these Terms. Please read them carefully.
              </p>
            </div>
            
            <PolicySection title="1. Acceptance of Terms">
              <p>
                By accessing or using NoFareHikes.net ("the Service"), you agree to be bound by these Terms of Service. 
                If you disagree with any part of the terms, you may not access the Service.
              </p>
            </PolicySection>
            
            <PolicySection title="2. Description of Service">
              <p>
                NoFareHikes.net provides riddles, puzzles, and brain teasers for entertainment and educational purposes.
                Our content is organized by categories and difficulty levels to provide users with an engaging experience.
              </p>
            </PolicySection>
            
            <PolicySection title="3. User Accounts">
              <p>
                Some features of the Service may require registration for an account. You are responsible for maintaining 
                the confidentiality of your account information and for all activities that occur under your account.
              </p>
              <p className="mt-2">
                You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
                We cannot and will not be liable for any loss or damage arising from your failure to comply with this section.
              </p>
            </PolicySection>
            
            <PolicySection title="4. Intellectual Property">
              <p>
                The Service and its original content, features, and functionality are owned by NoFareHikes.net and are protected 
                by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="mt-2">
                You may not modify, reproduce, distribute, create derivative works or adaptations of, publicly display or in 
                any way exploit any of the content in whole or in part except as expressly authorized by us.
              </p>
            </PolicySection>
            
            <PolicySection title="5. User Content">
              <p>
                Our Service may allow you to post, link, store, share and otherwise make available certain information, text, 
                graphics, or other material. You are responsible for the content that you post, including its legality, reliability, 
                and appropriateness.
              </p>
              <p className="mt-2">
                By posting content to the Service, you grant us the right to use, modify, publicly perform, publicly display, 
                reproduce, and distribute such content on and through the Service.
              </p>
            </PolicySection>
            
            <PolicySection title="6. Prohibited Activities">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Violating any applicable laws or regulations
                </li>
                <li>
                  Impersonating any person or entity or falsely stating or misrepresenting your affiliation with a person or entity
                </li>
                <li>
                  Interfering with or disrupting the Service or servers or networks connected to the Service
                </li>
                <li>
                  Engaging in any automated use of the system, such as using scripts to send comments or messages
                </li>
                <li>
                  Attempting to access areas of the Service that you are not authorized to access
                </li>
              </ul>
            </PolicySection>
            
            <PolicySection title="7. Termination">
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
                under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.
              </p>
            </PolicySection>
            
            <PolicySection title="8. Limitation of Liability">
              <p>
                In no event shall NoFareHikes.net, nor its directors, employees, partners, agents, suppliers, or affiliates, be 
                liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss 
                of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability 
                to access or use the Service.
              </p>
            </PolicySection>
            
            <PolicySection title="9. Changes to Terms">
              <p>
                We reserve the right to modify or replace these Terms at any time. It is your responsibility to review these Terms 
                periodically for changes. Your continued use of the Service following the posting of any changes to the Terms 
                constitutes acceptance of those changes.
              </p>
            </PolicySection>
            
            <PolicySection title="10. Contact Us">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mt-2 font-medium">
                legal@nofarehikes.net
              </p>
            </PolicySection>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm text-gray-500">
              By using NoFareHikes.net, you acknowledge that you have read and understood our Terms of Service and 
              <Link href="/privacy" className="text-purple-600 hover:underline"> Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsOfService