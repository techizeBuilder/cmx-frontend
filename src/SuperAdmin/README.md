# Super Admin Module

This module provides super administrator functionality for managing collision repair shops within the CollisionMateX application.

## Components

### 1. SuperAdminLogin.vue
- **Route**: `/cmx-super/login`
- **Credentials**: 
  - Username: `superadmin`
  - Password: `admin123`
- **API Endpoint**: `POST http://localhost:8001/superadmin/login`
- **Features**:
  - JWT token-based authentication
  - Form validation using Vee-validate and Yup
  - Automatic redirect to dashboard on successful login
  - Error handling for invalid credentials

### 2. SuperAdminDashboard.vue
- **Route**: `/cmx-super/dashboard` (protected)
- **API Endpoints**:
  - `GET http://localhost:8001/superadmin/shops` - List all shops
  - `PATCH http://localhost:8001/superadmin/shops/:id/status` - Toggle shop status
- **Features**:
  - Shop listing with pagination support
  - Shop status management (Active/Inactive)
  - Add new shop functionality
  - Protected route with authentication guard
  - Shop edit functionality (placeholder)

### 3. AddShopModal.vue
- **API Endpoint**: `POST http://localhost:8001/superadmin/shop`
- **Features**:
  - 3-step shop creation form:
    1. **Shop Details**: Name, contact info, address
    2. **Logo Upload**: Shop logo with preview
    3. **Admin Contact**: Admin credentials and contact info
  - Complete form validation
  - File upload support (multipart/form-data)
  - Admin password creation with confirmation
  - Real-time validation feedback

## API Integration

### Shop Creation Payload
The form data is sent as `multipart/form-data` with the following fields:

```javascript
{
  // Basic shop information
  shopName: string,
  contactEmail: string,
  contactPhone: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  website?: string,
  timeZone?: string,
  
  // Logo file
  shopLogo?: File,
  
  // Admin credentials
  adminFirstName: string,
  adminLastName: string,
  adminEmail: string,
  adminPhone: string,
  adminUsername: string,
  adminPassword: string
}
```

### API Services
Located in `src/SuperAdmin/services/shopService.js`:
- `createShop(formData)` - Create a new shop
- `getShops(params)` - Get shops with pagination and filters
- `getShopById(shopId)` - Get specific shop details
- `updateShop(shopId, formData)` - Update shop information
- `toggleShopStatus(shopId, status)` - Change shop active status

## Authentication Flow

1. **Login**: User enters credentials → API validates → JWT token stored in localStorage
2. **Route Protection**: Protected routes check for token → Redirect to login if missing
3. **API Requests**: All shop management APIs include `Authorization: Bearer <token>` header
4. **Logout**: Clear tokens from localStorage → Redirect to login

## Error Handling

- **401 Unauthorized**: Automatic redirect to login page
- **400 Bad Request**: Display validation error messages
- **409 Conflict**: Handle duplicate shop names/emails
- **Network Errors**: User-friendly error messages
- **File Upload**: Size and type validation for shop logos

## Development Setup

1. Ensure the API server is running at `http://localhost:8001`
2. Start the frontend development server: `npm run dev`
3. Navigate to `http://localhost:5174/cmx-super/login`

## Testing

### Login Test
- URL: `http://localhost:5174/cmx-super/login`
- Use credentials: `superadmin` / `admin123`

### Shop Management Test
1. Login as super admin
2. Access dashboard at `http://localhost:5174/cmx-super/dashboard`
3. Click "Add New Shop" to test shop creation
4. Fill all required fields and submit
5. Test shop status toggle functionality

### API Requirements
The backend API should support:
- CORS headers for frontend requests
- JWT token validation
- Multipart form data parsing for file uploads
- Proper error response format with `message` field

## File Structure
```
src/SuperAdmin/
├── components/
│   ├── SuperAdminLogin.vue      # Login page
│   ├── SuperAdminDashboard.vue  # Main dashboard
│   └── AddShopModal.vue         # Shop creation modal
├── services/
│   ├── shopService.js           # API service layer
│   └── shopService.mock.js      # Mock data for development
└── README.md                    # This documentation
```

## Future Enhancements

1. **Shop Editing**: Complete the edit functionality
2. **Advanced Filtering**: Add search and filter options for shop list
3. **Bulk Operations**: Multi-select and bulk status updates
4. **Shop Analytics**: Dashboard metrics and reporting
5. **User Management**: Manage shop admin users
6. **Audit Logging**: Track administrative actions
