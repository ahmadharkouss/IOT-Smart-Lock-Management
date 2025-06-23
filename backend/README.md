# Episafe

In order to connect with the **SUPABASE** backend, you will need to modify the **Properties/launchSettings.json** and add four environement variables in each profile you use :

- **SUPABASE_URL**  = *API url of Supabase*
- **SUPABASE_SERVICE_KEY** = *Supabase service key*
- **AUTH_JWT_KEY_ISSUER** = *https://<your supabase url>/auth/v1*
- **AUTH_JWT_KEY** = *Dedicated JWT KEY*
- **AUTH_ENABLED** = *true* or *false* but defaults to *true*.

Exemple : 

```
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "http://localhost:5187",
      "environmentVariables": {
      
        "ASPNETCORE_ENVIRONMENT": "Development",
        
        "SUPABASE_URL": "https://...",
        "SUPABASE_SERVICE_KEY": "MY_SUPER_SECRET_SERVICE_KEY",

        "AUTH_ENABLED": "true",      
        "AUTH_JWT_KEY_ISSUER": "https://<your supabase url>/auth/v1",
        "AUTH_JWT_KEY": "MY_JWT_KEY"      
      
      }
    }
```
