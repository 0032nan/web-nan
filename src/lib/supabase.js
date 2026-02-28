import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Local storage fallback
const STORAGE_KEY = 'web3-bookmarks-data-v2'

// 预置书签数据
const defaultBookmarks = [
  // DEX
  {
    id: 'dex-1',
    title: 'Uniswap',
    url: 'https://app.uniswap.org',
    description: '以太坊上最大的去中心化交易所',
    category_id: 'dex',
    tags: ['DEX', '以太坊', 'DeFi'],
    status: 'done',
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'dex-2',
    title: 'PancakeSwap',
    url: 'https://pancakeswap.finance',
    description: 'BNB Chain上领先的DEX',
    category_id: 'dex',
    tags: ['DEX', 'BNB', 'DeFi'],
    status: 'pending',
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'dex-3',
    title: 'Curve Finance',
    url: 'https://curve.fi',
    description: '稳定币兑换最优选择',
    category_id: 'dex',
    tags: ['DEX', '稳定币', 'DeFi'],
    status: 'focus',
    order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'dex-4',
    title: 'GMX',
    url: 'https://gmx.io',
    description: '去中心化永续合约交易',
    category_id: 'dex',
    tags: ['DEX', '衍生品', 'DeFi'],
    status: 'pending',
    order: 4,
    created_at: new Date().toISOString(),
  },
  // 借贷
  {
    id: 'lending-1',
    title: 'Aave',
    url: 'https://app.aave.com',
    description: '领先的DeFi借贷协议',
    category_id: 'lending',
    tags: ['借贷', 'DeFi', '以太坊'],
    status: 'done',
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'lending-2',
    title: 'Compound',
    url: 'https://compound.finance',
    description: '算法货币市场协议',
    category_id: 'lending',
    tags: ['借贷', 'DeFi', '以太坊'],
    status: 'pending',
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'lending-3',
    title: 'Radiant',
    url: 'https://radiant.capital',
    description: '跨链借贷协议',
    category_id: 'lending',
    tags: ['借贷', '跨链', 'DeFi'],
    status: 'focus',
    order: 3,
    created_at: new Date().toISOString(),
  },
  // NFT
  {
    id: 'nft-1',
    title: 'OpenSea',
    url: 'https://opensea.io',
    description: '最大的NFT交易市场',
    category_id: 'nft',
    tags: ['NFT', '市场', '交易'],
    status: 'done',
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'nft-2',
    title: 'Blur',
    url: 'https://blur.io',
    description: '专业NFT交易平台',
    category_id: 'nft',
    tags: ['NFT', '市场', '专业'],
    status: 'focus',
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'nft-3',
    title: 'Magic Eden',
    url: 'https://magiceden.io',
    description: 'Solana生态NFT市场',
    category_id: 'nft',
    tags: ['NFT', 'Solana', '市场'],
    status: 'pending',
    order: 3,
    created_at: new Date().toISOString(),
  },
  // 跨链桥
  {
    id: 'bridge-1',
    title: 'Jumper Exchange',
    url: 'https://jumper.exchange',
    description: '跨链桥聚合器',
    category_id: 'bridge',
    tags: ['跨链桥', '聚合器', '工具'],
    status: 'done',
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'bridge-2',
    title: 'Stargate',
    url: 'https://stargate.finance',
    description: 'LayerZero跨链桥',
    category_id: 'bridge',
    tags: ['跨链桥', 'LayerZero', 'DeFi'],
    status: 'pending',
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'bridge-3',
    title: 'Across Protocol',
    url: 'https://across.to',
    description: '快速安全的跨链桥',
    category_id: 'bridge',
    tags: ['跨链桥', '快速', '安全'],
    status: 'focus',
    order: 3,
    created_at: new Date().toISOString(),
  },
  // 测试网
  {
    id: 'testnet-1',
    title: 'Sepolia Faucet',
    url: 'https://sepoliafaucet.com',
    description: 'Sepolia测试网水龙头',
    category_id: 'testnet',
    tags: ['测试网', '水龙头', '以太坊'],
    status: 'done',
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testnet-2',
    title: 'Alchemy Faucet',
    url: 'https://sepoliafaucet.com',
    description: 'Alchemy Sepolia水龙头',
    category_id: 'testnet',
    tags: ['测试网', '水龙头', 'Alchemy'],
    status: 'pending',
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'testnet-3',
    title: 'QuickNode Faucet',
    url: 'https://faucet.quicknode.com',
    description: '多链测试网水龙头',
    category_id: 'testnet',
    tags: ['测试网', '水龙头', '多链'],
    status: 'pending',
    order: 3,
    created_at: new Date().toISOString(),
  },
  // 工具
  {
    id: 'tools-1',
    title: 'ChainList',
    url: 'https://chainlist.org',
    description: 'EVM网络配置大全',
    category_id: 'tools',
    tags: ['工具', '网络配置', 'RPC'],
    status: 'done',
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'tools-2',
    title: 'Vanity-ETH',
    url: 'https://vanity-eth.tk',
    description: '以太坊靓号地址生成器',
    category_id: 'tools',
    tags: ['工具', '地址生成', '以太坊'],
    status: 'done',
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'tools-3',
    title: 'Revoke.cash',
    url: 'https://revoke.cash',
    description: '撤销代币授权工具',
    category_id: 'tools',
    tags: ['工具', '安全', '授权管理'],
    status: 'done',
    order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'tools-4',
    title: 'DeFiLlama',
    url: 'https://defillama.com',
    description: 'DeFi数据分析平台',
    category_id: 'tools',
    tags: ['工具', '数据', 'DeFi'],
    status: 'focus',
    order: 4,
    created_at: new Date().toISOString(),
  },
  // 空投
  {
    id: 'airdrop-1',
    title: 'Perle',
    url: 'https://perle.io',
    description: '去中心化衍生品协议',
    category_id: 'airdrop',
    tags: ['空投', 'DeFi', '衍生品'],
    status: 'focus',
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'airdrop-2',
    title: 'Abstract',
    url: 'https://abstract.xyz',
    description: '消费级区块链',
    category_id: 'airdrop',
    tags: ['空投', 'L2', '新链'],
    status: 'focus',
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'airdrop-3',
    title: 'Linera',
    url: 'https://linera.io',
    description: '低延迟区块链',
    category_id: 'airdrop',
    tags: ['空投', '基础设施', '新链'],
    status: 'pending',
    order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'airdrop-4',
    title: 'Berachain',
    url: 'https://berachain.com',
    description: '流动性证明区块链',
    category_id: 'airdrop',
    tags: ['空投', '新链', '流动性'],
    status: 'focus',
    order: 4,
    created_at: new Date().toISOString(),
  },
  // 市场
  {
    id: 'market-1',
    title: 'OKX',
    url: 'https://www.okx.com',
    description: '全球领先的数字资产交易所',
    category_id: 'market',
    tags: ['交易所', '现货', '合约'],
    status: 'done',
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'market-2',
    title: 'CoinGlass',
    url: 'https://coinglass.com',
    description: '加密货币衍生品数据分析',
    category_id: 'market',
    tags: ['数据', '衍生品', '分析'],
    status: 'done',
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'market-3',
    title: 'CoinMarketCap',
    url: 'https://coinmarketcap.com',
    description: '加密货币市值排名',
    category_id: 'market',
    tags: ['数据', '市值', '排名'],
    status: 'done',
    order: 3,
    created_at: new Date().toISOString(),
  },
  // AI
  {
    id: 'ai-1',
    title: 'Grok',
    url: 'https://grok.x.ai',
    description: 'xAI开发的AI助手',
    category_id: 'ai',
    tags: ['AI', '聊天', '工具'],
    status: 'done',
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'ai-2',
    title: 'Kimi',
    url: 'https://kimi.moonshot.cn',
    description: '月之暗面AI助手',
    category_id: 'ai',
    tags: ['AI', '聊天', '中文'],
    status: 'done',
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'ai-3',
    title: 'ChatGPT',
    url: 'https://chat.openai.com',
    description: 'OpenAI对话模型',
    category_id: 'ai',
    tags: ['AI', '聊天', 'GPT'],
    status: 'done',
    order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'ai-4',
    title: 'Claude',
    url: 'https://claude.ai',
    description: 'Anthropic AI助手',
    category_id: 'ai',
    tags: ['AI', '聊天', '工具'],
    status: 'done',
    order: 4,
    created_at: new Date().toISOString(),
  },
  // 链上分析
  {
    id: 'analytics-1',
    title: 'Bubblemaps',
    url: 'https://bubblemaps.io',
    description: '代币持仓可视化分析',
    category_id: 'analytics',
    tags: ['分析', '可视化', '持仓'],
    status: 'done',
    order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'analytics-2',
    title: 'OKLink',
    url: 'https://www.oklink.com',
    description: '多链区块链浏览器',
    category_id: 'analytics',
    tags: ['浏览器', '多链', '数据'],
    status: 'done',
    order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'analytics-3',
    title: 'Arkham',
    url: 'https://platform.arkhamintelligence.com',
    description: '链上情报分析平台',
    category_id: 'analytics',
    tags: ['分析', '情报', '地址'],
    status: 'focus',
    order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'analytics-4',
    title: 'Nansen',
    url: 'https://nansen.ai',
    description: '链上数据分析平台',
    category_id: 'analytics',
    tags: ['分析', '数据', '智能钱'],
    status: 'pending',
    order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 'analytics-5',
    title: 'Dune Analytics',
    url: 'https://dune.com',
    description: '社区驱动的链上数据分析',
    category_id: 'analytics',
    tags: ['分析', '数据', 'SQL'],
    status: 'done',
    order: 5,
    created_at: new Date().toISOString(),
  },
]

// 预置分类
const defaultCategories = [
  { id: 'dex', name: 'DEX', icon: 'ArrowLeftRight', color: '#00d4ff', order: 1 },
  { id: 'lending', name: '借贷', icon: 'Banknote', color: '#a855f7', order: 2 },
  { id: 'nft', name: 'NFT', icon: 'Image', color: '#ec4899', order: 3 },
  { id: 'bridge', name: '跨链桥', icon: 'Link', color: '#00ff88', order: 4 },
  { id: 'testnet', name: '测试网', icon: 'FlaskConical', color: '#fbbf24', order: 5 },
  { id: 'tools', name: '工具', icon: 'Wrench', color: '#60a5fa', order: 6 },
  { id: 'airdrop', name: '空投', icon: 'Gift', color: '#f472b6', order: 7 },
  { id: 'market', name: '市场', icon: 'TrendingUp', color: '#22d3ee', order: 8 },
  { id: 'ai', name: 'AI', icon: 'Brain', color: '#c084fc', order: 9 },
  { id: 'analytics', name: '链上分析', icon: 'BarChart3', color: '#34d399', order: 10 },
]

export const localDB = {
  getCategories: () => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      return parsed.categories || defaultCategories
    }
    return defaultCategories
  },
  
  getBookmarks: () => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      return parsed.bookmarks || defaultBookmarks
    }
    return defaultBookmarks
  },
  
  saveCategories: (categories) => {
    const data = localStorage.getItem(STORAGE_KEY)
    const parsed = data ? JSON.parse(data) : { bookmarks: defaultBookmarks }
    parsed.categories = categories
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
  },
  
  saveBookmarks: (bookmarks) => {
    const data = localStorage.getItem(STORAGE_KEY)
    const parsed = data ? JSON.parse(data) : { categories: defaultCategories }
    parsed.bookmarks = bookmarks
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
  },
  
  exportData: () => {
    const data = localStorage.getItem(STORAGE_KEY)
    return data || JSON.stringify({ categories: defaultCategories, bookmarks: defaultBookmarks })
  },
  
  importData: (jsonData) => {
    localStorage.setItem(STORAGE_KEY, jsonData)
  },
  
  resetToDefault: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      categories: defaultCategories, 
      bookmarks: defaultBookmarks 
    }))
  }
}
