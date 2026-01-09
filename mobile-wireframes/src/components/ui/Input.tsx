/**
 * Input Component
 * Text input with label and validation states
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  helper,
  icon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  ...props
}: InputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (error) return theme.colors.error;
    if (isFocused) return theme.colors.primary;
    return theme.colors.border.default;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[styles.label, { color: theme.colors.foreground.secondary }]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: theme.colors.background.surface,
          },
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={theme.colors.foreground.muted}
            style={styles.icon}
          />
        )}
        <TextInput
          {...props}
          style={[
            styles.input,
            {
              color: theme.colors.foreground.default,
              paddingLeft: icon ? 0 : 12,
              paddingRight: rightIcon ? 0 : 12,
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.foreground.faint}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <Ionicons
              name={rightIcon}
              size={18}
              color={theme.colors.foreground.muted}
            />
          </TouchableOpacity>
        )}
      </View>
      {(error || helper) && (
        <Text
          style={[
            styles.helper,
            { color: error ? theme.colors.error : theme.colors.foreground.muted },
          ]}
        >
          {error || helper}
        </Text>
      )}
    </View>
  );
}

// Search Input variant
interface SearchInputProps extends Omit<InputProps, 'icon' | 'label'> {
  onClear?: () => void;
}

export function SearchInput({ onClear, value, ...props }: SearchInputProps) {
  const theme = useTheme();

  return (
    <Input
      {...props}
      value={value}
      icon="search"
      rightIcon={value ? 'close-circle' : undefined}
      onRightIconPress={onClear}
      placeholder={props.placeholder || 'Search...'}
      returnKeyType="search"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 44,
  },
  icon: {
    marginLeft: 12,
    marginRight: 8,
  },
  rightIcon: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
  },
  helper: {
    fontSize: 12,
    marginTop: 4,
  },
});
