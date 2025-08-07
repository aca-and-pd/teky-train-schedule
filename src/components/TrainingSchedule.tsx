import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, BookOpen, CheckCircle2, AlertCircle } from "lucide-react";
import { TrainingSession } from '@/types/training';
import { mockTrainingSessions } from '@/data/mockTrainingSessions';
import { TraineeView } from './TraineeView';
import { TrainerView } from './TrainerView';

const TrainingSchedule = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Hệ thống quản lý lịch đào tạo Teky
          </h1>
          <p className="text-lg text-muted-foreground">
            Tra cứu và quản lý lịch trình đào tạo cho Trainee và Trainer
          </p>
        </div>

        <Tabs defaultValue="trainee" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="trainee" className="text-base py-3">
              <Users className="w-5 h-5 mr-2" />
              Trainee
            </TabsTrigger>
            <TabsTrigger value="trainer" className="text-base py-3">
              <BookOpen className="w-5 h-5 mr-2" />
              Trainer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trainee" className="space-y-6">
            <TraineeView sessions={mockTrainingSessions} />
          </TabsContent>

          <TabsContent value="trainer" className="space-y-6">
            <TrainerView sessions={mockTrainingSessions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrainingSchedule;