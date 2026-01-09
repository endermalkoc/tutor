/**
 * AddStudentScreen
 * Multi-step form for adding new students
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, colors } from '../../theme';
import { Button, Input, Card } from '../../components/ui';
import type { RootStackScreenProps } from '../../navigation/types';
import type { StudentType } from '../../types';

type Props = RootStackScreenProps<'AddStudent'>;

type Step = 'type' | 'info' | 'lesson' | 'billing';

interface FormData {
  type: StudentType | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  familyId: string | null;
  // Guardian info (for children)
  guardianFirstName: string;
  guardianLastName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianRelationship: string;
  // Lesson settings
  lessonDuration: string;
  skillLevel: string;
  subjects: string[];
  // Billing
  billingMethod: string;
  rate: string;
}

const initialFormData: FormData = {
  type: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  familyId: null,
  guardianFirstName: '',
  guardianLastName: '',
  guardianEmail: '',
  guardianPhone: '',
  guardianRelationship: 'mother',
  lessonDuration: '45',
  skillLevel: 'beginner',
  subjects: [],
  billingMethod: 'package',
  rate: '',
};

export function AddStudentScreen({ navigation }: Props) {
  const theme = useTheme();
  const [step, setStep] = useState<Step>('type');
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateForm = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps: { key: Step; label: string; number: number }[] = [
    { key: 'type', label: 'Type', number: 1 },
    { key: 'info', label: 'Info', number: 2 },
    { key: 'lesson', label: 'Lessons', number: 3 },
    { key: 'billing', label: 'Billing', number: 4 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const canProceed = () => {
    switch (step) {
      case 'type':
        return formData.type !== null;
      case 'info':
        return formData.firstName.trim() && formData.lastName.trim();
      case 'lesson':
        return true;
      case 'billing':
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex].key);
    } else {
      // Submit
      navigation.goBack();
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex].key);
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background.base }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Step Indicator */}
      <View style={[styles.stepIndicator, { backgroundColor: theme.colors.background.surface }]}>
        {steps.map((s, index) => (
          <React.Fragment key={s.key}>
            <TouchableOpacity
              onPress={() => index <= currentStepIndex && setStep(s.key)}
              disabled={index > currentStepIndex}
              style={styles.stepItem}
            >
              <View
                style={[
                  styles.stepCircle,
                  {
                    backgroundColor:
                      index <= currentStepIndex
                        ? theme.colors.primary
                        : theme.colors.border.default,
                  },
                ]}
              >
                {index < currentStepIndex ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : (
                  <Text style={styles.stepNumber}>{s.number}</Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  {
                    color:
                      index <= currentStepIndex
                        ? theme.colors.foreground.default
                        : theme.colors.foreground.muted,
                  },
                ]}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.stepLine,
                  {
                    backgroundColor:
                      index < currentStepIndex
                        ? theme.colors.primary
                        : theme.colors.border.default,
                  },
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Step Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {step === 'type' && (
          <TypeStep
            value={formData.type}
            onChange={(type) => updateForm('type', type)}
          />
        )}
        {step === 'info' && (
          <InfoStep
            formData={formData}
            updateForm={updateForm}
          />
        )}
        {step === 'lesson' && (
          <LessonStep
            formData={formData}
            updateForm={updateForm}
          />
        )}
        {step === 'billing' && (
          <BillingStep
            formData={formData}
            updateForm={updateForm}
          />
        )}
      </ScrollView>

      {/* Footer Actions */}
      <View style={[styles.footer, { backgroundColor: theme.colors.background.surface }]}>
        <Button
          variant="ghost"
          onPress={handleBack}
          style={styles.footerButton}
        >
          {currentStepIndex === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button
          onPress={handleNext}
          disabled={!canProceed()}
          style={styles.footerButton}
        >
          {currentStepIndex === steps.length - 1 ? 'Create Student' : 'Continue'}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

// Step Components
function TypeStep({ value, onChange }: { value: StudentType | null; onChange: (type: StudentType) => void }) {
  const theme = useTheme();

  const options: { type: StudentType; icon: keyof typeof Ionicons.glyphMap; title: string; description: string }[] = [
    {
      type: 'child',
      icon: 'happy-outline',
      title: 'Child Student',
      description: 'Minor student with guardian/parent contact',
    },
    {
      type: 'adult',
      icon: 'person-outline',
      title: 'Adult Student',
      description: 'Adult student manages their own account',
    },
  ];

  return (
    <View>
      <Text style={[styles.stepTitle, { color: theme.colors.foreground.default }]}>
        What type of student?
      </Text>
      <Text style={[styles.stepDescription, { color: theme.colors.foreground.muted }]}>
        Choose the student type to set up the right contact structure
      </Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.type}
            onPress={() => onChange(option.type)}
            style={[
              styles.optionCard,
              {
                backgroundColor: theme.colors.background.surface,
                borderColor: value === option.type ? theme.colors.primary : theme.colors.border.default,
                borderWidth: value === option.type ? 2 : 1,
              },
            ]}
          >
            <View
              style={[
                styles.optionIcon,
                {
                  backgroundColor:
                    value === option.type ? colors.primary[100] : theme.colors.background.muted,
                },
              ]}
            >
              <Ionicons
                name={option.icon}
                size={28}
                color={value === option.type ? theme.colors.primary : theme.colors.foreground.muted}
              />
            </View>
            <Text
              style={[
                styles.optionTitle,
                { color: theme.colors.foreground.default },
              ]}
            >
              {option.title}
            </Text>
            <Text
              style={[
                styles.optionDescription,
                { color: theme.colors.foreground.muted },
              ]}
            >
              {option.description}
            </Text>
            {value === option.type && (
              <View style={[styles.checkmark, { backgroundColor: theme.colors.primary }]}>
                <Ionicons name="checkmark" size={14} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function InfoStep({ formData, updateForm }: { formData: FormData; updateForm: (field: keyof FormData, value: any) => void }) {
  const theme = useTheme();

  return (
    <View>
      <Text style={[styles.stepTitle, { color: theme.colors.foreground.default }]}>
        Student Information
      </Text>
      <Text style={[styles.stepDescription, { color: theme.colors.foreground.muted }]}>
        Enter the student's basic details
      </Text>

      <Card style={styles.formCard}>
        <Input
          label="First Name"
          placeholder="Enter first name"
          value={formData.firstName}
          onChangeText={(text) => updateForm('firstName', text)}
          autoCapitalize="words"
        />
        <Input
          label="Last Name"
          placeholder="Enter last name"
          value={formData.lastName}
          onChangeText={(text) => updateForm('lastName', text)}
          autoCapitalize="words"
        />
        {formData.type === 'adult' && (
          <>
            <Input
              label="Email"
              placeholder="student@email.com"
              value={formData.email}
              onChangeText={(text) => updateForm('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Phone"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChangeText={(text) => updateForm('phone', text)}
              keyboardType="phone-pad"
            />
          </>
        )}
      </Card>

      {formData.type === 'child' && (
        <>
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground.default }]}>
            Primary Guardian
          </Text>
          <Card style={styles.formCard}>
            <Input
              label="Guardian First Name"
              placeholder="Enter first name"
              value={formData.guardianFirstName}
              onChangeText={(text) => updateForm('guardianFirstName', text)}
              autoCapitalize="words"
            />
            <Input
              label="Guardian Last Name"
              placeholder="Enter last name"
              value={formData.guardianLastName}
              onChangeText={(text) => updateForm('guardianLastName', text)}
              autoCapitalize="words"
            />
            <Input
              label="Email"
              placeholder="parent@email.com"
              value={formData.guardianEmail}
              onChangeText={(text) => updateForm('guardianEmail', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Phone"
              placeholder="(555) 123-4567"
              value={formData.guardianPhone}
              onChangeText={(text) => updateForm('guardianPhone', text)}
              keyboardType="phone-pad"
            />
          </Card>
        </>
      )}
    </View>
  );
}

function LessonStep({ formData, updateForm }: { formData: FormData; updateForm: (field: keyof FormData, value: any) => void }) {
  const theme = useTheme();

  const durations = ['30', '45', '60', '90'];
  const levels = ['beginner', 'intermediate', 'advanced'];

  return (
    <View>
      <Text style={[styles.stepTitle, { color: theme.colors.foreground.default }]}>
        Lesson Settings
      </Text>
      <Text style={[styles.stepDescription, { color: theme.colors.foreground.muted }]}>
        Configure default lesson preferences
      </Text>

      <Card style={styles.formCard}>
        <Text style={[styles.fieldLabel, { color: theme.colors.foreground.secondary }]}>
          Lesson Duration
        </Text>
        <View style={styles.chipGroup}>
          {durations.map((d) => (
            <TouchableOpacity
              key={d}
              onPress={() => updateForm('lessonDuration', d)}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    formData.lessonDuration === d
                      ? theme.colors.primary
                      : theme.colors.background.muted,
                  borderColor:
                    formData.lessonDuration === d
                      ? theme.colors.primary
                      : theme.colors.border.default,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color:
                      formData.lessonDuration === d
                        ? '#fff'
                        : theme.colors.foreground.default,
                  },
                ]}
              >
                {d} min
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.fieldLabel, { color: theme.colors.foreground.secondary, marginTop: 20 }]}>
          Skill Level
        </Text>
        <View style={styles.chipGroup}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => updateForm('skillLevel', level)}
              style={[
                styles.chip,
                {
                  backgroundColor:
                    formData.skillLevel === level
                      ? theme.colors.primary
                      : theme.colors.background.muted,
                  borderColor:
                    formData.skillLevel === level
                      ? theme.colors.primary
                      : theme.colors.border.default,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  {
                    color:
                      formData.skillLevel === level
                        ? '#fff'
                        : theme.colors.foreground.default,
                  },
                ]}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
    </View>
  );
}

function BillingStep({ formData, updateForm }: { formData: FormData; updateForm: (field: keyof FormData, value: any) => void }) {
  const theme = useTheme();

  const methods = [
    { key: 'package', label: 'Package', description: 'Prepaid lesson packages' },
    { key: 'hourly', label: 'Hourly', description: 'Pay per lesson' },
    { key: 'monthly', label: 'Monthly', description: 'Fixed monthly rate' },
  ];

  return (
    <View>
      <Text style={[styles.stepTitle, { color: theme.colors.foreground.default }]}>
        Billing Setup
      </Text>
      <Text style={[styles.stepDescription, { color: theme.colors.foreground.muted }]}>
        Choose how this student will be billed
      </Text>

      <Card style={styles.formCard}>
        <Text style={[styles.fieldLabel, { color: theme.colors.foreground.secondary }]}>
          Billing Method
        </Text>
        {methods.map((method) => (
          <TouchableOpacity
            key={method.key}
            onPress={() => updateForm('billingMethod', method.key)}
            style={[
              styles.radioOption,
              {
                borderColor:
                  formData.billingMethod === method.key
                    ? theme.colors.primary
                    : theme.colors.border.default,
                backgroundColor:
                  formData.billingMethod === method.key
                    ? colors.primary[50]
                    : 'transparent',
              },
            ]}
          >
            <View
              style={[
                styles.radioCircle,
                {
                  borderColor:
                    formData.billingMethod === method.key
                      ? theme.colors.primary
                      : theme.colors.border.strong,
                },
              ]}
            >
              {formData.billingMethod === method.key && (
                <View style={[styles.radioFill, { backgroundColor: theme.colors.primary }]} />
              )}
            </View>
            <View style={styles.radioContent}>
              <Text style={[styles.radioLabel, { color: theme.colors.foreground.default }]}>
                {method.label}
              </Text>
              <Text style={[styles.radioDescription, { color: theme.colors.foreground.muted }]}>
                {method.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <Input
          label="Rate"
          placeholder="Enter rate"
          value={formData.rate}
          onChangeText={(text) => updateForm('rate', text)}
          keyboardType="decimal-pad"
          icon="cash-outline"
          containerStyle={{ marginTop: 16 }}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  stepLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 15,
    marginBottom: 24,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCard: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioFill: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioContent: {
    marginLeft: 12,
    flex: 1,
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  radioDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 32,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerButton: {
    flex: 1,
  },
});
