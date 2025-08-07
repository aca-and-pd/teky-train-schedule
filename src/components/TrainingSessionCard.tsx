import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Calendar,
  FileText,
  Target
} from "lucide-react";
import { TrainingSession } from '@/types/training';

interface TrainingSessionCardProps {
  session: TrainingSession;
  status: 'completed' | 'current' | 'upcoming' | 'trainer';
  showDetails: boolean;
}

export const TrainingSessionCard = ({ session, status, showDetails }: TrainingSessionCardProps) => {
  const getStatusBadge = () => {
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
      case 'upcoming':
        return <Badge variant="outline">
          <AlertCircle className="w-3 h-3 mr-1" />
          Sắp tới
        </Badge>;
      case 'trainer':
        return <Badge variant="default">
          <Users className="w-3 h-3 mr-1" />
          Cần triển khai
        </Badge>;
      default:
        return null;
    }
  };

  const getCategoryBadge = () => {
    const categoryColors = {
      'Kiến thức': 'bg-training-knowledge text-white',
      'Thực hành': 'bg-training-practice text-white',
      'Kiến thức & Thực hành': 'bg-training-mixed text-white',
      'KPI': 'bg-training-kpi text-white'
    };

    return (
      <Badge className={categoryColors[session.category] || 'bg-primary text-white'}>
        {session.category}
      </Badge>
    );
  };

  const getFormatBadge = () => {
    const formatColors = {
      'Trực tiếp': 'bg-primary/10 text-primary border-primary',
      'Tự học': 'bg-success/10 text-success border-success',
      'OMO': 'bg-warning/10 text-warning border-warning'
    };

    return (
      <Badge variant="outline" className={formatColors[session.trainingFormat] || ''}>
        {session.trainingFormat}
      </Badge>
    );
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight">{session.topic}</CardTitle>
            <CardDescription className="text-sm">
              {session.lesson}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            {getStatusBadge()}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {getCategoryBadge()}
          {getFormatBadge()}
          <Badge variant="outline" className="text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {session.dayOfWeek}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {session.scheduledTime} ({session.durationHours}h)
          </Badge>
        </div>
      </CardHeader>

      {showDetails && (
        <CardContent className="pt-0 space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
              <Target className="w-4 h-4" />
              Mô tả:
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {session.content}
            </p>
          </div>

          {session.preTrainingRequirements.length > 0 && (
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Yêu cầu trước buổi học:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {session.preTrainingRequirements.slice(0, 2).map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0"></span>
                    <span className="line-clamp-1">{req}</span>
                  </li>
                ))}
                {session.preTrainingRequirements.length > 2 && (
                  <li className="text-xs text-muted-foreground/70">
                    +{session.preTrainingRequirements.length - 2} yêu cầu khác...
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <Badge variant="outline" className="text-xs">
              Team: {session.responsibleTeam}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Tuần {session.week}
            </Badge>
          </div>

          {(session.slideLink || session.masterPlanLink) && (
            <div className="flex gap-2">
              {session.slideLink && (
                <Button variant="outline" size="sm" className="text-xs">
                  <FileText className="w-3 h-3 mr-1" />
                  Slide
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              )}
              {session.masterPlanLink && (
                <Button variant="outline" size="sm" className="text-xs">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Master Plan
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};