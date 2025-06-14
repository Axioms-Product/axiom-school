
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
  PartyPopper,
  CalendarDays
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <CalendarDays className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-orange-400 rounded-full flex items-center justify-center">
                    <Star className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    School Events
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
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
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl">
                      <Plus className="mr-2 h-5 w-5" />
                      Create Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95vw] max-w-lg rounded-2xl">
                    <DialogHeader className="space-y-3">
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Create New Event
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Design an exciting event for your students
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-semibold">Event Title</Label>
                        <Input 
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Amazing Science Fair 2024"
                          required
                          className="rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                        <Textarea 
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe what makes this event special..."
                          rows={3}
                          required
                          className="resize-none rounded-xl"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date" className="text-sm font-semibold">Date</Label>
                          <Input 
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time" className="text-sm font-semibold">Time</Label>
                          <Input 
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-semibold">Location</Label>
                        <Input 
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="School Auditorium"
                          required
                          className="rounded-xl"
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
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
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
            
            {/* Stats Section */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                <PartyPopper className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-700 dark:text-blue-300">
                  {isTeacher ? "Event Creator" : "Student View"}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-700 dark:text-purple-300">
                  Class {currentUser?.class}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-full">
                <Star className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-700 dark:text-orange-300">
                  {events.length} Active Event{events.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardContent className="p-16 text-center">
              <div className="relative mb-8">
                <div className="h-32 w-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                  <Calendar className="h-16 w-16 text-gray-400" />
                </div>
                <div className="absolute -top-2 -right-8 h-12 w-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                No Events Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto mb-8">
                {isTeacher 
                  ? "Start creating amazing events to engage your students and build unforgettable memories."
                  : "Stay tuned! Exciting events will be announced soon."
                }
              </p>
              
              {isTeacher && (
                <Button 
                  onClick={() => setDialogOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
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
              <Card key={event.id} className="group border-0 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500" />
                
                <CardHeader className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full px-3 py-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Event
                    </Badge>
                    <Badge variant="outline" className="text-xs rounded-full">
                      Class {event.assignedClass}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {event.title}
                  </CardTitle>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="h-8 w-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="h-8 w-8 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </CardContent>
                
                <CardFooter className="bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-600 px-6 py-4">
                  <div className="flex justify-between w-full text-sm">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      By: {event.creatorName}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
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
