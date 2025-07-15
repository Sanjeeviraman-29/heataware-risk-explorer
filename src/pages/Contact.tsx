import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  BookOpen, 
  Users, 
  Shield,
  Thermometer,
  Globe,
  FileText
} from "lucide-react";

const Contact = () => {
  const resources = [
    {
      category: "Government Resources",
      icon: Shield,
      items: [
        { title: "EPA Heat Island Reduction", url: "#", description: "Federal guidance on urban heat island mitigation" },
        { title: "NOAA Climate Data", url: "#", description: "Historical and real-time climate data" },
        { title: "CDC Heat & Health", url: "#", description: "Health guidance for extreme heat events" }
      ]
    },
    {
      category: "Research & Academic",
      icon: BookOpen,
      items: [
        { title: "Urban Climate Research", url: "#", description: "Latest academic research on urban heat" },
        { title: "Climate Adaptation Database", url: "#", description: "Comprehensive adaptation strategies" },
        { title: "Heat Mitigation Case Studies", url: "#", description: "Real-world implementation examples" }
      ]
    },
    {
      category: "Community Organizations",
      icon: Users,
      items: [
        { title: "Local Climate Action Groups", url: "#", description: "Connect with community advocates" },
        { title: "Urban Planning Associations", url: "#", description: "Professional planning resources" },
        { title: "Environmental Justice Organizations", url: "#", description: "Equity-focused climate solutions" }
      ]
    },
    {
      category: "International Initiatives",
      icon: Globe,
      items: [
        { title: "C40 Cities Climate Leadership", url: "#", description: "Global city climate network" },
        { title: "UN-Habitat Urban Planning", url: "#", description: "International urban development" },
        { title: "IPCC Climate Reports", url: "#", description: "Authoritative climate science" }
      ]
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Climate Scientist",
      expertise: "Urban Heat Island Research",
      email: "s.chen@heataware.org"
    },
    {
      name: "Marcus Rodriguez",
      role: "Urban Planner",
      expertise: "Sustainable City Design",
      email: "m.rodriguez@heataware.org"
    },
    {
      name: "Dr. Aisha Patel",
      role: "Public Health Expert",
      expertise: "Heat-Related Health Impacts",
      email: "a.patel@heataware.org"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Contact & Resources</h1>
          <p className="text-lg opacity-90">
            Get in touch with our team and explore additional resources for urban heat mitigation
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Get in Touch
              </CardTitle>
              <CardDescription>
                Have questions about our data or need support implementing heat mitigation strategies?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <Input placeholder="Enter your first name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name</label>
                  <Input placeholder="Enter your last name" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="your.email@example.com" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Organization</label>
                <Input placeholder="Your organization (optional)" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="What's this about?" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Tell us how we can help you..."
                  className="min-h-[120px]"
                />
              </div>
              
              <Button variant="hero" className="w-full">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">info@heataware.org</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      123 Climate Street<br />
                      Research City, RC 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Our Team
                </CardTitle>
                <CardDescription>
                  Meet the experts behind HeatAware
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.expertise}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore these valuable resources for urban heat mitigation research, policy development, and community action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{item.title}</h4>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Credits Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Credits & Acknowledgments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              HeatAware is developed in collaboration with leading climate research institutions, 
              urban planning organizations, and public health agencies. We acknowledge the following 
              contributors to our platform:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium mb-2">Data Sources</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>NOAA Climate Data Online</li>
                  <li>NASA Earth Observing System</li>
                  <li>Local Weather Station Networks</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Research Partners</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Urban Climate Research Center</li>
                  <li>Institute for Climate Adaptation</li>
                  <li>Public Health Climate Consortium</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Technical Support</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Climate Modeling Initiative</li>
                  <li>Open Source GIS Community</li>
                  <li>Environmental Data Standards</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                © 2024 HeatAware Platform. This project is supported by climate research grants and 
                community partnerships. For data usage policies and attribution requirements, please 
                refer to our documentation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;