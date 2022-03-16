const dns = require('dns');
const geoip = require('fast-geoip');

function getDomainIp(domain) {
  return new Promise((resolve, reject) => {
    let url = new URL(domain);
    let options = { family: 4 };
    dns.lookup(url.hostname, options, (err, address, family) => {
      if (err) {
        reject(err);
      } else {
        resolve(address);
      }
    });
  });
}

const getDomainInfo = async (domain) => {
  let domainIp = await getDomainIp(domain);
  if (domainIp) {
    domainIp = domainIp.ip
    const domainInfo = await geoip.lookup(domainIp);
    return domainInfo;
  } else {
    return null;
  }
};

const getIpInfo = async (ip) => {
  const ipInfo = await geoip.lookup(ip);
  return ipInfo;
};


// const ip = "129.49.100.88";
// const geo = await geoip.lookup(ip);

// getDomainInfo("wikipedia.com").then((res) => {
//   console.log(res);
// });

getIpInfo("111.65.250.2").then((res) => {
  // replace _ with space in res.timezone
  res.timezone = res.timezone.replace(/_/g, " ");
  console.log(res);
});