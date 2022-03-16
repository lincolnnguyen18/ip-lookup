const express = require('express');
const cors = require('cors');
const domainPing = require("domain-ping");
const geoip = require('fast-geoip');
const app = express();
app.use(cors());
app.set('trust proxy',true);
app.use('/assets', express.static('assets'));

const getDomainIp = async (domain) => {
  try {
    const ip = await domainPing(domain);
    if (ip.ip == '127.0.0.1') {
      return {ip: '107.196.10.160'}
    } else {
      return ip;
    }
  } catch (error) {
    return null;
  }
};
const getDomainInfo = async (domain) => {
  console.log(domain)
  let domainIp = await getDomainIp(domain);
  console.log(domainIp)
  if (domainIp.ip) {
    let ip = domainIp.ip
    const domainInfo = await geoip.lookup(ip);
    console.log(domainInfo);
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