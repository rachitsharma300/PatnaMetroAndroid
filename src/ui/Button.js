import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  style = {},
  textStyle = {},
  ...props 
}) => {
  const { t } = useTranslation();
  
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: '#6b7280',
          borderColor: '#6b7280',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: '#2563eb',
        };
      default:
        return {
          backgroundColor: '#2563eb',
          borderColor: '#2563eb',
        };
    }
  };

  const getTextColor = () => {
    return variant === 'outline' ? '#2563eb' : '#ffffff';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 48,
          opacity: disabled ? 0.6 : 1,
          borderWidth: 1,
          ...getVariantStyle(),
        },
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={[
            {
              color: getTextColor(),
              fontSize: 16,
              fontWeight: '600',
            },
            textStyle,
          ]}
        >
          {t(title)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;