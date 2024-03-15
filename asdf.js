function getTTable(n){
  let m = n.toString(2).length;
  let t = ['0', '1'];
  let copyOfT = [];
  let length = t.length;
  
  for(let i = 1; i < m; i++){
    length = 2 * length;
    for(let j = 0; j < t.length; j++){
      t[length - j - 1] = `1${t[j]}`;
      t[j] = `0${t[j]}`;
    }
    //t = copyOfT; copyOfT = [];
  }
  
  return t;
}
getTTable(6);