<template>
    <div class="page-not-found">
      <h1>404 - Page Not Found</h1>
      <p>Oops! It looks like the page you're trying to reach doesn't exist.</p>
      <p>Please check the URL or navigate back to the homepage.</p>
      <router-link to="/">Go to Homepage</router-link>
    </div>
  </template>
  
  <style scoped>
  .page-not-found {
    text-align: center;
    margin-top: 50px;
  }
  
  .page-not-found h1 {
    font-size: 48px;
    color: #ff5722; /* or any other color you prefer */
  }
  
  .page-not-found p {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .page-not-found router-link {
    text-decoration: underline;
    color: #007bff; /* or any other color you prefer */
  }
  </style>
  