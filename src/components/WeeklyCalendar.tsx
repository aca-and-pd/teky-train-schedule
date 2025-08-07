import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { TrainingSession } from '@/types/training';
import { addDays, addWeeks, format, parseISO, startOfWeek, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';

interface WeeklyCalendarProps {
  sessions: TrainingSession[];
  startDate: string;
  completedSessions: number[];
  onSessionClick: (session: TrainingSession) => void;
}

export const WeeklyCalendar = ({ sessions, startDate, completedSessions, onSessionClick }: WeeklyCalendarProps) => {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  if (!startDate) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Vui lòng chọn ngày bắt đầu đào tạo để xem lịch
      </div>
    );
  }

  const baseDate = parseISO(startDate);
  const weekStart = startOfWeek(addWeeks(baseDate, currentWeekOffset), { weekStartsOn: 1 });

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getSessionDate = (session: TrainingSession) => {
    const weekOffset = session.week - 1;
    const weekStartDate = addWeeks(baseDate, weekOffset);
    
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

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => {
      const sessionDate = getSessionDate(session);
      return sessionDate && isSameDay(sessionDate, date);
    });
  };

  const getSessionStatus = (sessionId: number) => {
    return completedSessions.includes(sessionId) ? 'completed' : 'upcoming';
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' 
      ? 'bg-muted text-muted-foreground' 
      : 'bg-success/20 text-success-foreground border-success/30';
  };

  return (
    <div className="space-y-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeekOffset(prev => prev - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
          Tuần trước
        </Button>
        <h3 className="font-semibold">
          {format(weekStart, 'dd/MM/yyyy', { locale: vi })} - {format(addDays(weekStart, 6), 'dd/MM/yyyy', { locale: vi })}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeekOffset(prev => prev + 1)}
        >
          Tuần sau
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Weekly Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'].map((day, index) => (
          <div key={day} className="text-center font-medium text-sm text-muted-foreground py-2 border-b">
            {day}
            <div className="text-xs mt-1">
              {format(weekDays[index], 'dd/MM')}
            </div>
          </div>
        ))}

        {/* Day Cells */}
        {weekDays.map((date, index) => {
          const sessionsOnDate = getSessionsForDate(date);
          
          return (
            <Card key={index} className="min-h-[120px] p-2">
              <div className="space-y-1">
                {sessionsOnDate.map((session) => {
                  const status = getSessionStatus(session.id);
                  return (
                    <div
                      key={session.id}
                      className={`p-2 rounded-md border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(status)}`}
                      onClick={() => onSessionClick(session)}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        {status === 'completed' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span className="text-xs font-medium">
                          {session.scheduledTime}
                        </span>
                      </div>
                      <div className="text-xs font-medium mb-1 line-clamp-2">
                        {session.topic}
                      </div>
                      <div className="text-xs opacity-75 line-clamp-1">
                        {session.lesson}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {session.durationHours}h
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-muted rounded border"></div>
          <span>Đã hoàn thành</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-success/20 border-success/30 rounded border"></div>
          <span>Sắp tới</span>
        </div>
      </div>
    </div>
  );
};