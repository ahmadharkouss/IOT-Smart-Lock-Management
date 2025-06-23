# Frontend - EpiSafe Angular Application

## 📱 Overview

The **EpiSafe Frontend** is a modern Angular 18 web application that provides a comprehensive user interface for managing the IOT Smart Lock Management System. Built with Angular Material, it offers an intuitive dashboard for user management, door access control, and real-time activity monitoring.

## 🏗️ Architecture

### Technology Stack
- **Framework**: Angular 18
- **UI Library**: Angular Material 18
- **Data Grid**: AG-Grid 31.3.2
- **Build Tool**: Angular CLI 18
- **Testing**: Jasmine & Karma
- **Styling**: SCSS with custom themes

### Key Features
- **Responsive Design**: Mobile-first approach with Material Design
- **Real-time Updates**: Live activity monitoring and notifications
- **Role-based UI**: Different interfaces for admins and users
- **Data Tables**: Advanced filtering, sorting, and pagination
- **Modal Dialogs**: Streamlined user interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher
- Angular CLI 18

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve --configuration development
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:4200`

### Development Commands

```bash
# Start development server
ng serve --configuration development

# Build for production
ng build --configuration production

# Run unit tests
ng test

# Run linting
ng lint

# Generate new component
ng generate component component-name

# Generate new service
ng generate service service-name
```

## 🖥️ Application Structure

### Main Components

#### Dashboard Components
- **Home Dashboard** (`home/`) - Main landing page with system overview
- **Roles Dashboard** (`roles/`) - User and user group management
- **Rights Dashboard** (`rights/`) - Door and access permission management
- **Logs Dashboard** (`logs/`) - Activity monitoring and audit logs
- **Options Dashboard** (`options/`) - System configuration settings

#### Navigation
- **Side Navigation** (`side-nav/`) - Main navigation component
- **Login** (`login/`) - Authentication interface
- **Root** (`root/`) - Main application wrapper

### Feature Modules

#### User Management (`roles/`)
```
roles/
├── user/                    # Individual user management
├── user-group/             # User group operations
├── dialogs/                # Modal dialogs for CRUD operations
│   ├── user/
│   │   ├── create-user.dialog/
│   │   └── update-user.dialog/
│   ├── userGroup/
│   │   ├── create-userGroup.dialog/
│   │   └── update-user-group.dialog/
│   └── add-userto-group.dialog/
└── popups/                 # Confirmation and list popups
    ├── user/
    │   ├── delete-user.popup/
    │   └── list-users.popup/
    └── userGroup/
        └── delete-user-group.popup/
```

#### Access Control (`rights/`)
```
rights/
├── door/                   # Door management
├── door-group/            # Door group operations
├── dialogs/               # CRUD dialogs
│   ├── door/
│   │   └── create-door.dialog/
│   ├── doorGroup/
│   │   ├── create-door-group.dialog/
│   │   └── update-door-group.dialog/
│   ├── add-door-to-group/
│   └── adduser-group-todoor-group/
└── popups/               # Management popups
    ├── door/
    │   ├── delete-door.popup/
    │   └── list-doors.popup/
    ├── doorGroups/
    │   └── delete-door-group.popup/
    └── user-group-listof-door-group/
```

## 🔐 Authentication & Security

### Guard System
- **AuthGuard** (`auth-test.guard.ts`) - Route protection
- **KeycloakGuard** (`keycloak.guard.ts`) - Keycloak integration

### Authentication Flow
1. User accesses protected route
2. Guard checks authentication status
3. Redirects to login if not authenticated
4. JWT token stored and managed by services
5. Automatic token refresh handling

### Security Services
- **AuthService** (`auth/auth-test.service.ts`) - Authentication logic
- **KeycloakService** (`auth/keycloak.service.ts`) - Keycloak integration

## 🛠️ Services Architecture

### Core Services

#### Data Services
```typescript
// User management
user.service.ts              # User CRUD operations
user-group.service.ts        # User group management

// Door management  
door.service.ts              # Door CRUD operations
door-group.service.ts        # Door group management

// Activity logging
logs.service.ts              # Activity log retrieval

// Transaction services
group.transaction.service.ts # Cross-entity operations
```

#### Service Structure Example
```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.apiUrl}/admin/user/all`);
  }

  createUser(user: UserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/admin/user`, user);
  }

  updateUser(user: UserRequest): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.apiUrl}/admin/user`, user);
  }

  deleteUser(id: number): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${this.apiUrl}/admin/user/${id}`);
  }
}
```

## 🎨 UI Components & Styling

### Material Design Integration
- **Material Theme**: Custom color palette with blue and red branding
- **Responsive Layout**: Mobile-first design principles
- **Dark/Light Theme**: User preference support

### Custom Styling
```scss
// Custom theme configuration
@import 'custom-theme.scss';
@import 'custom-palette.scss';

// Component-specific styling
.dashboard-container {
  padding: 20px;
  background: var(--background-color);
}

.card-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

### Data Grid Configuration
- **AG-Grid Integration**: Advanced data tables with sorting, filtering, pagination
- **Custom Cell Renderers**: Action buttons, status indicators, custom formatters
- **Export Functionality**: CSV/Excel export capabilities

## 🔄 State Management

### Service-based State
- **Reactive Services**: RxJS-based state management
- **HTTP Client**: Centralized API communication
- **Error Handling**: Global error interceptors

### Data Flow
```
Component → Service → HTTP Client → Backend API
    ↓
Component ← Service ← HTTP Response ← Backend API
```

## 🧪 Testing

### Unit Testing
```bash
# Run all tests
ng test

# Run tests with coverage
ng test --code-coverage

# Run tests in headless mode
ng test --browsers=ChromeHeadless --watch=false
```

### Test Structure
```typescript
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getAllUsers']);

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    mockUserService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## 🌐 Environment Configuration

### Environment Files
```typescript
// environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5187',
  enableLogging: true,
  keycloakUrl: 'http://localhost:8080'
};

// environment.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com',
  enableLogging: false,
  keycloakUrl: 'https://your-keycloak-domain.com'
};
```

## 📦 Build & Deployment

### Development Build
```bash
ng build --configuration development
```

### Production Build
```bash
ng build --configuration production
```

### Docker Deployment
```dockerfile
# Multi-stage build
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build --prod

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build Optimization
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Lazy loading for feature modules
- **Asset Optimization**: Image compression and minification
- **Bundle Analysis**: Webpack bundle analyzer integration

## 🔧 Development Guidelines

### Code Structure
```typescript
// Component example
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.less']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  users$: Observable<User[]>;
  loading = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUsers(): void {
    this.loading = true;
    this.users$ = this.userService.getAllUsers()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      );
  }
}
```

### Best Practices
1. **Component Lifecycle**: Proper subscription management with takeUntil
2. **Reactive Forms**: FormBuilder and validation patterns
3. **Error Handling**: User-friendly error messages
4. **Accessibility**: ARIA labels and keyboard navigation
5. **Performance**: OnPush change detection strategy

## 🚀 Performance Optimization

### Lazy Loading
```typescript
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  }
];
```

### Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  // Component implementation
}
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured
   - Check API URL in environment files

2. **Authentication Issues**
   - Verify JWT token format
   - Check token expiration
   - Validate API endpoints

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript version compatibility
   - Verify Angular CLI version

### Development Tools
- **Angular DevTools**: Browser extension for debugging
- **Redux DevTools**: State inspection (if using NgRx)
- **Browser Network Tab**: API call monitoring

## 📚 Additional Resources

- **Angular Documentation**: https://angular.dev
- **Angular Material**: https://material.angular.io
- **AG-Grid Angular**: https://ag-grid.com/angular-data-grid
- **RxJS Documentation**: https://rxjs.dev

---

**Note**: This application is optimized for modern browsers and requires JavaScript to be enabled.
