import { Link } from "react-router-dom";
import { Scale, FileText, Eye, Cookie, MailOpen } from "lucide-react";

export default function Legal() {
  const legalDocuments = [
    {
      icon: Scale,
      title: "Terms of Service",
      description:
        "Our terms and conditions governing the use of RbxAssets platform and services",
      link: "/terms",
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      icon: Eye,
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      link: "/privacy",
      color: "bg-purple-500/10 text-purple-400",
    },
    {
      icon: Cookie,
      title: "Cookie Policy",
      description:
        "Information about cookies and how we use them on our website",
      link: "/cookies",
      color: "bg-orange-500/10 text-orange-400",
    },
    {
      icon: MailOpen,
      title: "Contact Us",
      description:
        "Get in touch with our legal or support teams for any inquiries",
      link: "/contact",
      color: "bg-green-500/10 text-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Legal Information
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl">
              Review our legal documents, terms of service, privacy policy, and
              other important legal information regarding RbxAssets.
            </p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-12 md:py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Our Legal Documents</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {legalDocuments.map((doc) => {
              const Icon = doc.icon;
              return (
                <Link
                  key={doc.title}
                  to={doc.link}
                  className="group p-6 border border-border/50 rounded-lg hover:border-border hover:bg-secondary/20 transition-all"
                >
                  <div className="flex gap-4 items-start">
                    <div
                      className={`w-12 h-12 rounded-lg ${doc.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Policies Section */}
      <section className="py-12 md:py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Key Policies at a Glance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3 p-6 bg-secondary/30 border border-border/30 rounded-lg">
              <h3 className="font-semibold text-foreground">
                User Responsibilities
              </h3>
              <p className="text-sm text-muted-foreground">
                You are responsible for maintaining account confidentiality, not
                sharing your password, and ensuring accurate information.
              </p>
            </div>
            <div className="space-y-3 p-6 bg-secondary/30 border border-border/30 rounded-lg">
              <h3 className="font-semibold text-foreground">
                Content Ownership
              </h3>
              <p className="text-sm text-muted-foreground">
                You retain ownership of content you upload. We have the right to
                use it for platform operations.
              </p>
            </div>
            <div className="space-y-3 p-6 bg-secondary/30 border border-border/30 rounded-lg">
              <h3 className="font-semibold text-foreground">Data Protection</h3>
              <p className="text-sm text-muted-foreground">
                We use industry-standard encryption and security measures to
                protect your personal data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-12 md:py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Compliance & Standards</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  GDPR Compliant
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We comply with the General Data Protection Regulation for
                  users in the European Union.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  CCPA Compliant
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We respect California Consumer Privacy Act requirements for
                  California residents.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  COPPA Compliant
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We comply with the Children's Online Privacy Protection Act
                  and do not knowingly collect data from children under 13.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Secure Data Handling
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We use encryption, secure authentication, and
                  industry-standard security practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prohibited Activities Section */}
      <section className="py-12 md:py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Prohibited Activities</h2>
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-4">
              The following activities are strictly prohibited on RbxAssets:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-destructive">•</span>
                <span>
                  Uploading content that infringes intellectual property rights
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">•</span>
                <span>Harassment, abuse, or discriminatory behavior</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">•</span>
                <span>Spam, phishing, or fraudulent activities</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">•</span>
                <span>Hacking, circumventing security measures</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">•</span>
                <span>Malware or dangerous code distribution</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive">•</span>
                <span>Unauthorized access to accounts or systems</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Questions About Our Policies?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you have any questions or concerns about our legal documents or
            policies, please don't hesitate to contact us.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
