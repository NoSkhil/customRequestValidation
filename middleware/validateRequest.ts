// middleware.ts
import { Request, Response, NextFunction } from 'express';

interface ValidationRule {
  required?: boolean;
  type?: 'string' | 'number' | 'object';
  pattern?: RegExp;
  min?: number;
  data?: { [key: string]: ValidationRule }; // For nested object validation
}

interface PartValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationConfig {
  params?: PartValidationRules;
  body?: PartValidationRules;
  query?: PartValidationRules;
  // Extend as needed for other parts like headers or cookies
}

const validateRule = (key: string, value: any, rule: ValidationRule, path = ''): string[] => {
  const errors: string[] = [];
  const fullPath = path ? `${path}.${key}` : key;

  if (rule.required && (value === undefined || value === null)) {
    errors.push(`${fullPath} is required`);
  } else if (value !== undefined && value !== null) {
    if (rule.type && typeof value !== rule.type) {
      errors.push(`${fullPath} must be a ${rule.type}`);
    }
    if (rule.type === 'string' && rule.pattern && !rule.pattern.test(value)) {
      errors.push(`${fullPath} is not valid`);
    }
    if (rule.type === 'number' && rule.min !== undefined && value < rule.min) {
      errors.push(`${fullPath} must be at least ${rule.min}`);
    }
    if (rule.type === 'object' && rule.data) {
      Object.entries(rule.data).forEach(([nestedKey, nestedRule]) => {
        errors.push(...validateRule(nestedKey, value[nestedKey], nestedRule, fullPath));
      });
    }
  }

  return errors;
};

export const validateRequest = (config: ValidationConfig) => (req: Request, res: Response, next: NextFunction) => {
  const errors: string[] = [];

  Object.entries(config).forEach(([part, rules]:[string,ValidationRule[]]) => {
    const requestPart: any = req[part as keyof Request];
    Object.entries(rules).forEach(([key, rule]:[string,ValidationRule]) => {
      const value = requestPart[key];
      errors.push(...validateRule(key, value, rule, part));
    });
  });

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    next();
  }
};
