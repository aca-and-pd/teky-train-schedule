import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, BookOpen, Filter } from "lucide-react";
import { TrainingSession } from '@/types/training';
import { TrainingSessionCard } from './TrainingSessionCard';

interface TrainerViewProps {
  sessions: TrainingSession[];
}

export const TrainerView = ({ sessions }: TrainerViewProps) => {
  const [currentWeek] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState<string>('all');

  const currentWeekSessions = sessions.filter(session => session.week === currentWeek);
  const nextWeekSessions = sessions.filter(session => session.week === currentWeek + 1);

  const filterSessionsByTeam = (sessionList: TrainingSession[]) => {
    if (selectedTeam === 'all') return sessionList;
    return sessionList.filter(session => session.responsibleTeam === selectedTeam);
  };

  const getTeamStats = () => {
    const teams = ['PD', 'TC', 'SC'];
    return teams.map(team => ({
      name: team,
      count: sessions.filter(session => session.responsibleTeam === team).length
    }));
  };

  const getDayColor = (dayOfWeek: string) => {
    const colors = {
      'Thứ 2': 'border-l-4 border-l-blue-500',
      'Thứ 3': 'border-l-4 border-l-green-500',
      'Thứ 4': 'border-l-4 border-l-yellow-500',
      'Thứ 5': 'border-l-4 border-l-purple-500',
      'Thứ 6': 'border-l-4 border-l-red-500',
      'Thứ 7 / Chủ Nhật': 'border-l-4 border-l-pink-500'
    };
    return colors[dayOfWeek] || 'border-l-4 border-l-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Trainer Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Dashboard Trainer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">{currentWeek}</div>
              <div className="text-sm text-muted-foreground">Tuần hiện tại</div>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success">{currentWeekSessions.length}</div>
              <div className="text-sm text-muted-foreground">Buổi tuần này</div>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <div className="text-2xl font-bold text-warning">{nextWeekSessions.length}</div>
              <div className="text-sm text-muted-foreground">Buổi tuần sau</div>
            </div>
            <div className="text-center p-4 bg-training-mixed/10 rounded-lg">
              <div className="text-2xl font-bold text-training-mixed">{sessions.length}</div>
              <div className="text-sm text-muted-foreground">Tổng buổi</div>
            </div>
          </div>

          {/* Team Filter */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Badge 
              variant={selectedTeam === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedTeam('all')}
            >
              Tất cả
            </Badge>
            {getTeamStats().map(team => (
              <Badge 
                key={team.name}
                variant={selectedTeam === team.name ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedTeam(team.name)}
              >
                {team.name} ({team.count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Week Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch tuần hiện tại (Tuần {currentWeek})</CardTitle>
          <CardDescription>
            Tổng quan các buổi đào tạo cần triển khai trong tuần này
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7 / Chủ Nhật'].map(day => {
              const daySessions = filterSessionsByTeam(currentWeekSessions).filter(session => session.dayOfWeek === day);
              
              return (
                <div key={day} className={`p-4 rounded-lg bg-card ${getDayColor(day)}`}>
                  <h3 className="font-semibold text-lg mb-3">{day}</h3>
                  {daySessions.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {daySessions.map(session => (
                        <TrainingSessionCard
                          key={session.id}
                          session={session}
                          status="trainer"
                          showDetails={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">Không có buổi đào tạo</p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Next Week Preview */}
      {nextWeekSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Kế hoạch tuần tiếp theo (Tuần {currentWeek + 1})</CardTitle>
            <CardDescription>
              Chuẩn bị và lên kế hoạch cho các buổi đào tạo sắp tới
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7 / Chủ Nhật'].map(day => {
                const daySessions = filterSessionsByTeam(nextWeekSessions).filter(session => session.dayOfWeek === day);
                
                return (
                  <div key={day} className={`p-4 rounded-lg bg-muted/50 ${getDayColor(day)}`}>
                    <h3 className="font-semibold text-lg mb-3">{day}</h3>
                    {daySessions.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {daySessions.map(session => (
                          <TrainingSessionCard
                            key={session.id}
                            session={session}
                            status="upcoming"
                            showDetails={false}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">Không có buổi đào tạo</p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};