import { useState } from 'react';
import {
  Select,
  Input,
  FormGroup,
  FormLabel,
} from '../../../components/design-system';
import './RecurrenceConfig.css';

type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';
type EndType = 'indefinitely' | 'until_date';
type MonthlyDayType = 'day_of_month' | 'weekday_of_month';

const daysOfWeek = [
  { value: 'monday', label: 'Mon' },
  { value: 'tuesday', label: 'Tue' },
  { value: 'wednesday', label: 'Wed' },
  { value: 'thursday', label: 'Thu' },
  { value: 'friday', label: 'Fri' },
  { value: 'saturday', label: 'Sat' },
  { value: 'sunday', label: 'Sun' },
];

const weekdayOrdinals = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
  { value: 'fourth', label: 'Fourth' },
  { value: 'last', label: 'Last' },
];

interface RecurrenceConfigProps {
  startDate: string;
  onStartDateChange: (date: string) => void;
}

export function RecurrenceConfig({ startDate, onStartDateChange }: RecurrenceConfigProps) {
  const [frequency, setFrequency] = useState<Frequency>('weekly');
  const [interval, setInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState<string[]>(['monday']);
  const [monthlyDayType, setMonthlyDayType] = useState<MonthlyDayType>('day_of_month');
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [weekdayOrdinal, setWeekdayOrdinal] = useState('first');
  const [weekday, setWeekday] = useState('monday');
  const [endType, setEndType] = useState<EndType>('indefinitely');
  const [endDate, setEndDate] = useState('');

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter((d) => d !== day));
      }
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Generate summary text
  const getSummary = () => {
    let summary = '';

    if (frequency === 'daily') {
      const dayLabels = selectedDays.map((d) =>
        daysOfWeek.find((dw) => dw.value === d)?.label
      ).join(', ');
      summary = `Every ${dayLabels}`;
    } else if (frequency === 'weekly') {
      summary = interval === 1 ? 'Every week' : `Every ${interval} weeks`;
    } else if (frequency === 'monthly') {
      const intervalText = interval === 1 ? 'Monthly' : `Every ${interval} months`;
      if (monthlyDayType === 'day_of_month') {
        summary = `${intervalText} on day ${dayOfMonth}`;
      } else {
        const ordinalLabel = weekdayOrdinals.find((o) => o.value === weekdayOrdinal)?.label.toLowerCase();
        const dayLabel = daysOfWeek.find((d) => d.value === weekday)?.label;
        summary = `${intervalText} on the ${ordinalLabel} ${dayLabel}`;
      }
    } else if (frequency === 'yearly') {
      summary = interval === 1 ? 'Every year' : `Every ${interval} years`;
    }

    if (endType === 'until_date' && endDate) {
      const formattedDate = new Date(endDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      summary += ` until ${formattedDate}`;
    }

    return summary;
  };

  return (
    <div className="recurrence-config">
      <div className="recurrence-form">
        {/* Frequency Selection */}
        <FormGroup>
          <FormLabel>Repeat</FormLabel>
          <Select value={frequency} onChange={(e) => setFrequency(e.target.value as Frequency)}>
            <option value="daily">Daily (specific days)</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Select>
        </FormGroup>

        {/* Daily: Day Selection */}
        {frequency === 'daily' && (
          <FormGroup>
            <FormLabel>On these days</FormLabel>
            <div className="day-selector">
              {daysOfWeek.map((day) => (
                <button
                  key={day.value}
                  type="button"
                  className={`day-btn ${selectedDays.includes(day.value) ? 'selected' : ''}`}
                  onClick={() => toggleDay(day.value)}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </FormGroup>
        )}

        {/* Weekly: Interval */}
        {frequency === 'weekly' && (
          <FormGroup>
            <FormLabel>Every</FormLabel>
            <div className="interval-input">
              <Input
                type="number"
                min="1"
                max="52"
                value={interval}
                onChange={(e) => setInterval(parseInt(e.target.value) || 1)}
                className="interval-number"
              />
              <span className="interval-unit">week{interval !== 1 ? 's' : ''}</span>
            </div>
          </FormGroup>
        )}

        {/* Monthly: Interval + Day Type */}
        {frequency === 'monthly' && (
          <>
            <FormGroup>
              <FormLabel>Every</FormLabel>
              <div className="interval-input">
                <Input
                  type="number"
                  min="1"
                  max="12"
                  value={interval}
                  onChange={(e) => setInterval(parseInt(e.target.value) || 1)}
                  className="interval-number"
                />
                <span className="interval-unit">month{interval !== 1 ? 's' : ''}</span>
              </div>
            </FormGroup>

            <FormGroup>
              <FormLabel>On</FormLabel>
              <div className="monthly-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="monthlyDayType"
                    checked={monthlyDayType === 'day_of_month'}
                    onChange={() => setMonthlyDayType('day_of_month')}
                  />
                  <span>Day</span>
                  <Input
                    type="number"
                    min="1"
                    max="31"
                    value={dayOfMonth}
                    onChange={(e) => setDayOfMonth(parseInt(e.target.value) || 1)}
                    className="day-number-input"
                    disabled={monthlyDayType !== 'day_of_month'}
                  />
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="monthlyDayType"
                    checked={monthlyDayType === 'weekday_of_month'}
                    onChange={() => setMonthlyDayType('weekday_of_month')}
                  />
                  <span>The</span>
                  <Select
                    value={weekdayOrdinal}
                    onChange={(e) => setWeekdayOrdinal(e.target.value)}
                    className="ordinal-select"
                    disabled={monthlyDayType !== 'weekday_of_month'}
                  >
                    {weekdayOrdinals.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </Select>
                  <Select
                    value={weekday}
                    onChange={(e) => setWeekday(e.target.value)}
                    className="weekday-select"
                    disabled={monthlyDayType !== 'weekday_of_month'}
                  >
                    {daysOfWeek.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.value.charAt(0).toUpperCase() + d.value.slice(1)}
                      </option>
                    ))}
                  </Select>
                </label>
              </div>
            </FormGroup>
          </>
        )}

        {/* Yearly: Interval */}
        {frequency === 'yearly' && (
          <FormGroup>
            <FormLabel>Every</FormLabel>
            <div className="interval-input">
              <Input
                type="number"
                min="1"
                max="10"
                value={interval}
                onChange={(e) => setInterval(parseInt(e.target.value) || 1)}
                className="interval-number"
              />
              <span className="interval-unit">year{interval !== 1 ? 's' : ''}</span>
            </div>
          </FormGroup>
        )}

        {/* Start Date */}
        <FormGroup>
          <FormLabel>Starting</FormLabel>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
          />
        </FormGroup>

        {/* End Type */}
        <FormGroup>
          <FormLabel>Ends</FormLabel>
          <div className="end-options">
            <label className="radio-option">
              <input
                type="radio"
                name="endType"
                checked={endType === 'indefinitely'}
                onChange={() => setEndType('indefinitely')}
              />
              <span>Never</span>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="endType"
                checked={endType === 'until_date'}
                onChange={() => setEndType('until_date')}
              />
              <span>On</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={endType !== 'until_date'}
                className="end-date-input"
              />
            </label>
          </div>
        </FormGroup>
      </div>

      {/* Summary */}
      <div className="recurrence-summary">
        <i className="ph ph-calendar-dots" />
        <span>{getSummary()}</span>
      </div>
    </div>
  );
}
