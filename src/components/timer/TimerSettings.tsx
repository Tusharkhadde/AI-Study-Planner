import React from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { useTimerStore } from '@/stores/useTimerStore';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

interface TimerSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimerSettings: React.FC<TimerSettingsProps> = ({
  isOpen,
  onClose,
}) => {
  const { settings, updateSettings } = useTimerStore();
  const [localSettings, setLocalSettings] = React.useState(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    toast.success('Timer settings updated!');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Timer Settings"
      size="md"
    >
      <div className="space-y-6">
        <Input
          label="Focus Duration (minutes)"
          type="number"
          min="1"
          max="60"
          value={localSettings.focusDuration}
          onChange={(e) =>
            setLocalSettings({
              ...localSettings,
              focusDuration: parseInt(e.target.value),
            })
          }
        />

        <Input
          label="Short Break (minutes)"
          type="number"
          min="1"
          max="30"
          value={localSettings.shortBreak}
          onChange={(e) =>
            setLocalSettings({
              ...localSettings,
              shortBreak: parseInt(e.target.value),
            })
          }
        />

        <Input
          label="Long Break (minutes)"
          type="number"
          min="1"
          max="60"
          value={localSettings.longBreak}
          onChange={(e) =>
            setLocalSettings({
              ...localSettings,
              longBreak: parseInt(e.target.value),
            })
          }
        />

        <Input
          label="Sessions Until Long Break"
          type="number"
          min="2"
          max="8"
          value={localSettings.sessionsUntilLongBreak}
          onChange={(e) =>
            setLocalSettings({
              ...localSettings,
              sessionsUntilLongBreak: parseInt(e.target.value),
            })
          }
        />

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            icon={<Save className="w-5 h-5" />}
            className="flex-1"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </Modal>
  );
};