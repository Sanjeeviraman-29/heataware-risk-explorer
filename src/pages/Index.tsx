import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Thermometer, MapPin, BarChart3, Users, Lightbulb, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-heatwave.jpg";

const Index = () => {
  const features = [
    {
      icon: MapPin,
      title: "Interactive Risk Maps",
      description: "Visualize heat risks across your city with detailed, color-coded maps showing temperature variations and vulnerable areas.",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Access comprehensive dashboards with temperature trends, population exposure data, and historical climate patterns.",
    },
    {
      icon: Lightbulb,
      title: "Mitigation Strategies",
      description: "Get evidence-based recommendations for reducing urban heat, from green infrastructure to policy solutions.",
    },
    {
      icon: Shield,
      title: "Community Protection",
      description: "Identify at-risk populations and develop targeted interventions to protect vulnerable communities from extreme heat.",
    },
  ];

  const stats = [
    { value: "42.3°C", label: "Peak Temperature Today", trend: "up", change: "+3.2°", icon: Thermometer },
    { value: "2.4M", label: "People at Risk", trend: "stable", change: "85% of metro area", icon: Users },
    { value: "27%", label: "Heat Island Effect", trend: "up", change: "+4.8% this year", icon: BarChart3 },
    { value: "18", label: "Critical Alert Zones", trend: "up", change: "6 new this week", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">HeatAware</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/risk-visualization" className="text-muted-foreground hover:text-primary transition-colors">
                Risk Maps
              </Link>
              <Link to="/mitigation" className="text-muted-foreground hover:text-primary transition-colors">
                Mitigation
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
            <Button variant="hero" asChild>
              <Link to="/risk-visualization">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero"></div>
          {/* Floating heat particles animation */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-orange-400/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-red-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-yellow-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm animate-fade-in-down">
              Urban Climate Intelligence Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Stay Safe from Urban
              <span className="block bg-gradient-to-r from-orange-200 to-red-200 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Heatwaves
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.4s' }}>
              Real-time heat risk intelligence powered by AI, satellite data, and urban sensors. 
              Protect communities and build climate resilience with evidence-based insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button variant="hero" size="lg" className="text-lg px-8 transform transition-all duration-300 hover:scale-105 hover:shadow-elegant" asChild>
                <Link to="/risk-visualization">
                  Check My Area
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="hero" size="lg" className="text-lg px-8 transform transition-all duration-300 hover:scale-105 hover:shadow-elegant" asChild>
                <Link to="/dashboard">
                  View Analytics
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real-Time Heat Intelligence</h2>
            <p className="text-lg text-muted-foreground">Live data from weather stations, satellites, and urban sensors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-1 animate-scale-in border-0 bg-white/80 backdrop-blur-sm" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-gradient-heat/10 group-hover:bg-gradient-heat/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant={stat.trend === "up" ? "destructive" : "secondary"} className="text-xs">
                        {stat.trend === "up" ? "↗" : "→"} Live
                      </Badge>
                    </div>
                    
                    <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-foreground mb-2">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.change}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Real-time indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Last updated: 2 minutes ago
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Heat Risk Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empower your community and organization with data-driven insights 
              to combat urban heat islands and protect public health.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-card-hover transition-all duration-500 transform hover:-translate-y-2 animate-slide-up border-0 shadow-md" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-gradient-heat group-hover:bg-gradient-temperature transition-all duration-300 transform group-hover:scale-110">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </CardDescription>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                        Learn More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-heat text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">
            Ready to Build Heat Resilience?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Join urban planners, researchers, and community leaders using HeatAware 
            to create cooler, safer cities for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="secondary" size="lg" className="text-lg px-8 transform transition-all duration-300 hover:scale-105 hover:shadow-elegant" asChild>
              <Link to="/risk-visualization">
                Start Exploring
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
              <Link to="/contact">
                Get Support
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Thermometer className="h-6 w-6" />
                <span className="text-lg font-bold">HeatAware</span>
              </div>
              <p className="text-primary-foreground/80">
                Building climate-resilient communities through urban heat intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/risk-visualization" className="hover:text-primary-foreground transition-colors">Risk Maps</Link></li>
                <li><Link to="/mitigation" className="hover:text-primary-foreground transition-colors">Mitigation</Link></li>
                <li><Link to="/dashboard" className="hover:text-primary-foreground transition-colors">Analytics</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Documentation</Link></li>
                <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">API Access</Link></li>
                <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Community</Link></li>
                <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Partners</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 HeatAware. Built for climate resilience.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
