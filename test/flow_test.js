const assert = require('assert')
const NakoCompiler = require('../src/nako3')

describe('flow_test', () => {
  const nako = new NakoCompiler()
  // nako.debug = true;
  const cmp = (code, res) => {
    if (nako.debug) {
      console.log('code=' + code)
    }
    assert.equal(nako.runReset(code).log, res)
  }
  it('もし', () => {
    cmp('もし3>1ならば「あ」と表示。', 'あ')
    cmp('もし3<1ならば「あ」と表示。違えば「い」と表示。', 'い')
  })
  it('もし - AがBならば', () => {
    cmp('もし3が3ならば\n「OK」と表示。\n違えば\n「NG」と表示。\n---\n', 'OK')
  })
  it('もし - ネスト', () => {
    cmp('A=5\n' +
      'もしAが3以上ならば\n' +
      '　　もしA=5ならば\n' +
      '　　　　「OK」と表示。\n' +
      '　　違えば\n' +
      '　　　　「NG」と表示。\n' +
      '　　ここまで。\n' +
      '違えば\n' +
      '　　「NG」と表示。\n' +
      'ここまで。\n', 'OK')
    cmp('A=1\n' +
      'もしAが3以上ならば\n' +
      '　　もしA=5ならば\n' +
      '　　　　「NG」と表示。\n' +
      '　　違えば\n' +
      '　　　　「NG」と表示。\n' +
      '　　ここまで。\n' +
      '違えば\n' +
      '　　「OK」と表示。\n' +
      'ここまで。\n', 'OK')
  })
  it('回', () => {
    cmp('3回「あ」と表示。', 'あ\nあ\nあ')
    cmp('A=3;(A)回、Aを表示。', '3\n3\n3')
  })
  it('回、ここから', () => {
    cmp('A=3;(A)回、ここから\nAを表示。\n---\n', '3\n3\n3')
    cmp('A=3;(A)回ここから\nAを表示。\n---\n', '3\n3\n3')
  })
  it('の間', () => {
    cmp('N=3;\n(N>0)の間\nNを表示\nN=N-1\n---', '3\n2\n1')
  })
  it('の間、ここから', () => {
    cmp('N=3;\n(N>0)の間、ここから\nNを表示\nN=N-1\n---', '3\n2\n1')
    cmp('N=3;\n(N>0)の間ここから\nNを表示\nN=N-1\n---', '3\n2\n1')
  })
  it('繰り返す', () => {
    cmp('Nを1から3まで繰り返す\nNを表示\n---', '1\n2\n3')
    cmp('Nを１から３まで繰り返す\n　　Nを表示\n---', '1\n2\n3')
  })
  it('繰り返す2', () => {
    cmp('1から3まで繰り返す\nそれを表示\n---', '1\n2\n3')
  })
  it('連続計算', () => {
    cmp('3に5を足してNに代入;Nを表示', '8')
    cmp('3に5を足して2を掛けて表示', '16')
  })
  it('もし-日本語による比較', () => {
    cmp('もし3が3と等しいならば「OK」と表示。', 'OK')
    cmp('もし(3+2)が5と等しいならば「OK」と表示。', 'OK')
    cmp('もし(3+2)が1以上ならば「OK」と表示。', 'OK')
    cmp('もし3が5未満ならば「OK」と表示。', 'OK')
    cmp('もし(3+10)が(5+10)以下ならば「OK」と表示。', 'OK')
  })
  it('もし--一行文。違えば', () => {
    cmp('もし(3+10)が5以下ならば「ng」と表示。違えば「ok」と表示。', 'ok')
  })
  it('回-break', () => {
    cmp('3回\n\'a\'と表示。もし(回数=2)ならば,抜ける;\n;---;', 'a\na')
    cmp('3回\n\'a\'と表示。もし、回数が2ならば,抜ける;\n;---;', 'a\na')
  })
  it('反復 - 配列', () => {
    cmp('[1,2,3]を反復\n対象を表示\n---\n', '1\n2\n3')
  })
  it('反復 - オブジェクト', () => {
    cmp('{\'a\':1,\'b\':2,\'c\':3}を反復\n対象を表示\n---\n', '1\n2\n3')
    cmp('{\'a\':1,\'b\':2,\'c\':3}を反復\n対象キーを表示\n---\n', 'a\nb\nc')
  })
  it('反復 - 変数付き', () => {
    cmp('A=[1,2,3];NでAを反復\nNを表示\n---\n', '1\n2\n3')
    cmp('Nで[1,2,3]を反復\nNを表示\n---\n', '1\n2\n3')
  })
  it('ここから反復', () => {
    cmp('それは[1,2,3];ここから反復\n表示\n---\n', '1\n2\n3')
  })
  it('ここから繰り返し', () => {
    cmp('ここから1から3まで繰り返し\n表示\n---\n', '1\n2\n3')
  })
  it('ここから3回', () => {
    cmp('ここから3回\n表示\n---\n', '1\n2\n3')
  })
  it('不等号', () => {
    cmp('もし、5≧5ならば、「あ」と表示。', 'あ')
    cmp('もし、5≧3ならば、「あ」と表示。', 'あ')
    cmp('もし、5≦5ならば、「あ」と表示。', 'あ')
    cmp('もし、3≦5ならば、「あ」と表示。', 'あ')
    cmp('もし、5＝5ならば、「あ」と表示。', 'あ')
    cmp('もし、3≠5ならば、「あ」と表示。', 'あ')
  })
})
