
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
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Plus, 
  Sparkles, 
  Star,
  Users,
  ChevronRight,
  PartyPopper
} from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        
        {/* Modern Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/5 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">School Events</h1>
                  <p className="text-violet-100 text-lg">
                    {isTeacher 
                      ? "Create and manage exciting school events" 
                      : "Discover upcoming school activities"
                    }
                  </p>
                </div>
              </div>
              
              {isTeacher && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm transition-all duration-300 group px-6 py-3 rounded-xl">
                      <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
                      Create Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-lg rounded-2xl border-0 shadow-2xl">
                    <DialogHeader className="space-y-3">
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        Create New Event
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Design an exciting event for your students
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Event Title</Label>
                        <Input 
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Amazing Science Fair 2024"
                          required
                          className="rounded-xl border-2 focus:border-violet-400 transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</Label>
                        <Textarea 
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe what makes this event special..."
                          rows={3}
                          required
                          className="resize-none rounded-xl border-2 focus:border-violet-400 transition-colors"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date" className="text-sm font-semibold text-gray-700">Date</Label>
                          <Input 
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="rounded-xl border-2 focus:border-violet-400 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time" className="text-sm font-semibold text-gray-700">Time</Label>
                          <Input 
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className="rounded-xl border-2 focus:border-violet-400 transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-semibold text-gray-700">Location</Label>
                        <Input 
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="School Auditorium"
                          required
                          className="rounded-xl border-2 focus:border-violet-400 transition-colors"
                        />
                      </div>
                      
                      <DialogFooter className="flex gap-3 pt-6">
                        <DialogClose asChild>
                          <Button type="button" variant="outline" className="rounded-xl">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button 
                          type="submit" 
                          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl shadow-lg"
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          Create Event
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                <PartyPopper className="h-4 w-4 mr-2" />
                {isTeacher ? "Event Creator" : "Student View"}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Class {currentUser?.class}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                {events.length} Active Event{events.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="relative mb-8">
                <div className="h-32 w-32 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                  <Calendar className="h-16 w-16 text-violet-500" />
                </div>
                <div className="absolute -top-2 -right-8 h-12 w-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                No Events Yet
              </h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
                {isTeacher 
                  ? "Start creating amazing events to engage your students and build unforgettable memories."
                  : "Stay tuned! Exciting events will be announced soon."
                }
              </p>
              
              {isTeacher && (
                <Button 
                  onClick={() => setDialogOpen(true)}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-2xl px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all"
                >
                  <Plus className="mr-3 h-5 w-5" />
                  Create Your First Event
                  <ChevronRight className="ml-3 h-5 w-5" />
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="border-0 shadow-xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
                <div className="h-2 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500" />
                
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-violet-100 text-violet-700 rounded-full px-3 py-1 border border-violet-200">
                      <Calendar className="h-3 w-3 mr-1" />
                      Event
                    </Badge>
                    <Badge variant="outline" className="text-xs rounded-full">
                      Class {event.assignedClass}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl mb-4 group-hover:text-violet-600 transition-colors line-clamp-2">
                    {event.title}
                  </CardTitle>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="h-8 w-8 bg-violet-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-4 w-4 text-violet-600" />
                      </div>
                      <span className="font-medium">{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </CardContent>
                
                <CardFooter className="bg-gradient-to-r from-gray-50 to-violet-50/50 border-t border-gray-100 px-6 py-4">
                  <div className="flex justify-between w-full text-sm">
                    <span className="font-semibold text-gray-700">
                      By: {event.creatorName}
                    </span>
                    <span className="text-gray-500">
                      {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                    </span>
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
