const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { address } = req.query; // 获取钱包地址

  // 修改为新的接口 URL
  const url = `https://layerhub.xyz/chains/monad_testnet/wallets/${address}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*'); // 设置CORS头
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data); // 返回请求结果
  } catch (error) {
    res.status(500).json({ error: '请求失败' });
  }
};
