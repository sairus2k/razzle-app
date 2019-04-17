import http from 'http';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;

// @ts-ignore
server.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started');
});

// @ts-ignore
if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  // @ts-ignore
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}
