'use client';

import React, { useState } from 'react';
import { Wallet, Send, Image as ImageIcon, TrendingUp, ChevronDown, Terminal } from 'lucide-react';
import { WalletConnector, TransactionManager, NFTGallery, DeFiInterface } from '@/components/web3';
import { useWeb3Wallet } from '@/hooks/useWeb3Wallet';

type DemoTab = 'wallet' | 'transactions' | 'nfts' | 'defi' | 'code';

export default function Web3DemoPage() {
  const wallet = useWeb3Wallet();
  const [activeTab, setActiveTab] = useState<DemoTab>('wallet');
  const [showCode, setShowCode] = useState(false);

  const demos: Array<{ id: DemoTab; label: string; icon: React.ReactNode }> = [
    { id: 'wallet', label: 'Wallet', icon: <Wallet className="w-4 h-4" /> },
    { id: 'transactions', label: 'Transactions', icon: <Send className="w-4 h-4" /> },
    { id: 'nfts', label: 'NFTs', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'defi', label: 'DeFi', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'code', label: 'Code', icon: <Terminal className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Web3 Integration Demo
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Advanced wallet integration with multi-chain support
            </p>
          </div>
          <WalletConnector showBalance={true} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wallet.isConnected ? (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Connected Wallet
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                  <p className="font-mono text-sm mt-1 text-gray-900 dark:text-white break-all">
                    {wallet.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Provider</p>
                  <p className="font-medium mt-1 text-gray-900 dark:text-white capitalize">
                    {wallet.provider}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Network</p>
                  <p className="font-medium mt-1 text-gray-900 dark:text-white">
                    {wallet.supportedChains[wallet.chainId || '0x1']?.chainName || wallet.chainId}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {demos.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveTab(demo.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === demo.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
                  }`}
                >
                  {demo.icon}
                  {demo.label}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              {activeTab === 'wallet' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Wallet Connection
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Supports multiple wallet providers with seamless connection experience:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>✓ MetaMask - EVM chains</li>
                    <li>✓ Starknet - ArgentX, Braavos wallets</li>
                    <li>✓ WalletConnect - Protocol v2</li>
                    <li>✓ Coinbase Wallet - EVM compatible</li>
                  </ul>
                </div>
              )}

              {activeTab === 'transactions' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Transaction Manager
                  </h2>
                  <TransactionManager
                    onTransactionSent={(txHash) => {
                      console.log('Transaction sent:', txHash);
                    }}
                  />
                </div>
              )}

              {activeTab === 'nfts' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    NFT Gallery
                  </h2>
                  <NFTGallery
                    showMintButton={true}
                    onNFTSelect={(nft) => {
                      console.log('Selected NFT:', nft);
                    }}
                  />
                </div>
              )}

              {activeTab === 'defi' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    DeFi Interface
                  </h2>
                  <DeFiInterface
                    onStake={(protocol, amount, duration) => {
                      console.log(`Staked ${amount} in ${protocol} for ${duration} days`);
                    }}
                  />
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Integration Examples
                  </h2>
                  <div>
                    <button
                      onClick={() => setShowCode(!showCode)}
                      className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${showCode ? 'rotate-180' : ''}`}
                      />
                      View Code Examples
                    </button>
                    {showCode && (
                      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto text-xs">
                        {`// Hook Usage Example
const wallet = useWeb3Wallet();
return wallet.isConnected ? <p>{wallet.address}</p> : <button>Connect</button>;`}
                      </pre>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Wallet className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Connect a wallet to explore the Web3 integration features.
            </p>
            <div className="flex justify-center">
              <WalletConnector />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 TeachLink DAO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
