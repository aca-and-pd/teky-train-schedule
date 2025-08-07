import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, CheckCircle2, AlertCircle, BookOpen, Users } from "lucide-react";
import { TrainingSession } from '@/types/training';
import { TrainingSessionCard } from './TrainingSessionCard';

interface TraineeViewProps {
  sessions: TrainingSession[];
}

export const TraineeView = ({ sessions }: TraineeViewProps) => {
  const [startDate, setStartDate] = useState('');
  const [traineeData, setTraineeData] = useState({
    name: 'Nguyễn Văn A',
    currentWeek: 1,
    completedSessions: [1, 2]
  });

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