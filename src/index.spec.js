require('./index.js');

const context = require.context('./feature-toggle', true, /\.(js|ts|tsx)$/);
context.keys().forEach(context);
