<script setup lang="ts">
  import { ArrowRightIcon } from "@heroicons/vue/24/outline";

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  );
  const words = [
    {
      title: "Aave",
      slug: "aave",
      oneLiner:
        "Aave is a decentralized finance protocol that allows people to lend and borrow crypto.",
      content:
        "Aave is a decentralized finance protocol that allows people to lend and borrow crypto. Lenders earn interest by providing liquidity to lending pools, while borrowers can obtain loans by providing collateral to secure the debt.",
    },
    {
      title: "Arbitrage",
      slug: "arbitrage",
      oneLiner:
        "Arbitrage is the practice of taking advantage of a price difference between two or more markets.",
      content:
        "Arbitrage is the practice of taking advantage of a price difference between two or more markets. It involves buying an asset in one market and selling it in another market at a higher price, thereby profiting from the difference. Arbitrage opportunities are often short-lived and require quick execution to take advantage of the price discrepancy.",
    },
    {
      title: "Altcoin",
      slug: "altcoin",
      oneLiner: "An altcoin is any cryptocurrency other than Bitcoin.",
      content:
        "An altcoin is any cryptocurrency other than Bitcoin. The term 'altcoin' is short for 'alternative coin' and is used to describe any cryptocurrency that is not Bitcoin. There are thousands of altcoins in existence, each with its own unique features and use cases.",
    },
    {
      title: "Altcoin",
      slug: "altcoin",
      oneLiner: "An altcoin is any cryptocurrency other than Bitcoin.",
      content:
        "An altcoin is any cryptocurrency other than Bitcoin. The term 'altcoin' is short for 'alternative coin' and is used to describe any cryptocurrency that is not Bitcoin. There are thousands of altcoins in existence, each with its own unique features and use cases.",
    },
    {
      title: "Altcoin",
      slug: "altcoin",
      oneLiner: "An altcoin is any cryptocurrency other than Bitcoin.",
      content:
        "An altcoin is any cryptocurrency other than Bitcoin. The term 'altcoin' is short for 'alternative coin' and is used to describe any cryptocurrency that is not Bitcoin. There are thousands of altcoins in existence, each with its own unique features and use cases.",
    },
    {
      title: "Altcoin",
      slug: "altcoin",
      oneLiner: "An altcoin is any cryptocurrency other than Bitcoin.",
      content:
        "An altcoin is any cryptocurrency other than Bitcoin. The term 'altcoin' is short for 'alternative coin' and is used to describe any cryptocurrency that is not Bitcoin. There are thousands of altcoins in existence, each with its own unique features and use cases.",
    },
    {
      title: "Binance",
      slug: "binance",
      oneLiner:
        "Binance is a cryptocurrency exchange that provides a platform for trading various cryptocurrencies.",
      content:
        "Binance is a cryptocurrency exchange that provides a platform for trading various cryptocurrencies. As of January 2018, Binance was the largest cryptocurrency exchange in the world in terms of trading volume.",
    },

    {
      title: "Bitcoin",
      slug: "bitcoin",
      oneLiner:
        "Bitcoin is a digital currency that was created in January 2009.",
      content:
        "Bitcoin is a digital currency that was created in January 2009. It follows the ideas set out in a whitepaper by the mysterious and pseudonymous Satoshi Nakamoto. The identity of the person or persons who created the technology is still a mystery. Bitcoin offers the promise of lower transaction fees than traditional online payment mechanisms and is operated by a decentralized authority, unlike government-issued currencies.",
    },
    {
      title: "Base Layer",
      slug: "base-layer",
      oneLiner:
        "The base layer is the underlying infrastructure of a blockchain network.",
      content:
        "The base layer is the underlying infrastructure of a blockchain network. It is the foundation on which the network is built and provides the core functionality of the blockchain, such as transaction processing, consensus mechanisms, and security features. The base layer is responsible for maintaining the integrity and security of the network and is essential for the operation of the blockchain.",
    },
    {
      title: "Blockchain",
      slug: "blockchain",
      oneLiner:
        "A blockchain is a distributed ledger that is used to record transactions across multiple computers.",
      content:
        "A blockchain is a distributed ledger that is used to record transactions across multiple computers. The ledger is secure, transparent, and tamper-proof, making it an ideal platform for recording transactions involving cryptocurrencies and other digital assets. Each block in the chain contains a number of transactions, and every time a new transaction occurs on the blockchain, a record of that transaction is added to every participant's ledger.",
    },
    {
      title: "Base Layer",
      slug: "base-layer",
      oneLiner:
        "The base layer is the underlying infrastructure of a blockchain network.",
      content:
        "The base layer is the underlying infrastructure of a blockchain network. It is the foundation on which the network is built and provides the core functionality of the blockchain, such as transaction processing, consensus mechanisms, and security features. The base layer is responsible for maintaining the integrity and security of the network and is essential for the operation of the blockchain.",
    },
    {
      title: "Base Layer",
      slug: "base-layer",
      oneLiner:
        "The base layer is the underlying infrastructure of a blockchain network.",
      content:
        "The base layer is the underlying infrastructure of a blockchain network. It is the foundation on which the network is built and provides the core functionality of the blockchain, such as transaction processing, consensus mechanisms, and security features. The base layer is responsible for maintaining the integrity and security of the network and is essential for the operation of the blockchain.",
    },
    {
      title: "Base Layer",
      slug: "base-layer",
      oneLiner:
        "The base layer is the underlying infrastructure of a blockchain network.",
      content:
        "The base layer is the underlying infrastructure of a blockchain network. It is the foundation on which the network is built and provides the core functionality of the blockchain, such as transaction processing, consensus mechanisms, and security features. The base layer is responsible for maintaining the integrity and security of the network and is essential for the operation of the blockchain.",
    },
    {
      title: "Base Layer",
      slug: "base-layer",
      oneLiner:
        "The base layer is the underlying infrastructure of a blockchain network.",
      content:
        "The base layer is the underlying infrastructure of a blockchain network. It is the foundation on which the network is built and provides the core functionality of the blockchain, such as transaction processing, consensus mechanisms, and security features. The base layer is responsible for maintaining the integrity and security of the network and is essential for the operation of the blockchain.",
    },
    {
      title: "Base Layer",
      slug: "base-layer",
      oneLiner:
        "The base layer is the underlying infrastructure of a blockchain network.",
      content:
        "The base layer is the underlying infrastructure of a blockchain network. It is the foundation on which the network is built and provides the core functionality of the blockchain, such as transaction processing, consensus mechanisms, and security features. The base layer is responsible for maintaining the integrity and security of the network and is essential for the operation of the blockchain.",
    },
    {
      title: "Base Layer",
      slug: "base-layer",
      oneLiner:
        "The base layer is the underlying infrastructure of a blockchain network.",
      content:
        "The base layer is the underlying infrastructure of a blockchain network. It is the foundation on which the network is built and provides the core functionality of the blockchain, such as transaction processing, consensus mechanisms, and security features. The base layer is responsible for maintaining the integrity and security of the network and is essential for the operation of the blockchain.",
    },
    {
      title: "Cryptocurrency",
      slug: "cryptocurrency",
      oneLiner:
        "A cryptocurrency is a digital or virtual form of currency that uses cryptography for security.",
      content:
        "A cryptocurrency is a digital or virtual form of currency that uses cryptography for security. Cryptocurrencies are decentralized and operate on a technology called blockchain, which is a distributed ledger enforced by a network of computers. The most well-known cryptocurrency is Bitcoin, but there are thousands of other cryptocurrencies with various features and use cases.",
    },
    {
      title: "Centralized Finance",
      slug: "centralized-finance",
      oneLiner:
        "Centralized finance (CeFi) refers to traditional financial systems that rely on centralized financial intermediaries such as banks, brokerages, and exchanges.",
      content:
        "Centralized finance (CeFi) refers to traditional financial systems that rely on centralized financial intermediaries such as banks, brokerages, and exchanges. CeFi platforms are regulated by governments and are subject to the rules and regulations of the jurisdictions in which they operate. Examples of CeFi platforms include traditional banks, stock exchanges, and insurance companies.",
    },
    {
      title: "Compound",
      slug: "compound",
      oneLiner:
        "Compound is a decentralized finance protocol that allows users to lend and borrow crypto.",
      content:
        "Compound is a decentralized finance protocol that allows users to lend and borrow crypto. The protocol is implemented as a series of smart contracts running on the Ethereum blockchain, and it is notable for enabling interest to be earned or paid without the need for a traditional financial intermediary.",
    },

    {
      title: "Decentralized Finance",
      slug: "decentralized-finance",
      oneLiner:
        "Decentralized finance (DeFi) is a blockchain-based form of finance that does not rely on central financial intermediaries such as brokerages, exchanges, or banks to offer traditional financial instruments, and instead utilizes smart contracts on blockchains.",
      content:
        "Decentralized finance (DeFi) is a blockchain-based form of finance that does not rely on central financial intermediaries such as brokerages, exchang",
    },
    {
      title: "Ethereum",
      slug: "ethereum",
      oneLiner:
        "Ethereum is a decentralized, open-source blockchain with smart contract functionality.",
      content:
        "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is the native cryptocurrency of the platform. It is the second-largest cryptocurrency by market capitalization, after Bitcoin. Ethereum is the most actively used blockchain.",
    },
    {
      title: "Flash Loan",
      slug: "flash-loan",
      oneLiner:
        "A flash loan is a type of uncollateralized loan that is extended to a borrower temporarily.",
      content:
        "A flash loan is a type of uncollateralized loan that is extended to a borrower temporarily. Flash loans are typically executed through smart contracts and must be repaid in the same transaction. Flash loans are popular in the decentralized finance (DeFi) space, where they can be used for a variety of purposes, such as arbitrage, collateral swapping, and liquidation.",
    },
    {
      title: "Gas",
      slug: "gas",
      oneLiner:
        "Gas refers to the fee, or pricing value, required to successfully conduct a transaction or execute a contract on the Ethereum blockchain platform.",
      content:
        "Gas refers to the fee, or pricing value, required to successfully conduct a transaction or execute a contract on the Ethereum blockchain platform. The gas fee is paid in Ethereum's native cryptocurrency, Ether (ETH). Gas prices are denoted in Gwei, which itself is a denomination of ETH - each Gwei is equal to ",
    },
  ];
</script>

<template>
  <div class="isolate bg-white">
    <GlossaryHeader />
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div v-for="letter in alphabet" :key="letter" :id="letter" class="pt-24">
        <h2 class="text-7xl font-semibold">{{ letter }}</h2>
        <div class="mt-6 grid grid-cols-4 gap-8">
          <NuxtLink
            v-for="word in words.filter((word) =>
              word.title.startsWith(letter),
            )"
            :key="word.slug"
            :to="`/glossary/${word.slug}`"
            class="hover:border-primary group relative flex flex-col border border-white px-4 pb-8 pt-4"
          >
            <h3 class="text-xl font-semibold">{{ word.title }}</h3>
            <p class="text-gray-500">{{ word.oneLiner }}</p>
            <ArrowRightIcon
              class="text-primary absolute bottom-4 right-4 hidden h-6 w-6 group-hover:block"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
