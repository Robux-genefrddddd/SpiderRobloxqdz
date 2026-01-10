export default function Cookies() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">Cookie Policy</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your computer or mobile
                device that help us remember information about your visit to
                RbxAssets. They enable our website to function properly and
                provide you with a better browsing experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                2. Why We Use Cookies
              </h2>
              <p>We use cookies for several important reasons:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> To keep your session
                  secure and maintain account information
                </li>
                <li>
                  <strong>Performance Cookies:</strong> To understand how you
                  use our website and improve its performance
                </li>
                <li>
                  <strong>Functional Cookies:</strong> To remember your
                  preferences and personalize your experience
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> To deliver relevant
                  advertisements and measure campaign effectiveness
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                3. Types of Cookies We Use
              </h2>
              <div className="space-y-4 ml-4 border-l-2 border-border pl-4">
                <div>
                  <h3 className="font-semibold text-foreground">
                    3.1 Session Cookies
                  </h3>
                  <p className="text-sm mt-2">
                    These expire when you close your browser and are used to
                    maintain your logged-in session.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    3.2 Persistent Cookies
                  </h3>
                  <p className="text-sm mt-2">
                    These remain on your device for a specified period and help
                    us remember your preferences during future visits.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    3.3 Third-Party Cookies
                  </h3>
                  <p className="text-sm mt-2">
                    Set by our service providers and partners for analytics and
                    advertising purposes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    3.4 Analytics Cookies
                  </h3>
                  <p className="text-sm mt-2">
                    Help us understand visitor behavior and improve our website
                    using services like Google Analytics.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                4. Specific Cookies Used
              </h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-2 text-foreground font-semibold">
                        Cookie Name
                      </th>
                      <th className="text-left py-2 text-foreground font-semibold">
                        Purpose
                      </th>
                      <th className="text-left py-2 text-foreground font-semibold">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-border/30">
                      <td className="py-2">session_id</td>
                      <td className="py-2">Maintains user session</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-2">user_preferences</td>
                      <td className="py-2">Stores user preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-2">_ga</td>
                      <td className="py-2">Google Analytics tracking</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-2">theme_preference</td>
                      <td className="py-2">Remembers light/dark mode</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2">marketing_id</td>
                      <td className="py-2">For marketing campaigns</td>
                      <td className="py-2">6 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                5. How to Control Cookies
              </h2>
              <p>
                You have the right to control how cookies are used on your
                device. You can:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Browser Settings:</strong> Adjust your browser
                  settings to accept or reject cookies
                </li>
                <li>
                  <strong>Selective Blocking:</strong> Block specific types of
                  cookies while allowing others
                </li>
                <li>
                  <strong>Clear Cookies:</strong> Delete all cookies from your
                  device at any time
                </li>
                <li>
                  <strong>Do Not Track:</strong> Enable "Do Not Track" in your
                  browser
                </li>
              </ul>
              <p className="text-sm bg-secondary/30 border border-border rounded-lg p-4 mt-4">
                Please note that disabling cookies may affect the functionality
                of our website and your user experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                6. Third-Party Services
              </h2>
              <p>
                We use the following third-party services that may set cookies:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> For website analytics and
                  performance monitoring
                </li>
                <li>
                  <strong>Stripe:</strong> For payment processing
                </li>
                <li>
                  <strong>Social Media Platforms:</strong> For social sharing
                  and analytics
                </li>
                <li>
                  <strong>Advertising Partners:</strong> For targeted
                  advertising
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                7. Data Retention
              </h2>
              <p>
                Cookies are retained for the durations specified in our cookie
                table above. You can delete cookies at any time through your
                browser settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                8. International Users
              </h2>
              <p>
                If you are located in the EU or UK, we comply with GDPR and PECR
                regulations. We obtain your consent before setting non-essential
                cookies and provide you with clear opt-out options.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                9. Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes
                will be posted on this page with an updated "Last updated" date.
                Continued use of RbxAssets constitutes your acceptance of any
                changes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                10. Contact Us
              </h2>
              <p>
                If you have questions about our use of cookies, please contact
                us:
              </p>
              <div className="bg-secondary/30 border border-border rounded-lg p-4 mt-4">
                <p className="font-semibold text-foreground">
                  RbxAssets Privacy Team
                </p>
                <p>Email: cookies@rbxassets.com</p>
                <p>Address: 123 Creator Street, San Francisco, CA 94102</p>
              </div>
            </section>

            <section className="space-y-4 bg-secondary/30 border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Cookie Consent
              </h2>
              <p>
                By using RbxAssets, you consent to our use of cookies as
                described in this policy. You can withdraw your consent at any
                time by adjusting your browser settings.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
