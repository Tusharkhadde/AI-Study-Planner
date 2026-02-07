import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, Trash2, FileText } from 'lucide-react';
import { useFormStore } from '@/stores/useFormStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Assessment, AssessmentType } from '@/types';
import { cn } from '@/utils/cn';

const assessmentTypes: { value: AssessmentType; label: string; color: string }[] = [
  { value: 'quiz', label: 'Quiz', color: 'bg-green-500' },
  { value: 'test', label: 'Test', color: 'bg-blue-500' },
  { value: 'midterm', label: 'Midterm', color: 'bg-orange-500' },
  { value: 'final', label: 'Final', color: 'bg-red-500' },
  { value: 'project', label: 'Project', color: 'bg-purple-500' },
];

export const AssessmentStep: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();
  const [assessments, setAssessments] = useState<Partial<Assessment>[]>(
    formData.assessments.length > 0
      ? formData.assessments
      : [{ type: 'final', date: '', weight: 100 }]
  );

  const addAssessment = () => {
    setAssessments([...assessments, { type: 'test', date: '', weight: 50 }]);
  };

  const updateAssessment = (index: number, updates: Partial<Assessment>) => {
    const newAssessments = [...assessments];
    newAssessments[index] = { ...newAssessments[index], ...updates };
    setAssessments(newAssessments);
  };

  const removeAssessment = (index: number) => {
    setAssessments(assessments.filter((_, idx) => idx !== index));
  };

  const handleNext = () => {
    const validAssessments = assessments.filter((a) => a.date && a.type);
    updateFormData({ assessments: validAssessments });
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card variant="glass" className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Add Assessments</h2>
          <p className="text-gray-600 dark:text-gray-400">
            List your upcoming tests, quizzes, and exams
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {assessments.map((assessment, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700"
            >
              {assessments.length > 1 && (
                <button
                  onClick={() => removeAssessment(idx)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}

              <div className="space-y-4">
                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <select
                    value={assessment.subjectId || ''}
                    onChange={(e) =>
                      updateAssessment(idx, { subjectId: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:border-primary-500 transition-colors"
                  >
                    <option value="">Select Subject</option>
                    {formData.subjects.map((subject, sidx) => (
                      <option key={sidx} value={sidx.toString()}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assessment Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <div className="grid grid-cols-5 gap-2">
                    {assessmentTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() =>
                          updateAssessment(idx, { type: type.value })
                        }
                        className={cn(
                          'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                          assessment.type === type.value
                            ? `${type.color} text-white shadow-lg`
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        )}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date and Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Date"
                    type="date"
                    value={assessment.date || ''}
                    onChange={(e) =>
                      updateAssessment(idx, { date: e.target.value })
                    }
                  />
                  <Input
                    label="Weight (%)"
                    type="number"
                    min="0"
                    max="100"
                    value={assessment.weight || ''}
                    onChange={(e) =>
                      updateAssessment(idx, { weight: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={addAssessment}
          icon={<Plus className="w-5 h-5" />}
          className="w-full mb-8"
        >
          Add Another Assessment
        </Button>

        <div className="mt-8 flex justify-between">
          <Button
            variant="ghost"
            onClick={prevStep}
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Back
          </Button>
          <Button onClick={handleNext} icon={<ArrowRight className="w-5 h-5" />}>
            Continue
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};