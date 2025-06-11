
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
  const [time, setTime] = useState('');
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
      time,
      location,
      assignedClass: currentUser?.class || '',
    });
    
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 p-2 sm:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl lg:rounded-3xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.15%22%3E%3Ccircle%20cx=%2260%22%20cy=%2212%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 rounded-2xl lg:rounded-3xl"></div>
          
          <div className="relative px-4 py-8 lg:px-8 lg:py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 lg:h-16 lg:w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <Calendar className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2">School Events</h1>
                    <p className="text-emerald-100 text-base lg:text-lg">
                      {isTeacher 
                        ? "Organize and manage exciting school events"
                        : "Stay updated with upcoming school activities"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                    <PartyPopper className="h-4 w-4 mr-2" />
                    {isTeacher ? "Event Manager" : "Student Portal"}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                    <Star className="h-4 w-4 mr-2" />
                    Class {currentUser?.class}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                    <Zap className="h-4 w-4 mr-2" />
                    {events.length} Event{events.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
              
              {isTeacher && (
                <div className="lg:ml-8">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full lg:w-auto bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group px-6 py-3 text-sm rounded-xl shadow-lg">
                        <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        Create Event
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-lg rounded-xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl">Create New Event</DialogTitle>
                        <DialogDescription>
                          Add an exciting event for your class
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium">Event Title</Label>
                            <Input 
                              id="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="e.g., Annual Science Fair 2024"
                              required
                              className="rounded-lg border-2 focus:border-emerald-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                            <Textarea 
                              id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Describe the event details..."
                              rows={3}
                              required
                              className="resize-none rounded-lg border-2 focus:border-emerald-400"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                              <Input 
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="rounded-lg border-2 focus:border-emerald-400"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                              <Input 
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                                className="rounded-lg border-2 focus:border-emerald-400"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                            <Input 
                              id="location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder="e.g., School Auditorium"
                              required
                              className="rounded-lg border-2 focus:border-emerald-400"
                            />
                          </div>
                        </div>
                        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
                          <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-lg">Cancel</Button>
                          </DialogClose>
                          <Button 
                            type="submit" 
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg"
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
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden card-hover">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="h-28 w-28 lg:h-32 lg:w-32 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center shadow-lg">
                    <Calendar className="h-14 w-14 lg:h-16 lg:w-16 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-10 w-10 lg:h-12 lg:w-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  No events scheduled yet
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {isTeacher 
                    ? "Create exciting events to engage your students and build memorable experiences."
                    : "No events have been scheduled yet. Check back soon for exciting activities!"
                  }
                </p>
                
                {isTeacher && (
                  <Button 
                    className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl px-8 py-4 text-base shadow-lg"
                    onClick={() => setDialogOpen(true)}
                  >
                    <Plus className="mr-3 h-5 w-5" />
                    Create First Event
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="border-0 shadow-lg rounded-2xl overflow-hidden card-hover bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-800 dark:to-emerald-900/20">
                <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />
                
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Event
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Class {event.assignedClass}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg lg:text-xl mb-3 line-clamp-2 bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text text-transparent dark:from-white dark:to-emerald-300">
                    {event.title}
                  </CardTitle>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                        <Clock className="h-3 w-3 text-emerald-600" />
                      </div>
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                        <MapPin className="h-3 w-3 text-teal-600" />
                      </div>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">{event.description}</p>
                </CardContent>
                
                <CardFooter className="bg-gradient-to-r from-gray-50 to-emerald-50/50 dark:from-gray-800 dark:to-emerald-900/20 border-t">
                  <div className="flex justify-between w-full text-sm text-muted-foreground">
                    <span className="font-medium">By: {event.creatorName}</span>
                    <span>{formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}</span>
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
