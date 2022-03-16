const dns = require('dns');
// let domain = 'https://www.google.com';
// let url = new URL(domain);
// let options = { family: 4 };
// let test = dns.lookup(url.hostname, options, (err, address, family) => {
//   if (err) {
//     return null;
//   } else {
//     console.log(address)
//     return address;
//   }
// });

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

getDomainIp('syosetu.com').then((res) => {
  console.log(res);
});