/**
 * Check if a single proxy string is valid.
 * Accepts protocol://ipv4:port, protocol://hostname:port, or just ip:port/host:port.
 * @param {string} proxy - e.g. "http://123.45.67.89:8080", "socks5://proxy.example.com:3128", "123.45.67.89:8080"
 * @returns {boolean}
 */
export function isValidProxy(proxy) {
  // Matches: protocol://host:port, protocol://ip:port, or just host:port/ip:port
  const protocolRegex = /^(https?|socks[45]?):\/\//i;
  const ipv4PortRegex = /^(\d{1,3}\.){3}\d{1,3}:\d{1,5}$/;
  const hostPortRegex = /^[a-zA-Z0-9.-]+:\d{1,5}$/;

  // Extract protocol and address
  let address;
  if (protocolRegex.test(proxy)) {
    address = proxy.split('://')[1];
  } else {
    address = proxy;
  }

  // Validate address (ip:port or host:port)
  if (!ipv4PortRegex.test(address) && !hostPortRegex.test(address)) {
    return false;
  }

  // If IP:port, ensure valid octets and port
  if (ipv4PortRegex.test(address)) {
    const [ip, portStr] = address.split(':');
    const port = Number(portStr);
    if (port < 1 || port > 65535) return false;

    const octets = ip.split('.').map(Number);
    if (octets.some(o => o < 0 || o > 255)) return false;
  }

  // If host:port, just validate port
  const port = Number(address.split(':')[1]);
  if (port < 1 || port > 65535) return false;

  return true;
}

/**
 * Parse raw textarea input into proxies array, gathering errors.
 * @param {string} input - raw textarea value
 * @returns {{ validProxies: string[], errors: string[] }}
 */
export function parseProxyInput(input) {
  const lines = input.split('\n').map(l => l.trim());
  const validProxies = [];
  const errors = [];

  lines.forEach((line, idx) => {
    if (!line) return; // skip blank
    if (isValidProxy(line)) {
      validProxies.push(line);
    } else {
      errors.push(`Line ${idx + 1}: "${line}" is not a valid proxy (protocol://host:port or host:port).`);
    }
  });

  return { validProxies, errors };
}
