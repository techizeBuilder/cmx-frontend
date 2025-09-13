import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/superadmin';
const USE_MOCK = false; // Set to false when backend is ready

// Get auth headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem('superAdminToken');
  return {
    'Authorization': `Bearer ${token}`
  };
};

// Mock data for development
const mockShops = [
  {
    shopId: 'S00001',
    name: 'CMX Collision and Glass Corporation of Chicago',
    address: {
      street: '1234 Main Stn',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60647',
      country: 'USA'
    },
    contact: {
      phone: '312-555-5555',
      email: 'cmx@gmail.com',
      website: 'CollisionMatex.com'
    },
    admin: {
      name: 'Steve Kurt',
      phone: '312-555-5555',
      email: 'admin@cmx.com'
    },
    status: 'active',
    createdAt: '2025-09-05T07:11:27.558Z',
    updatedAt: '2025-09-05T07:11:27.558Z'
  },
  {
    shopId: 'S00002',
    name: 'AutoFix Collision Center',
    address: {
      street: '5678 Oak Street',
      city: 'Milwaukee',
      state: 'WI',
      zipCode: '53202',
      country: 'USA'
    },
    contact: {
      phone: '414-555-1234',
      email: 'info@autofix.com',
      website: 'AutoFixCollision.com'
    },
    admin: {
      name: 'John Smith',
      phone: '414-555-1234',
      email: 'john@autofix.com'
    },
    status: 'inactive',
    createdAt: '2025-08-15T09:30:15.200Z',
    updatedAt: '2025-08-15T09:30:15.200Z'
  }
];

// Mock service functions
const mockService = {
  createShop: async (formData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newShop = {
      shopId: `S${String(mockShops.length + 1).padStart(5, '0')}`,
      name: formData.get('shopName'),
      address: {
        street: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
        country: formData.get('country')
      },
      contact: {
        phone: formData.get('shopPhone'),
        email: formData.get('shopEmail'),
        website: formData.get('shopWebsite')
      },
      admin: {
        name: formData.get('adminName'),
        phone: formData.get('adminPhone'),
        email: formData.get('adminEmail')
      },
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockShops.push(newShop);
    
    return {
      success: true,
      message: 'Shop created successfully',
      data: newShop
    };
  },

  getShops: async (params = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const page = parseInt(params.page || 1);
    const limit = parseInt(params.limit || 10);
    const search = params.search?.toLowerCase() || '';
    const status = params.status || '';
    
    let filteredShops = mockShops;
    
    if (search) {
      filteredShops = filteredShops.filter(shop => 
        shop.name.toLowerCase().includes(search) ||
        shop.shopId.toLowerCase().includes(search)
      );
    }
    
    if (status) {
      filteredShops = filteredShops.filter(shop => shop.status === status);
    }
    
    const total = filteredShops.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const shops = filteredShops.slice(startIndex, startIndex + limit);
    
    return {
      success: true,
      data: {
        shops,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      }
    };
  },

  getShopById: async (shopId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const shop = mockShops.find(s => s.shopId === shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }
    
    return {
      success: true,
      data: shop
    };
  },

  updateShop: async (shopId, formData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const shopIndex = mockShops.findIndex(s => s.shopId === shopId);
    if (shopIndex === -1) {
      throw new Error('Shop not found');
    }
    
    // Update shop data
    mockShops[shopIndex] = {
      ...mockShops[shopIndex],
      name: formData.get('shopName') || mockShops[shopIndex].name,
      updatedAt: new Date().toISOString()
    };
    
    return {
      success: true,
      message: 'Shop updated successfully',
      data: mockShops[shopIndex]
    };
  },

  toggleShopStatus: async (shopId, status) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const shop = mockShops.find(s => s.shopId === shopId);
    if (!shop) {
      throw new Error('Shop not found');
    }
    
    shop.status = status;
    shop.updatedAt = new Date().toISOString();
    
    return {
      success: true,
      message: 'Shop status updated successfully',
      data: {
        shopId,
        status,
        updatedAt: shop.updatedAt
      }
    };
  }
};

// Shop API service
export const shopService = {
  // Create a new shop
  createShop: async (formData) => {
    if (USE_MOCK) {
      return await mockService.createShop(formData);
    }
    
    const response = await axios.post(`${API_BASE_URL}/shop`, formData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Get all shops with pagination and filters
  getShops: async (params = {}) => {
    if (USE_MOCK) {
      return await mockService.getShops(params);
    }
    
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.status) queryParams.append('status', params.status);
    if (params.search) queryParams.append('search', params.search);

    const response = await axios.get(`${API_BASE_URL}/shops?${queryParams}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Get shop details by ID
  getShopById: async (shopId) => {
    if (USE_MOCK) {
      return await mockService.getShopById(shopId);
    }
    
    const response = await axios.get(`${API_BASE_URL}/shops/${shopId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Update shop
  updateShop: async (shopId, formData) => {
    if (USE_MOCK) {
      return await mockService.updateShop(shopId, formData);
    }
    
    const response = await axios.put(`${API_BASE_URL}/shops/${shopId}`, formData, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Toggle shop status
  toggleShopStatus: async (shopId, status) => {
    if (USE_MOCK) {
      return await mockService.toggleShopStatus(shopId, status);
    }
    
    const response = await axios.patch(
      `${API_BASE_URL}/shops/${shopId}/status`,
      { status },
      {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }
};

export default shopService;
