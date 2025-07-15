// Simple test script to verify backend functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testServer() {
  console.log('🔍 Testing HeatAware Backend...\n');
  
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test mitigation strategies endpoint
    console.log('\nTesting mitigation strategies endpoint...');
    const strategiesResponse = await axios.get(`${BASE_URL}/api/mitigation/strategies`);
    console.log('✅ Mitigation strategies endpoint working');
    
    // Test mitigation resources endpoint
    console.log('\nTesting mitigation resources endpoint...');
    const resourcesResponse = await axios.get(`${BASE_URL}/api/mitigation/resources`);
    console.log('✅ Mitigation resources endpoint working');
    
    console.log('\n🎉 Backend is working correctly!');
    console.log('\nTo test weather functionality, make sure to:');
    console.log('1. Add your OpenWeatherMap API key to .env file');
    console.log('2. Try the weather endpoint: GET /api/weather?city=London');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n📝 Make sure the backend server is running:');
      console.error('   cd backend && npm run dev');
    }
  }
}

if (require.main === module) {
  testServer();
}

module.exports = { testServer };