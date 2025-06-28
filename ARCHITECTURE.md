# App Architecture Guide

## 📁 Project Structure

```
Mazen Project/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Tab navigation screens
│   ├── auth/                     # Authentication screens
│   └── reading/                  # Reading-related screens
├── src/                          # Source code organization
│   ├── shared/                   # Shared utilities and foundations
│   │   ├── types/               # TypeScript type definitions
│   │   ├── services/            # Business logic and API calls
│   │   ├── contexts/            # React contexts
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Utility functions
│   │   ├── constants/           # App constants and configurations
│   │   └── config/              # Environment configuration
│   ├── features/                # Feature-based modules (to be organized)
│   │   ├── auth/                # Authentication feature
│   │   ├── library/             # Library management feature
│   │   ├── community/           # Community features
│   │   ├── profile/             # User profile features
│   │   └── reading/             # Reading experience features
│   └── components/              # Reusable UI components
└── assets/                      # Static assets
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **UI Components**: Handle presentation and user interaction
- **Services**: Manage business logic and API calls
- **Contexts**: Provide global state management
- **Hooks**: Encapsulate reusable logic
- **Utils**: Pure functions for data transformation

### 2. **Type Safety**
- All interfaces and types are defined in `src/shared/types/`
- Barrel exports from `src/shared/types/index.ts` for clean imports
- Consistent type definitions across the app

### 3. **Error Handling**
- Centralized error messages in `src/shared/constants/errors.ts`
- Custom `AppError` class for structured error handling
- Consistent error response format with `ApiResponse<T>` type

### 4. **Service Layer Pattern**
- Business logic separated from UI components
- Services handle all API calls and data manipulation
- Clean separation between mock data and real API calls

## 📋 Development Guidelines

### Adding New Features

1. **Create Types First**
   ```typescript
   // src/shared/types/newFeature.ts
   export interface NewFeatureData { ... }
   ```

2. **Create Service Layer**
   ```typescript
   // src/shared/services/newFeature.service.ts
   export class NewFeatureService {
     static async getData(): Promise<ApiResponse<NewFeatureData>> { ... }
   }
   ```

3. **Create Custom Hooks (if needed)**
   ```typescript
   // src/shared/hooks/useNewFeature.ts
   export function useNewFeature() { ... }
   ```

4. **Build UI Components**
   ```typescript
   // app/newfeature/index.tsx
   export default function NewFeatureScreen() { ... }
   ```

### Code Organization Rules

1. **File Naming**: Use kebab-case for files, PascalCase for components
2. **Import Order**: External libraries → Internal shared → Relative imports
3. **Type Exports**: Always use barrel exports from index files
4. **Service Methods**: Use static methods for stateless operations
5. **Error Handling**: Always return `ApiResponse<T>` from services

## 🛠️ Available Utilities

### Types
- `User`, `AuthContextType` - Authentication types
- `ApiResponse<T>` - Standardized API response format
- `LoadingState` - Common loading/error state pattern
- `Book`, `ReadingProgress` - Content-related types

### Services
- `AuthService` - User authentication and session management

### Hooks
- `useAuth()` - Authentication state and methods
- `useTheme()` - Theme management
- `useAsyncOperation<T>()` - Async operation with loading states

### Utils
- `Validator` - Input validation methods
- `formatters` - Data formatting utilities
- `log` - Development logging utilities

### Constants
- `ERROR_MESSAGES` - Centralized error messages
- `SUCCESS_MESSAGES` - Success feedback messages
- `DEV_CONFIG` - Development configuration

## 🎯 Best Practices

### Component Organization
```typescript
// ✅ Good: Clean component with separated concerns
function MyComponent() {
  const { user } = useAuth();
  const { execute, isLoading, error } = useAsyncOperation(MyService.getData);
  
  // UI logic only
  return <View>...</View>;
}

// ❌ Bad: Mixed concerns
function MyComponent() {
  const [data, setData] = useState(null);
  // API logic mixed with UI logic
  useEffect(() => {
    fetch('/api/data').then(...);
  }, []);
}
```

### Service Usage
```typescript
// ✅ Good: Using service layer
const response = await AuthService.signInWithEmail({ email, password });
if (!response.success) {
  throw new Error(response.error);
}

// ❌ Bad: Direct API calls in components
const response = await fetch('/api/auth/signin', { ... });
```

### Error Handling
```typescript
// ✅ Good: Structured error handling
try {
  const result = await SomeService.operation();
  if (!result.success) {
    setError(result.error);
    return;
  }
  // Handle success
} catch (error) {
  setError(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
}
```

## 🔄 Migration Path

As you continue building:

1. **Move feature logic** from `app/` to `src/features/` when features grow large
2. **Extract reusable components** to `src/components/`
3. **Create feature-specific services** in each feature directory
4. **Add proper state management** (Zustand/Redux) when context becomes complex
5. **Implement proper API layer** when moving from mock data to real backend

## 🧪 Testing Strategy

- **Unit Tests**: Test services and utilities
- **Integration Tests**: Test hooks and contexts
- **Component Tests**: Test UI behavior
- **E2E Tests**: Test critical user flows (auth, reading, etc.)

This architecture sets you up for scalable, maintainable code as your app grows! 