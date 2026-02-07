import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import { useFormStore } from '@/stores/useFormStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SubjectCard } from '../SubjectCard';
import { Subject, Priority } from '@/types';

export const SubjectsStep: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep, setErrors } = useFormStore();
  const [subjects, setSubjects] = useState<Partial<Subject>[]>(
    formData.subjects.length > 0
      ? formData.subjects
      : [{ name: '', confidenceLevel: 3, priority: 'medium' as Priority, topics: [] }]
  );

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { name: '', confidenceLevel: 3, priority: 'medium' as Priority, topics: [] },
    ]);
  };

  const updateSubject = (index: number, updates: Partial<Subject>) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], ...updates };
    setSubjects(newSubjects);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, idx) => idx !== index));
  };

  const handleNext = () => {
    const validSubjects = subjects.filter((s) => s.name && s.name.trim() !== '');

    if (validSubjects.length === 0) {
      setErrors({ subjects: 'Please add at least one subject' });
      return;
    }

    updateFormData({ subjects: validSubjects });
    setErrors({});
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card variant="glass" className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Add Your Subjects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            List the subjects you need to study and rate your confidence level
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {subjects.map((subject, idx) => (
            <SubjectCard
              key={idx}
              subject={subject}
              index={idx}
              onUpdate={updateSubject}
              onRemove={removeSubject}
              canRemove={subjects.length > 1}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={addSubject}
          icon={<Plus className="w-5 h-5" />}
          className="w-full mb-8"
        >
          Add Another Subject
        </Button>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={prevStep} icon={<ArrowLeft className="w-5 h-5" />}>
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