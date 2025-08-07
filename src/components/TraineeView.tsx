import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, BookOpen, Users } from "lucide-react";
import { TrainingSession } from '@/types/training';
import { TrainingSessionCard } from './TrainingSessionCard';
import { addDays, addWeeks, format, parseISO, isSameDay } from 'date-fns';

interface TraineeViewProps {
  sessions: TrainingSession[];
}

export const TraineeView = ({ sessions }: TraineeViewProps) => {
  const [startDate, setStartDate] = useState('2024-01-08'); // Default start date
  const [traineeData, setTraineeData] = useState({
    name: 'Nguyễn Văn A',
    currentWeek: 1,
    completedSessions: [1, 2]
  });
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getSessionStatus = (sessionId: number) => {
    if (traineeData.completedSessions.includes(sessionId)) {
      return 'completed';
    }
    
    const session = sessions.find(s => s.id === sessionId);
    if (session && session.week <= traineeData.currentWeek) {
      return 'current';
    }
    
    return 'upcoming';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-success text-success-foreground">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Hoàn thành
        </Badge>;
      case 'current':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">
          <Clock className="w-3 h-3 mr-1" />
          Đang học
        </Badge>;
      default:
        return <Badge variant="outline">
          <AlertCircle className="w-3 h-3 mr-1" />
          Sắp tới
        </Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Kiến thức':
        return 'bg-training-knowledge';
      case 'Thực hành':
        return 'bg-training-practice';
      case 'Kiến thức & Thực hành':
        return 'bg-training-mixed';
      case 'KPI':
        return 'bg-training-kpi';
      default:
        return 'bg-primary';
    }
  };

  const currentWeekSessions = sessions.filter(session => session.week === traineeData.currentWeek);
  const nextWeekSessions = sessions.filter(session => session.week === traineeData.currentWeek + 1);
  const completedSessions = sessions.filter(session => traineeData.completedSessions.includes(session.id));

  // Calculate actual dates for sessions
  const getSessionDate = (session: TrainingSession) => {
    if (!startDate) return null;
    
    const start = parseISO(startDate);
    const weekOffset = session.week - 1;
    const weekStartDate = addWeeks(start, weekOffset);
    
    // Convert dayOfWeek to number (0 = Monday)
    const dayMapping: Record<string, number> = {
      'Thứ 2': 0,
      'Thứ 3': 1, 
      'Thứ 4': 2,
      'Thứ 5': 3,
      'Thứ 6': 4,
      'Thứ 7 / Chủ Nhật': 5
    };
    
    const dayOffset = dayMapping[session.dayOfWeek] || 0;
    return addDays(weekStartDate, dayOffset);
  };

  // Get sessions for calendar
  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => {
      const sessionDate = getSessionDate(session);
      return sessionDate && isSameDay(sessionDate, date);
    });
  };

  const handleDateClick = (date: Date) => {
    const sessionsOnDate = getSessionsForDate(date);
    if (sessionsOnDate.length > 0) {
      setSelectedSession(sessionsOnDate[0]); // Show first session if multiple
      setModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Trainee Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Thông tin Trainee
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="trainee-name">Họ và tên</Label>
              <Input 
                id="trainee-name"
                value={traineeData.name}
                onChange={(e) => setTraineeData({...traineeData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="start-date">Ngày bắt đầu đào tạo</Label>
              <Input 
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Cập nhật lịch trình</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{traineeData.currentWeek}</div>
              <div className="text-sm text-muted-foreground">Tuần hiện tại</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{traineeData.completedSessions.length}</div>
              <div className="text-sm text-muted-foreground">Buổi đã hoàn thành</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{currentWeekSessions.length}</div>
              <div className="text-sm text-muted-foreground">Buổi tuần này</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Lịch đào tạo
          </CardTitle>
          <CardDescription>
            Nhấn vào ngày có buổi học để xem chi tiết
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            className="rounded-md border"
            modifiers={{
              completed: (date) => {
                const sessionsOnDate = getSessionsForDate(date);
                return sessionsOnDate.some(session => 
                  traineeData.completedSessions.includes(session.id)
                );
              },
              upcoming: (date) => {
                const sessionsOnDate = getSessionsForDate(date);
                return sessionsOnDate.some(session => 
                  !traineeData.completedSessions.includes(session.id)
                );
              }
            }}
            modifiersStyles={{
              completed: { 
                backgroundColor: 'hsl(var(--muted))',
                color: 'hsl(var(--muted-foreground))'
              },
              upcoming: { 
                backgroundColor: 'hsl(var(--success) / 0.2)',
                color: 'hsl(var(--success-foreground))'
              }
            }}
            onDayClick={handleDateClick}
            disabled={false}
          />
        </CardContent>
      </Card>

      {/* Session Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết buổi đào tạo</DialogTitle>
          </DialogHeader>
          {selectedSession && (
            <div className="space-y-4">
              <TrainingSessionCard
                session={selectedSession}
                status={getSessionStatus(selectedSession.id)}
                showDetails={true}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Current Week Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch tuần hiện tại (Tuần {traineeData.currentWeek})</CardTitle>
          <CardDescription>
            Các buổi đào tạo trong tuần này
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {currentWeekSessions.map((session) => (
              <TrainingSessionCard
                key={session.id}
                session={session}
                status={getSessionStatus(session.id)}
                showDetails={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Week Preview */}
      {nextWeekSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Xem trước tuần tiếp theo (Tuần {traineeData.currentWeek + 1})</CardTitle>
            <CardDescription>
              Chuẩn bị cho các buổi đào tạo sắp tới
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {nextWeekSessions.map((session) => (
                <TrainingSessionCard
                  key={session.id}
                  session={session}
                  status="upcoming"
                  showDetails={false}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Sessions */}
      {completedSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Các buổi đã hoàn thành</CardTitle>
            <CardDescription>
              Lịch sử các buổi đào tạo đã tham gia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {completedSessions.map((session) => (
                <TrainingSessionCard
                  key={session.id}
                  session={session}
                  status="completed"
                  showDetails={false}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};