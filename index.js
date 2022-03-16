import express from 'express';
import cors from 'cors';
import dns from 'dns';
import normalizeUrl from 'normalize-url';
import geoip from 'fast-geoip';
import path from 'path';
const __dirname = path.resolve();
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
  try {
    let ip = await getDomainIp(normalizeUrl(domain))
    if (ip == '127.0.0.1') ip = '107.196.10.160';
    // console.log(ip)
    if (ip) {
      const domainInfo = await geoip.lookup(ip);
      // console.log(domainInfo);
      domainInfo.ip = ip;
      domainInfo.timezone = domainInfo.timezone.replace('_', ' ');
      return domainInfo;
    } else {
      return {error: 'No IP found'};
    }
  } catch (err) {
    console.log(err);
    return {error: 'No IP found'};
  }
};
const getIpInfo = async (ip) => {
  let ipInfo = await geoip.lookup(ip);
  if (ipInfo) {
    ipInfo.ip = ip;
    ipInfo.timezone = ipInfo.timezone.replace('_', ' ');
    return ipInfo;
  } else {
    return {error: 'No IP found'};
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