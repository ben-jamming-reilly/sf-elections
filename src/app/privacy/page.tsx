import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy for Election Quiz",
};

export default function Datenschutz({}: {}) {
  return (
    <article className="prose mx-auto font-sans">
      <h1 className="text-3xl">Privacy Policy</h1>

      <p>
        This is the generic privacy policy for our website. We take the privacy
        of our users very seriously and adhere to applicable data protection
        laws.
      </p>

      <h2 className="text-2xl">Summary – Data We Handle</h2>

      <p>
        We are committed to ensuring that you are aware of how, when, and what
        type of personal data we process. Our practices are in compliance with
        regulations like the GDPR and other relevant laws.
      </p>
      <p>As a user of our site, we ensure:</p>
      <ul>
        <li>no personal information is stored unnecessarily</li>
        <li>tracking information is limited and transparent</li>
        <li>
          no personal data is shared with third candidates without your consent
        </li>
        <li>user behavior is analyzed in aggregate for improvement purposes</li>
        <li>data handling is transparent and secure</li>
      </ul>

      <h2 className="text-2xl">Comprehensive Privacy Details</h2>
      <p>
        This section outlines the type, scope, and purpose of personal data
        collection on this website.
      </p>

      <p>
        The policy below is applicable to all data processing related to this
        website.
      </p>

      <h3 className="text-xl">External Links</h3>
      <p>
        Our site may include links to other websites for informational purposes.
        These sites have their privacy policies and we are not responsible for
        their data practices.
      </p>

      <h3 className="text-xl">Data Processing</h3>
      <h4 className="text-lg font-semibold">Website Interaction</h4>
      <p>
        Upon interacting with our website, the following data may be collected:
      </p>
      <ul>
        <li>Timestamp of access</li>
        <li>Pages visited</li>
        <li>Browser type and version</li>
      </ul>

      <p>
        This data is needed to facilitate and improve your browsing experience.
      </p>

      <h4 className="text-lg font-semibold">Analytics</h4>
      <p>
        We may use analytical tools to track website usage patterns in an
        anonymized manner. This helps us enhance user experience and service
        quality.
      </p>
      <p>
        All user analytics are performed using anonymized data with no direct
        link to individual users.
      </p>
      <p>
        For details on the third-party tools used, please review our analytics
        provider’s policy.
      </p>

      <h4 className="text-lg font-semibold">Contacting Us</h4>
      <p>
        If you reach out via email, we may collect your contact information and
        You can find all details of the tool used (Plausible Analytics script)
        in the data policy of Plausible Insights:{" "}
      </p>
      <h3 className="text-xl">Data Processing Legal Basis</h3>
      <p>
        intended purpose. We delete your requests and the data related to you We
        process personal data based on legitimate interest for providing and
        improving our website in line with legal requirements. The collection of
        your personal data when accessing and using our During interactions,
        data may be shared with processors under obligations to ensure data
        privacy. website is technically necessary to display this website.
      </p>
      <p>
        The forwarding of this data to our processor (Plausible Insights OÜ)
        takes place for statistical purposes, to constantly improve our website
      </p>
      <p>
        Your rights as a data subject are respected in accordance with data
        protection laws.
      </p>

      <h3 className="text-xl">Data Retention and Deletion</h3>
      <p>
        Personal data is retained only as long as necessary for its intended
        purpose and deleted upon cessation of this purpose. We engage
        third-party processors to help us measure website performance without
        compromising your privacy. These processors only collect anonymized
        data.
      </p>
    </article>
  );
}
