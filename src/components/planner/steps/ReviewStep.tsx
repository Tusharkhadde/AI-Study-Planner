import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  User,
  BookOpen,
  Clock,
  Calendar,
  FileText,
} from 'lucide-react';
import { useFormStore } from '@/stores/useFormStore';
import { useStudentStore } from '@/stores/useStudentStore';
import { useSubjectStore } from '@/stores/useSubjectStore';
import { usePlanStore } from '@/stores/usePlanStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { aiService } from '@/services/aiService';
import { GeneratingOverlay } from '../GeneratingOverlay';
import toast from 'react-hot-toast';

export const ReviewStep: React.FC = () => {
  const navigate = useNavigate();
  const { formData, prevStep, resetForm } = useFormStore();
  const { setProfile, setPreferences } = useStudentStore();
  const { clearSubjects } = useSubjectStore();
  const { setPlan, setGenerating } = usePlanStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerating(true);

    try {
      // Save student profile
      setProfile({
        id: crypto.randomUUID(),
        name: formData.studentName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      setPreferences(formData.preferences);

      // Clear existing subjects and add new ones
      clearSubjects();

      // Generate study plan using AI
      const response = await aiService.generateStudyPlan({
        subjects: formData.subjects as any,
        assessments: formData.assessments as any,
        preferences: formData.preferences,
        targetDate: formData.targetDate,
      });

      if (response.success && response.plan) {
        setPlan({
          id: crypto.randomUUID(),
          studentId: '',
          targetDate: formData.targetDate,
          generatedAt: new Date().toISOString(),
          totalWeeks: response.plan.weeklySchedules.length,
          totalHours: response.plan.weeklySchedules.reduce(
            (sum: number, week: any) => sum + week.totalHours,
            0
          ),
          subjects: formData.subjects as any,
          assessments: formData.assessments as any,
          weeklySchedules: response.plan.weeklySchedules,
          aiInsights: response.plan.insights,
        });

        toast.success('Study plan generated successfully!');
        resetForm();
        navigate('/dashboard');
      } else {
        throw new Error(response.error || 'Failed to generate plan');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate study plan. Please try again.');
    } finally {
      setIsGenerating(false);
      setGenerating(false);
    }
  };

  return (
    <>
      {isGenerating && <GeneratingOverlay />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card variant="glass" className="p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Review Your Information</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Make sure everything looks correct before generating your plan
            </p>
          </div>

          <div className="space-y-6">
            {/* Student Info */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-lg">
                  {formData.studentName}
                </div>
                <div className="text-sm text-gray-500">Student</div>
              </div>
            </div>

            {/* Subjects */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-primary-600" />
                <span className="font-semibold">
                  Subjects ({formData.subjects.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.subjects.map((subject, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white dark:bg-gray-900 rounded-lg text-sm"
                  >
                    {subject.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Study Preferences */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-primary-600" />
                <span className="font-semibold">Study Preferences</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Daily Hours:
                  </span>
                  <span className="font-medium">
                    {formData.preferences.dailyStudyHours}h
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Study Days:
                  </span>
                  <span className="font-medium">
                    {formData.preferences.studyDaysPerWeek} days/week
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Preferred Times:
                  </span>
                  <span className="font-medium capitalize">
                    {formData.preferences.preferredTimeSlots.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Target Date */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-primary-600" />
                <span className="font-semibold">Target Date</span>
              </div>
              <div className="text-2xl font-bold text-primary-600">
                {new Date(formData.targetDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>

            {/* Assessments */}
            {formData.assessments.length > 0 && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-primary-600" />
                  <span className="font-semibold">
                    Assessments ({formData.assessments.length})
                  </span>
                </div>
                <div className="space-y-2">
                  {formData.assessments.slice(0, 3).map((assessment, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm bg-white dark:bg-gray-900 p-2 rounded-lg"
                    >
                      <span className="capitalize">{assessment.type}</span>
                      <span className="text-gray-500">
                        {new Date(assessment.date!).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  {formData.assessments.length > 3 && (
                    <div className="text-sm text-gray-500 text-center">
                      +{formData.assessments.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              icon={<ArrowLeft className="w-5 h-5" />}
              disabled={isGenerating}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleGenerate}
              loading={isGenerating}
              icon={<Sparkles className="w-5 h-5" />}
            >
              Generate My Study Plan
            </Button>
          </div>
        </Card>
      </motion.div>
    </>
  );
};