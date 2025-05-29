
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose 
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, MapPin, Clock, Users, Sparkles, Plus, ArrowRight, PartyPopper, Zap, Star } from 'lucide-react';

const EventsView = () => {
  const { currentUser } = useAuth();
  const { getFilteredEvents, addEvent } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const isTeacher = currentUser?.role === 'teacher';
  const events = getFilteredEvents();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addEvent({
      title,
      description,
      date,
      location,
      assignedClass: currentUser?.class || '',
    });
    
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Modern Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2260%22%20cy=%2212%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 rounded-3xl"></div>
          
          <div className="relative px-6 sm:px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">School Events</h1>
                    <p className="text-emerald-100 text-base sm:text-lg">
                      {isTeacher 
                        ? "Organize and manage school events"
                        : "Stay updated with exciting school activities"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 text-sm">
                    <PartyPopper className="h-4 w-4 mr-2" />
                    {isTeacher ? "Event Manager" : "Student Portal"}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 text-sm">
                    Class {currentUser?.class}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 text-sm">
                    <Star className="h-4 w-4 mr-2" />
                    {events.length} Event{events.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
              
              {isTeacher && (
                <div className="mt-8 lg:mt-0">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-2xl shadow-lg">
                        <Plus className="mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-transform" />
                        Create Event
                        <ArrowRight className="ml-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-2xl mx-4">
                      <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl">Create New Event</DialogTitle>
                        <DialogDescription className="text-base sm:text-lg">
                          Add a new event for your class to participate in
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
                          <div className="space-y-2">
                            <Label htmlFor="title" className="text-base font-medium">Event Title</Label>
                            <Input 
                              id="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="e.g., Science Fair 2024"
                              required
                              className="rounded-xl border-2 focus:border-emerald-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description" className="text-base font-medium">Description</Label>
                            <Textarea 
                              id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Detailed description of the event"
                              rows={4}
                              required
                              className="resize-none rounded-xl border-2 focus:border-emerald-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="date" className="text-base font-medium">Event Date</Label>
                            <Input 
                              id="date"
                              type="datetime-local"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              required
                              className="rounded-xl border-2 focus:border-emerald-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location" className="text-base font-medium">Location</Label>
                            <Input 
                              id="location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder="e.g., School Auditorium"
                              required
                              className="rounded-xl border-2 focus:border-emerald-400"
                            />
                          </div>
                        </div>
                        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                          <DialogClose asChild>
                            <Button type="button" variant="outline" className="w-full sm:w-auto rounded-xl px-6">Cancel</Button>
                          </DialogClose>
                          <Button 
                            type="submit" 
                            className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl px-8"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Event
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>

        {events.length === 0 ? (
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="h-24 sm:h-32 w-24 sm:w-32 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center shadow-lg">
                    <Calendar className="h-12 sm:h-16 w-12 sm:w-16 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 sm:h-12 w-8 sm:w-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="h-4 sm:h-6 w-4 sm:w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  No events scheduled yet
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {isTeacher 
                    ? "Create exciting events to engage your students and build memorable experiences."
                    : "No events have been scheduled yet. Check back soon for exciting activities!"
                  }
                </p>
                
                {isTeacher && (
                  <Button 
                    className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-lg"
                    onClick={() => setDialogOpen(true)}
                  >
                    <Plus className="mr-3 h-5 sm:h-6 w-5 sm:w-6" />
                    Create First Event
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
                
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Event
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Class {event.assignedClass}</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl mb-2 line-clamp-2">{event.title}</CardTitle>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{formatDistanceToNow(new Date(event.date), { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">{event.description}</p>
                </CardContent>
                
                <CardFooter className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t">
                  <div className="flex justify-between w-full text-sm text-muted-foreground">
                    <span className="truncate mr-2">By: {event.creatorName}</span>
                    <span className="flex-shrink-0">{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsView;
