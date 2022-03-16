const express = require('express');
const cors = require('cors');
const dns = require('dns');
const geoip = require('fast-geoip');
const app = express();
app.use(cors());
app.set('trust proxy',true);
app.use('/assets', express.static('assets'));

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
  // console.log(domain)
  let ip = await getDomainIp(domain);
  // console.log(ip)
  if (ip) {
    const domainInfo = await geoip.lookup(ip);
    // console.log(domainInfo);
    domainInfo.ip = ip;
    domainInfo.timezone = domainInfo.timezone.replace('_', ' ');
    return domainInfo;
  } else {
    return null;
  }
};
const getIpInfo = async (ip) => {
  let ipInfo = await geoip.lookup(ip);
  if (ipInfo) {
    ipInfo.ip = ip;
    ipInfo.timezone = ipInfo.timezone.replace('_', ' ');
    return ipInfo;
  } else {
    return null;
  }
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/pages/home/dist/index.html');
});
app.get('/getIpInfo', async (req, res) => {
  // console.log(req.ip);
  let result = await getIpInfo(req.ip);
  res.send(result);
});
app.get('/getDomainInfo', async (req, res) => {
  let domain = req.query.domain;
  // console.log(domain);
  let result = await getDomainInfo(domain);
  res.send(result);
});
const port = 7006;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));