export interface TrainingSession {
  id: number;
  week: number;
  dayOfWeek: "Thứ 2" | "Thứ 3" | "Thứ 4" | "Thứ 5" | "Thứ 6" | "Thứ 7 / Chủ Nhật";
  scheduledTime: "Sáng" | "Chiều" | "Tối" | "Sáng/Chiều";
  durationHours: number;
  topic: string;
  lesson: string;
  prerequisites: string;
  content: string;
  preTrainingRequirements: string[];
  category: "Kiến thức" | "Thực hành" | "Kiến thức & Thực hành" | "KPI";
  trainingFormat: "Trực tiếp" | "Tự học" | "OMO";
  overviewDescription: string;
  traineePreTrainingActivities: string[];
  traineeInPostTrainingActivities: string[];
  validation: string[];
  internalTrainingLinks: string[];
  masterPlanLink: string;
  slideLink: string;
  responsibleTeam: "PD" | "TC" | "SC";
  validationDeadline: string[];
  supportStaff: string;
  relatedForms: string;
  note?: string;
}

export interface TraineeProgress {
  traineeId: string;
  traineeName: string;
  startDate: string;
  completedSessions: number[];
  currentWeek: number;
}