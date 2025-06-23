# Backend - Episafe API

## 🖥️ Overview

The **Episafe Backend** is a robust .NET 8.0 Web API that serves as the central control system for the IOT Smart Lock Management platform. It provides comprehensive REST endpoints for user management, door control, access permissions, and activity logging.

## 🏗️ Architecture

### Technology Stack
- **Framework**: ASP.NET Core 8.0
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT Bearer Tokens
- **API Documentation**: Swagger/OpenAPI
- **Real-time Features**: Background services for monitoring

### Key Components
- **Controllers**: API endpoints for frontend communication
- **Data Models**: Database entities and DTOs
- **Services**: Business logic and data access
- **Middleware**: Authentication, exception handling, CORS
- **Background Tasks**: Real-time monitoring and logging

## 🔗 API Endpoints

### User Management (`/admin/user`)
```http
GET    /admin/user/all           # Get all users
GET    /admin/user/{id}          # Get user by ID
POST   /admin/user               # Create new user
PATCH  /admin/user               # Update user
DELETE /admin/user/{id}          # Delete user
```

### User Groups (`/admin/usergroup`)
```http
GET    /admin/usergroup/all      # Get all user groups
GET    /admin/usergroup/allid    # Get all user group IDs
GET    /admin/usergroup/{id}     # Get user group by ID
POST   /admin/usergroup          # Create user group
PATCH  /admin/usergroup          # Update user group
DELETE /admin/usergroup/{id}     # Delete user group
```

### Door Management (`/admin/door`)
```http
GET    /admin/door/all           # Get all doors
GET    /admin/door/{id}          # Get door by ID
POST   /admin/door               # Create new door
PATCH  /admin/door               # Update door
DELETE /admin/door/{id}          # Delete door
```

### Door Groups (`/admin/doorgroup`)
```http
GET    /admin/doorgroup/all      # Get all door groups
GET    /admin/doorgroup/allids   # Get all door group IDs
GET    /admin/doorgroup/{id}     # Get door group by ID
POST   /admin/doorgroup          # Create door group
PATCH  /admin/doorgroup          # Update door group
DELETE /admin/doorgroup/{id}     # Delete door group
```

### Access Control
```http
POST   /admin/usergroupuser           # Add user to user group
POST   /admin/doorgroupdoor           # Add door to door group
POST   /admin/usergroupdoorgroup      # Add user group to door group
DELETE /admin/usergroupuser           # Remove user from user group
DELETE /admin/doorgroupdoor           # Remove door from door group
DELETE /admin/usergroupdoorgroup      # Remove user group from door group
```

### Activity Logs (`/logs`)
```http
GET    /logs/all                 # Get all activity logs
POST   /logs/delete              # Clear all logs
```

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- Supabase account
- IDE (Visual Studio, VS Code, or Rider)

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Configure environment variables**
   
   Update `Properties/launchSettings.json` with your Supabase credentials:
   ```json
   {
     "profiles": {
       "http": {
         "commandName": "Project",
         "dotnetRunMessages": true,
         "launchBrowser": true,
         "launchUrl": "swagger",
         "applicationUrl": "http://localhost:5187",
         "environmentVariables": {
           "ASPNETCORE_ENVIRONMENT": "Development",
           "SUPABASE_URL": "https://your-project.supabase.co",
           "SUPABASE_SERVICE_KEY": "your-service-key",
           "AUTH_ENABLED": "true",
           "AUTH_JWT_KEY_ISSUER": "https://your-project.supabase.co/auth/v1",
           "AUTH_JWT_KEY": "your-jwt-secret"
         }
       }
     }
   }
   ```

4. **Run the application**
   ```bash
   dotnet run
   ```

5. **Access Swagger documentation**
   Open your browser and navigate to `http://localhost:5187/swagger`

### Configuration Details

#### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SUPABASE_URL` | Your Supabase project URL | `https://abc123.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Supabase service role key | `eyJ0eXAiOiJKV1Q...` |
| `AUTH_JWT_KEY_ISSUER` | JWT issuer URL | `https://abc123.supabase.co/auth/v1` |
| `AUTH_JWT_KEY` | JWT signing secret | `your-super-secret-key` |
| `AUTH_ENABLED` | Enable/disable authentication | `true` or `false` |

## 🔒 Security Features

### Authentication
- **JWT Bearer Tokens**: Secure API access
- **Configurable Auth**: Can be disabled for development
- **Token Validation**: Comprehensive token verification

### Authorization
- **Role-based Access**: Admin and user roles
- **Resource Protection**: Endpoint-level security
- **Request Validation**: Input sanitization and validation

### Data Protection
- **SQL Injection Prevention**: Parameterized queries via Supabase
- **CORS Configuration**: Controlled cross-origin requests
- **Exception Handling**: Secure error responses

## 📊 Database Schema

### Core Entities

#### Users
```csharp
public class Users : BaseModel
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public bool IsAdmin { get; set; }
}
```

#### Doors
```csharp
public class Doors : BaseModel
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? Name { get; set; }
}
```

#### Door Groups
```csharp
public class DoorGroups : BaseModel
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? ZoneName { get; set; }
}
```

#### User Groups
```csharp
public class UserGroup : BaseModel
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? Name { get; set; }
}
```

## 🔧 Background Services

### M1BackgroundTask
- **Purpose**: Real-time monitoring and data processing
- **Features**: Continuous hardware communication monitoring
- **Integration**: Supabase real-time subscriptions

## 🛠️ Development

### Project Structure
```
backend/
├── Controllers/         # API endpoints
├── Data/               # DTOs and data models
├── DB/                 # Database entities
├── Engine/             # Core services and middleware
│   ├── ActionFilters/  # Custom action filters
│   ├── Background/     # Background services
│   ├── Exceptions/     # Custom exceptions
│   ├── Extensions/     # Extension methods
│   └── Middlewares/    # Custom middleware
└── Properties/         # Configuration files
```

### Adding New Endpoints

1. **Create Controller**
   ```csharp
   [ApiController]
   [Route("api/[controller]")]
   public class NewController : ControllerBase
   {
       // Your endpoints here
   }
   ```

2. **Add Data Models**
   ```csharp
   [Table("your_table")]
   public class YourModel : BaseModel
   {
       // Properties here
   }
   ```

3. **Update Swagger Documentation**
   - Add XML comments for automatic documentation
   - Use data annotations for validation

### Testing

#### Unit Tests
```bash
dotnet test
```

#### Integration Tests
```bash
# Start test database
# Run integration test suite
dotnet test --filter Category=Integration
```

## 📦 Dependencies

### Core Packages
- **Microsoft.AspNetCore.Authentication.JwtBearer** (8.0.4) - JWT authentication
- **supabase-csharp** (0.16.2) - Supabase client
- **Swashbuckle.AspNetCore** (6.4.0) - API documentation

### Development Tools
- **Microsoft.EntityFrameworkCore.Tools** - Database migrations
- **Microsoft.Extensions.Logging** - Logging framework

## 🚀 Deployment

### Development
```bash
dotnet run --environment Development
```

### Production
```bash
dotnet publish -c Release
# Deploy to your hosting platform
```

### Docker Support
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Episafe.csproj", "."]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Episafe.dll"]
```

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Errors**
   - Verify SUPABASE_URL and SUPABASE_SERVICE_KEY
   - Check network connectivity
   - Validate Supabase project status

2. **JWT Authentication Issues**
   - Ensure AUTH_JWT_KEY matches your configuration
   - Verify JWT_KEY_ISSUER URL
   - Check token expiration settings

3. **CORS Errors**
   - Update CORS policy in Program.cs
   - Verify frontend URL in allowed origins

### Logging
- Check console output for detailed error messages
- Review Supabase logs for database issues
- Use application insights for production monitoring

## 📚 API Documentation

### Interactive Documentation
- **Swagger UI**: `http://localhost:5187/swagger`
- **OpenAPI Spec**: `http://localhost:5187/swagger/v1/swagger.json`

### Authentication
All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer your-jwt-token-here
```

## 🤝 Contributing

1. Follow .NET coding conventions
2. Add unit tests for new features
3. Update API documentation
4. Ensure backward compatibility
5. Test with both authentication enabled and disabled

---

**Note**: This API is designed for industrial IoT environments. Ensure proper security configuration before production deployment.
