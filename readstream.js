let c = 0;
void (url => require('http').get(url,(rdStr, s = 0) => {
rdStr.on('data',d => {
  const v = [ d[0], d[1], d[2], d[3] ] . map(x=>String.fromCharCode(x)). join('');
  console.log(c + ' ' + (s+=d.byteLength) + ' ' + v);
  if (v == 'cats') process.exit(0);
  ++c;
  //данные прибывают по два блока,   0 и 1         2 и 3         4 и 5
  //в сумме он дают по 65536         65536         65536         65536
  //                                     65536         131072        196608
  /*
  поэтому например вот тут
  5 196608
  6 261984 cats
  мы отправили блок с i==3 с буквами cats в начале
  и это значит что до него было отправлено 3 блока по 65536
  которые пришли как 6 блоков-половинок и

  7 262144
  8 327511 cats
  */

});
rdStr.on('end',() =>  console.log(`Итог: ${s}`))}))
('http://kodaktor.ru/api2/buffer2/15')
