let c = 0;
void (url => require('http').get(url,(rdStr, s = 0) => {
rdStr.on('data',d => {
  const v = d.filter(x => x > 0);
  console.log(c + ' ' + (s+=d.byteLength) + ' ' + v);
  if (v == 'cats') process.exit(0);
  ++c;
});
rdStr.on('end',() =>  console.log(`Итог: ${s}`))}))
('http://kodaktor.ru/api2/buffer2/15')
