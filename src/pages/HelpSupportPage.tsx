
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageSquare, 
  ExternalLink,
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Users,
  Settings,
  Shield,
  Zap,
  Heart,
  Star,
  Send,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

const HelpSupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    category: 'general',
    message: ''
  });
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const faqs = [
    {
      category: 'General',
      icon: HelpCircle,
      questions: [
        {
          question: "How do I reset my password?",
          answer: "You can reset your password by clicking on 'Forgot Password' on the login page. Enter your email address and follow the instructions sent to your email."
        },
        {
          question: "How do I update my profile information?",
          answer: "Go to your Profile page, click the 'Edit Profile' button, make your changes, and click 'Save' to update your information."
        },
        {
          question: "Can I change my username?",
          answer: "Currently, usernames cannot be changed once created. If you need to change your username, please contact support."
        }
      ]
    },
    {
      category: 'Academic',
      icon: BookOpen,
      questions: [
        {
          question: "How do I submit my homework?",
          answer: "Go to the Homework section, find your assignment, click on it, and follow the submission instructions provided by your teacher."
        },
        {
          question: "Where can I check my grades?",
          answer: "Your grades are available in the Marks section of your dashboard. You can view grades by subject and exam type."
        },
        {
          question: "How do I view the exam schedule?",
          answer: "Check the Exams section in your dashboard to see upcoming exams, dates, and times."
        }
      ]
    },
    {
      category: 'Technical',
      icon: Settings,
      questions: [
        {
          question: "The website is loading slowly. What should I do?",
          answer: "Try refreshing the page, clearing your browser cache, or checking your internet connection. If the problem persists, contact technical support."
        },
        {
          question: "I'm having trouble uploading files.",
          answer: "Ensure your file is in the correct format and under the size limit. Supported formats include PDF, DOC, DOCX, and images (JPG, PNG)."
        },
        {
          question: "How do I enable notifications?",
          answer: "Go to your browser settings and allow notifications for this website. You can also check notification preferences in your profile settings."
        }
      ]
    }
  ];

  const supportChannels = [
    {
      title: "Email Support",
      description: "Get help via email - we respond within 24 hours",
      icon: Mail,
      contact: "satyamrojhax@gmail.com",
      action: "Send Email",
      link: "mailto:satyamrojhax@gmail.com",
      color: "bg-blue-500",
      availability: "24/7"
    },
    {
      title: "WhatsApp Support",
      description: "Quick support via WhatsApp for urgent issues",
      icon: MessageSquare,
      contact: "+91 8092710478",
      action: "Open WhatsApp",
      link: "https://wa.me/918092710478",
      color: "bg-green-500",
      availability: "9 AM - 6 PM"
    },
    {
      title: "Phone Support",
      description: "Direct phone support for complex issues",
      icon: Phone,
      contact: "+91 8092710478",
      action: "Call Now",
      link: "tel:+918092710478",
      color: "bg-purple-500",
      availability: "Mon-Sat 9 AM - 5 PM"
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleFaqToggle = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingFeedback(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Feedback submitted successfully! We\'ll get back to you soon.');
    setFeedbackForm({ name: '', email: '', category: 'general', message: '' });
    setIsSubmittingFeedback(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl opacity-10"></div>
            <div className="relative p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-xl">
                  <HelpCircle className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Help & Support
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get the help you need to make the most of your learning experience. 
                Our support team is here to assist you every step of the way.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="support" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:mx-auto">
            <TabsTrigger value="support" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Support
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Feedback
            </TabsTrigger>
          </TabsList>

          {/* Support Channels */}
          <TabsContent value="support" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the support channel that works best for you. Our team is ready to help!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className={`h-16 w-16 mx-auto rounded-2xl ${channel.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <channel.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{channel.title}</CardTitle>
                    <CardDescription className="text-base">{channel.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div>
                      <p className="font-semibold text-lg">{channel.contact}</p>
                      <Badge variant="outline" className="mt-2">
                        Available {channel.availability}
                      </Badge>
                    </div>
                    <Button 
                      asChild 
                      className="w-full"
                      size="lg"
                    >
                      <a 
                        href={channel.link} 
                        target={channel.link.startsWith('http') ? '_blank' : '_self'}
                        rel={channel.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="flex items-center gap-2"
                      >
                        {channel.action}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Tips */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-6 w-6 text-green-600" />
                  Quick Tips for Better Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Be Specific</h3>
                      <p className="text-sm text-muted-foreground">Describe your issue in detail with steps to reproduce</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Include Screenshots</h3>
                      <p className="text-sm text-muted-foreground">Visual information helps us understand your problem faster</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Check FAQ First</h3>
                      <p className="text-sm text-muted-foreground">Many common questions are answered in our FAQ section</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Provide Context</h3>
                      <p className="text-sm text-muted-foreground">Let us know your role (student/teacher) and class</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Section */}
          <TabsContent value="faq" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find quick answers to common questions about using our platform.
              </p>
            </div>

            {/* Search Bar */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    placeholder="Search frequently asked questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            <div className="space-y-6">
              {filteredFaqs.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      return (
                        <div key={faqIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                          <button
                            onClick={() => handleFaqToggle(globalIndex)}
                            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <span className="font-medium">{faq.question}</span>
                            {expandedFaq === globalIndex ? (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>
                          {expandedFaq === globalIndex && (
                            <div className="p-4 pt-0 text-muted-foreground border-t border-gray-200 dark:border-gray-700">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>

            {searchQuery && filteredFaqs.length === 0 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or contact support for help.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Guides Section */}
          <TabsContent value="guides" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">User Guides</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Step-by-step guides to help you get the most out of our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Getting Started",
                  description: "Learn the basics of navigating the platform",
                  icon: Users,
                  color: "bg-blue-500"
                },
                {
                  title: "Managing Homework",
                  description: "How to submit and track your assignments",
                  icon: BookOpen,
                  color: "bg-green-500"
                },
                {
                  title: "Using Messages",
                  description: "Communicate effectively with teachers and students",
                  icon: MessageSquare,
                  color: "bg-purple-500"
                },
                {
                  title: "Profile Settings",
                  description: "Customize your profile and preferences",
                  icon: Settings,
                  color: "bg-orange-500"
                },
                {
                  title: "Security & Privacy",
                  description: "Keep your account safe and secure",
                  icon: Shield,
                  color: "bg-red-500"
                },
                {
                  title: "Troubleshooting",
                  description: "Common issues and how to resolve them",
                  icon: HelpCircle,
                  color: "bg-indigo-500"
                }
              ].map((guide, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`h-16 w-16 mx-auto rounded-2xl ${guide.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <guide.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button variant="outline" className="w-full">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Feedback Section */}
          <TabsContent value="feedback" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Send Feedback</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Help us improve! Share your thoughts, suggestions, or report issues.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    We Value Your Feedback
                  </CardTitle>
                  <CardDescription>
                    Your input helps us create a better learning experience for everyone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={feedbackForm.name}
                          onChange={(e) => setFeedbackForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={feedbackForm.email}
                          onChange={(e) => setFeedbackForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={feedbackForm.category}
                        onChange={(e) => setFeedbackForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="general">General Feedback</option>
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                        <option value="improvement">Improvement Suggestion</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="Please describe your feedback in detail..."
                        value={feedbackForm.message}
                        onChange={(e) => setFeedbackForm(prev => ({ ...prev, message: e.target.value }))}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmittingFeedback}
                    >
                      {isSubmittingFeedback ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Feedback
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="max-w-2xl mx-auto">
            <p className="mb-2">© 2025 Axioms School. All rights reserved.</p>
            <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
              Developed with ❤️ by Satyam Rojha
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HelpSupportPage;
