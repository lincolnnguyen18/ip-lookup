const domainPing = require("domain-ping");

const getDomainIp = async (domain) => {
  try {
    const ip = await domainPing(domain);
    return ip;
  } catch (error) {
    return null;
  }
};

// domainPing('wikipedia.com')
// .then((res) => {
  
// })
// .catch((error) => {
//   console.error(error);
// });

const geoip = require('fast-geoip');

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


// const ip = "129.49.100.88";
// const geo = await geoip.lookup(ip);

getDomainInfo("wikipedia.com").then((res) => {
  console.log(res);
});