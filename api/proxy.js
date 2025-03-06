const fetch = require("node-fetch");

module.exports = async (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ error: "缺少钱包地址参数" });
    }

    const apiUrl = `https://claim.elixir.xyz/backend/wallet/eligibility?address=${address}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Host": "claim.elixir.xyz",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Accept": "application/json",
                "Referer": "https://claim.elixir.xyz/",
                "Origin": "https://claim.elixir.xyz/"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 状态码: ${response.status}`);
        }

        const data = await response.json();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "API 请求失败", details: error.message });
    }
};
