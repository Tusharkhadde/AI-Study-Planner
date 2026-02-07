import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, ArrowRight } from 'lucide-react';
import { useFormStore } from '@/stores/useFormStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const StudentDetailsStep: React.FC = () => {
  const { formData, updateFormData, nextStep, setErrors, errors } = useFormStore();

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
          <h2 className="text-3xl font-bold mb-2">Let's Get Started!</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tell us a bit about yourself to personalize your study plan
          </p>
        </div>

        <div className="space-y-6">
          <Input
            label="Your Name"
            placeholder="John Doe"
            icon={<User className="w-5 h-5" />}
            value={formData.studentName}
            onChange={(e) => updateFormData({ studentName: e.target.value })}
            error={errors.studentName}
          />

          <Input
            label="Email (Optional)"
            type="email"
            placeholder="john@example.com"
            icon={<Mail className="w-5 h-5" />}
            helperText="We'll never share your email with anyone"
          />

          <Input
            label="Grade/Year (Optional)"
            placeholder="Grade 12 / College Freshman"
            icon={<GraduationCap className="w-5 h-5" />}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleNext}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Continue
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};