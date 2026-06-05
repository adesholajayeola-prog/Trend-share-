export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  twitter?: string;
  github?: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorEmail: string;
  content: string;
  date: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[]; // split by paragraphs for clean readability
  category: 'Technology' | 'Cryptocurrency' | 'Business' | 'Lifestyle' | 'Entertainment';
  author: Author;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  views: number;
  likes: number;
  comments: Comment[];
}

export const CATEGORIES = [
  'Technology',
  'Cryptocurrency',
  'Business',
  'Lifestyle',
  'Entertainment'
] as const;

export type CategoryType = typeof CATEGORIES[number];

// High-quality Sample Authors
export const AUTHORS: Record<string, Author> = {
  alexa: {
    name: 'Alexa Vance',
    role: 'Senior Technology Correspondent',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Deep-diving into next-generation systems, quantum computing paradigms, and the societal shifts of artificial intelligence.',
    twitter: '@alexavance_tech'
  },
  marcus: {
    name: 'Marcus Thorne',
    role: 'Macroeconomist & Crypto Analyst',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: 'Tracing the fusion of traditional capital with decentralized protocols, Layer-3 solutions, and algorithmic economics.',
    twitter: '@marcusthorne_crypto'
  },
  elena: {
    name: 'Elena Rostova',
    role: 'Global Business Strategist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    bio: 'Specializing in sustainable corporate development, logistics design, circular economies, and sovereign wealth allocation.',
    twitter: '@elena_rostova'
  },
  julian: {
    name: 'Julian Vance',
    role: 'Mindfulness & Design Writer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    bio: 'Exploring performance optimization, high-integrity travel gear, micro-environments, and acoustic analog lifestyles.',
    twitter: '@julian_wellness'
  },
  clara: {
    name: 'Clara Del Sol',
    role: 'Cultural Critic & Multimedia Journalist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    bio: 'Reviewing interactive gaming vectors, immersive theater formats, virtual reality storytelling, and subculture developments.',
    twitter: '@clara_delsol'
  }
};

// Rich Sample Articles Database
export const ARTICLES: Article[] = [
  {
    id: 'tech-1',
    title: 'The Silicon Frontier: Quantum Computing Leaps into Commercial Sands',
    slug: 'silicon-frontier-quantum-computing-commercial-sands',
    excerpt: 'Silicon-spin qubits are bypassing exotic high-temperature super-cooling setups to deliver stable quantum operations inside commercial foundries.',
    content: [
      'The race for quantum supremacy has historically belonged to liquid-helium sub-Kelvin refrigerators, shielding giant cryogenic chambers. However, a major breakthrough has taken place inside semiconductor design hubs: stable silicon-spin qubits operating at significantly higher operational temperatures (around 1 to 1.5 Kelvin). By leveraging standard complementary metal-oxide-semiconductor (CMOS) foundry lines, quantum computing is stepping from scientific novelty to practical commercial silicon.',
      'This breakthrough means that quantum co-processors can be integrated side-by-side with classical processors. Standard silicon dies, already manufactured at scale by global semiconductor giants, are being retrofitted to integrate micro-quantum arrays. Suddenly, the long-sought multi-million-qubit scale-up is no longer a matter of physics breakthrough, but of logistical pipeline efficiency.',
      'For heavy business networks, the ramifications are immediate. Cryptographic defense systems, drug molecular pathing, high-dimensional trade routings, and logistic chains can rely on desktop quantum acceleration modules. We are transitioning out of the experimental high-vacuum chamber era and directly entering the real-world deployment phase of hybrid quantum computing systems.'
    ],
    category: 'Technology',
    author: AUTHORS.alexa,
    publishedAt: '2026-05-28',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    tags: ['Quantum', 'Silicon', 'Hardware', 'Computing'],
    isFeatured: true,
    isTrending: true,
    views: 4890,
    likes: 312,
    comments: [
      {
        id: 'c1',
        authorName: 'Dr. Evelyn Brand',
        authorEmail: 'evelyn.brand@quantum.edu',
        content: 'Silicon-spin qubits are indeed the most logical bridge to commercial viability. Cryogenic support is still heavy, but 1.5 Kelvin is a massive improvement over millikelvins.',
        date: '2026-05-29',
        likes: 12
      },
      {
        id: 'c2',
        authorName: 'Alex Mercer',
        authorEmail: 'alex@mercerbuilds.com',
        content: 'Fascinating. If we can run quantum algorithms locally on a hybrid SoC in the next 5 years, cryptography is about to change forever.',
        date: '2026-05-30',
        likes: 8
      }
    ]
  },
  {
    id: 'crypto-1',
    title: "Bitcoin's Liquidity Revolution: Staking Protocols Unlock Passive Asset Layers",
    slug: 'bitcoins-liquidity-revolution-staking-protocols-passive-asset-layers',
    excerpt: 'New non-custodial staking architectures on Bitcoin are allowing coin holders to secure secondary sovereign chains without surrendering their private keys.',
    content: [
      'Bitcoin is traditionally characterized as digital gold: secure, sovereign, but largely static. Unlike smart-contract blockchains, Bitcoin sat securely in cold-vault addresses, locked away from high-yielding liquidity markets. That narrative is currently undergoing a swift and permanent transition due to the release of trustless Bitcoin staking and finality protocol extensions.',
      'Through advanced cryptographic covenants, script updates, and timelocks, holders can now securely lock assets directly on the Bitcoin mainnet to secure secondary Layer-2 and companion chains. There is no middleman, no custodian wrapping your tokens, and no smart-contract exposure on foreign networks. If a validating node acts maliciously, the staked collateral is sliced; if they perform, the yields are paid directly back to original BTC addresses.',
      'This unlocks over a trillion dollars in idle capital. Institutional custodians who previously viewed Bitcoin strictly as a balance-sheet hedge are now setting up internal staking vaults. It shifts the asset class from a passive commodity to a foundational security primitive for the entire decentralized world.'
    ],
    category: 'Cryptocurrency',
    author: AUTHORS.marcus,
    publishedAt: '2026-05-31',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=1000&q=80',
    tags: ['Bitcoin', 'DeFi', 'Staking', 'Sovereignty'],
    isTrending: true,
    views: 3120,
    likes: 245,
    comments: []
  },
  {
    id: 'business-1',
    title: 'The Sovereign Wealth Boom: Reinventing Dynamic Global Capital Allocation',
    slug: 'sovereign-wealth-boom-reinventing-capital-allocation',
    excerpt: 'State-backed funds are bypassing international private equity syndicates to invest directly in deep-tech corridors and vital supply networks.',
    content: [
      'Globally, Sovereign Wealth Funds (SWFs) are experiencing a historic transformation. Rather than relying on established asset managers on Wall Street or in London, sovereign investment desks are scaling up in-house dealmaking teams. Driven by geopolitical shifts, they are focusing directly on critical raw minerals, shipping infrastructure, AI microprocessors, and high-yield clean-grid corridors.',
      'This brand of state-backed investing represents a shift away from short-term financial returns and toward long-term resource security. With billions in liquid reserves, these entities can sustain deep investments through extended economic winters, funding scientific ventures that private venture capitalists find too high-risk or long-horizon.',
      'However, this direct interference is triggering protectionist audits globally. Capital transfers that once looked like simple cross-border mergers are now scrutinized through national security frameworks. The modern CFO must navigate not just commercial competition, but also the strategic agendas of multi-trillion-dollar sovereign assets.'
    ],
    category: 'Business',
    author: AUTHORS.elena,
    publishedAt: '2026-05-29',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    tags: ['Finance', 'Sovereign Wealth', 'Global Trade', 'Venture Capital'],
    isFeatured: false,
    views: 2890,
    likes: 198,
    comments: []
  },
  {
    id: 'lifestyle-1',
    title: 'Acoustic Shelters: Designing Noise-Free Micro-Environments in Digital Cities',
    slug: 'acoustic-shelters-designing-noise-free-micro-environments',
    excerpt: 'As acoustic pollution climbs to health-hazardous peaks, a new wave of industrial designers is crafting sensory-quiet refuges in residential layouts.',
    content: [
      'The modern urban habitat is loud. Constant low-frequency vibrations, sirens, server fans, and ventilation hums keep the human nervous system in a state of soft, subconscious alertness. For years, active-noise-cancelling headphones served as a personal band-aid. But industrial architects are pushing deeper: they are building acoustic airlocks, custom noise diffusion corridors, and residential sensory-quiet zones into standard residential blocks.',
      'By using wood composites filled with micro-porous silica, sound waves are scattered and absorbed rather than bounced. Double-gasket magnetic doorways and acoustic baffled ventilation chimneys are becoming crucial design elements, producing tranquil rooms dropping below 25 decibels—quieter than a whispered conversation.',
      'The luxury of the future is not high-bandwidth screen displays or smart home mirrors; it is quietness. In these custom-insulated safe-havens, creators can focus, sleep is deep, and the nervous system can de-escalate. TrendSphere explores the rising trend of analog acoustic sanctuaries.'
    ],
    category: 'Lifestyle',
    author: AUTHORS.julian,
    publishedAt: '2026-05-30',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=80',
    tags: ['Architecture', 'Wellness', 'Analog', 'Acoustics'],
    isTrending: true,
    views: 1950,
    likes: 182,
    comments: [
      {
        id: 'cl1',
        authorName: 'Sara Wu',
        authorEmail: 'sara@acousticdesign.com',
        content: 'Unbelievably necessary. I built a double-door acoustic sanctuary in my downtown loft and my cortisol levels have dropped measurably.',
        date: '2026-05-30',
        likes: 14
      }
    ]
  },
  {
    id: 'ent-1',
    title: 'The Cinema Renaissance: How Independent Micro-Studios Captured the Cultural Zeitgeist',
    slug: 'cinema-renaissance-independent-micro-studios-zeitgeist',
    excerpt: 'Equipped with cost-efficient photorealistic render engines and virtual stages, indie directors are producing epic dramas on a fraction of legacy agency budgets.',
    content: [
      'The dominance of the nine-figure blockbuster is cracking. Independent micro-studios are stepping in, producing visually spectacular, highly original content at a fraction of traditional costs. The driving engine behind this revolution is virtual production stages combined with accessible real-time game render technology.',
      'Instead of flying entire crews, equipment trucks, and actor caravans across continents, directors are filming on indoor LED soundstages. Physical miniature foregrounds blend into real-time, parallax-correct virtual skylines. High-fidelity dynamic lighting wraps actors perfectly, eliminating the plastic appearance of traditional green screens.',
      'But technology alone is secondary. The true triumph lies in creative storytelling. Unburdened by bloated executive committees and global licensing mandates, these agile studios can target focused, adult stories with complex themes, capturing the cultural conversations that larger distributors are too risk-averse to touch. Independent cinema is reclaiming its cultural voice.'
    ],
    category: 'Entertainment',
    author: AUTHORS.clara,
    publishedAt: '2026-05-27',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    tags: ['Cinema', 'Indie', 'Production', 'VFX'],
    isFeatured: false,
    views: 4210,
    likes: 298,
    comments: []
  },
  {
    id: 'tech-2',
    title: 'Extended Reality without Eyestrain: The Holographic Laser Micro-Display Breakthrough',
    slug: 'extended-reality-laser-micro-display-breakthrough',
    excerpt: 'Retinal direct-projection is changing the virtual display game by focusing lightweight visual feeds through laser micro-emitter arrays directly into the eye.',
    content: [
      'The chief hurdle of heavy XR displays is double-vision fatigue. Long-term usage forces human eyes to focus on flat glass panels placed inches away, while trying to adjust to distant simulated depths. A new hardware consortium is stepping forward with direct retinal projection, utilizing tiny micro-laser systems embedded directly inside light wireframes.',
      'This technology projects high-resolution images straight onto the fovea of the eye. By adjusting wavefronts dynamically, digital objects are rendered with correct natural focus planes. If an virtual item is placed three meters away, your eyes physically focus on it, naturally blurring the background.',
      'The result is a weight reduction of around ninety percent compared to traditional headsets. These glasses look like classic titanium frames, drawing minimal power while offering crisp, transparent digital integration. It is a massive step towards seamless spatial computing.'
    ],
    category: 'Technology',
    author: AUTHORS.alexa,
    publishedAt: '2026-05-25',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1000&q=80',
    tags: ['XR', 'Lasers', 'Display', 'Wearables'],
    views: 2430,
    likes: 120,
    comments: []
  },
  {
    id: 'crypto-2',
    title: 'Carbon Credits on Ledger: Deploying Trustless Smart Contracts for Climate Finance',
    slug: 'carbon-credits-ledger-trustless-smart-contracts-climate-finance',
    excerpt: 'How on-chain real-world-asset registries are restoring absolute auditability and tracking veracity to global offset allocations and green offsets.',
    content: [
      'The international voluntary carbon offset market has historically faced transparency challenges. Multi-sold certificates, double-counted forest tracts, and heavy transaction overhead often meant green capital never reached local conservation teams. However, decentralized ledger networks are cleaning up the process.',
      'By using smart contracts connected to global real-world sensing satellites, offset registries are updated in real-time. A tract of rainforest can trigger digital payouts only when high-resolution telemetry confirms the tree canopy remains unlogged. If deforestation is detected, the carbon-minting contract stops automatically.',
      'This real-world integration turns passive certificates into active, programmable financial assets. Corporates can embed automatic carbon mitigation triggers directly into logistics contracts, buying exactly the offsets needed at the absolute moment of raw material transport. It represents a level of trustless transparency long overdue in global environmental stewardship.'
    ],
    category: 'Cryptocurrency',
    author: AUTHORS.marcus,
    publishedAt: '2026-05-24',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1644143379190-08a5f02231dd?auto=format&fit=crop&w=1000&q=80',
    tags: ['DeFi', 'Climate', 'Oracles', 'RWA'],
    views: 1840,
    likes: 109,
    comments: []
  },
  {
    id: 'business-2',
    title: 'The Circular Fashion Grid: Supply Chain Interoperability & Zero-Waste Pipelines',
    slug: 'circular-fashion-grid-supply-chain-interoperability',
    excerpt: 'Textile tracking chips and molecular recycling are transforming apparel from single-use purchase items to durable lease subscriptions.',
    content: [
      'Global fashion supply lines consume millions of tons of raw materials annually, with seventy percent ending up in regional landfills. Major logistics operators are trying to restructure this flow using molecular recycling systems, unified digital material passports, and high-integrity leasing platforms.',
      'Every garment is tagged during spinning with a woven near-field microchip that holds its precise material pedigree. When an item is returned at the end of its cycle, automatic sorting centers scan the chip and sort fabrics perfectly into polyester, cotton, or mixed fiber streams. It eliminates manual identification errors, supplying chemical recycling machines with pure input stock.',
      'This system turns apparel into an iterative leasing service. Consumers subscribe to clothing lines, updating items regularly. When they returning garments, the fibers are chemically dissolved back to pure molecular monomers and spun into fresh yarn, creating a closed-loop system that offsets environmental costs.'
    ],
    category: 'Business',
    author: AUTHORS.elena,
    publishedAt: '2026-05-23',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    tags: ['Logistics', 'Circular Economy', 'Retail', 'Greentech'],
    views: 1670,
    likes: 95,
    comments: []
  }
];