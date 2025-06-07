const axios = require('axios');
const { HttpProxyAgent } = require('http-proxy-agent');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { SocksProxyAgent } = require('socks-proxy-agent');
const { AbortController } = require('abort-controller');

const PROXY_TEST_CONFIG = {
  connectTimeout: 3000,
  httpTimeout: 8000,
  testUrls: ['http://httpbin.org/ip'],
  maxParallelRequests: 15,
  retryAttempts: 2,
  retryDelayBase: 500
};

function determineAnonymity(headers) {
  if (headers['x-forwarded-for'] || headers['x-real-ip']) return 'transparent';
  if (headers['via'] || headers['x-proxy-id']) return 'anonymous';
  return 'elite';
}

function parseProxy(proxy) {
  const match = proxy.match(/(?:(.*:\/\/))?([^:]+):(\d+)/);
  return match ? {
    protocol: match[1] ? match[1].replace('://', '') : 'http',
    host: match[2],
    port: match[3]
  } : null;
}

async function getProxyLocation(ip) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,city,lat,lon`);
    return response.data.status === 'success' ? {
      country: response.data.country,
      countryCode: response.data.countryCode,
      city: response.data.city,
      lat: response.data.lat,
      lon: response.data.lon
    } : null;
  } catch {
    return null;
  }
}

async function testProtocol(proxyUrl, protocol) {
  const startTime = Date.now();
  try {
    let agent;
    switch(protocol) {
      case 'http':
        agent = new HttpProxyAgent(proxyUrl, { timeout: PROXY_TEST_CONFIG.connectTimeout });
        break;
      case 'https':
        agent = new HttpsProxyAgent(proxyUrl, {
          rejectUnauthorized: false,
          timeout: PROXY_TEST_CONFIG.connectTimeout
        });
        break;
      case 'socks':
        agent = new SocksProxyAgent(proxyUrl, {
          timeout: PROXY_TEST_CONFIG.connectTimeout,
          lookup: false
        });
        break;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PROXY_TEST_CONFIG.httpTimeout);

    const response = await axios.get(PROXY_TEST_CONFIG.testUrls[0], {
      httpAgent: agent,
      httpsAgent: agent,
      signal: controller.signal,
      timeout: PROXY_TEST_CONFIG.httpTimeout,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Connection': 'close'
      }
    });

    clearTimeout(timeoutId);
    return {
      protocol,
      success: true,
      latency: Date.now() - startTime,
      headers: response.headers,
      status: response.status
    };
  } catch (err) {
    return {
      protocol,
      success: false,
      error: err.message
    };
  }
}

process.on('uncaughtException', (err) => {
if (err.code === 'ERR_TLS_HANDSHAKE_TIMEOUT') {
console.log('[DEBUG] TLS handshake timeout');
return;
}
console.error('[DEBUG] Critical error:', err.message);
});

process.on('unhandledRejection', (reason) => {
console.error('[DEBUG] Unhandled rejection:', reason);
});

async function testProxy(proxy) {
  const result = {
    proxy,
    status: 'Not Working',
    proxyType: 'N/A',
    latency: null,
    anonymity: null,
    httpStatus: null,
    error: null,
    location: 'N/A',
    testedProtocols: []
  };

  try {
    const proxyDetails = parseProxy(proxy);
    if (!proxyDetails) {
      result.error = 'Invalid proxy format';
      return result;
    }

    const { host, port } = proxyDetails;
    result.host = host;
    result.port = port;
    const protocolTests = ['http', 'https', 'socks'].map(protocol => 
      testProtocol(`${protocol}://${host}:${port}`, protocol)
    );

    const protocolResults = await Promise.all(protocolTests);
    result.testedProtocols = protocolResults;

    const workingProtocol = protocolResults.find(p => p.success);
    if (workingProtocol) {
      result.status = 'Working';
      result.proxyType = workingProtocol.protocol;
      result.latency = workingProtocol.latency;
      result.httpStatus = workingProtocol.status;
      result.anonymity = determineAnonymity(workingProtocol.headers || {});
      location = await getProxyLocation(host);
      result.location = `${location.city}, ${location.country}`;
    } else {
      result.error = protocolResults
        .filter(r => r.error)
        .map(r => r.error)
        .join('; ');
    }
  } catch (err) {
    result.error = err.message;
  }

  return result;
}

async function testProxies(proxies) {
  const results = [];
  
  for (let i = 0; i < proxies.length; i += PROXY_TEST_CONFIG.maxParallelRequests) {
    const batch = proxies.slice(i, i + PROXY_TEST_CONFIG.maxParallelRequests);
    const batchResults = await Promise.allSettled(batch.map(testProxy));
    results.push(...batchResults.map(outcome => 
      outcome.status === 'fulfilled' ? outcome.value : {
        proxy: outcome.reason.proxy || 'Unknown',
        status: 'Not Working',
        error: outcome.reason.message
      }
    ));
  }
  
  const working = results.filter(r => r.status === 'Working');
  console.log(`[DEBUG] Results: ${working.length}/${proxies.length} working proxies`);
  return results;
}

module.exports = testProxies;
